import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
}

const Dashboard: React.FC = () => {
  const [newRepository, setNewRepository] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const memRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );
    if (memRepositories) {
      return JSON.parse(memRepositories);
    }
    return [];
  });

  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepository) {
      setInputError('Que tal procurar usando "autor/repositorio"?');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepository}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepository('');
      setInputError('');
    } catch (err) {
      setInputError('Algo deu errado ao procurar o repositório!');
    }
  }

  return (
    <>
      <header>
        <img src={LogoImg} alt="Github Explorer" />
        <Title>Explore Repositórios no Github</Title>
        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
          <input
            value={newRepository}
            onChange={(e): void => setNewRepository(e.target.value)}
            placeholder="Digite o repositório"
          />
          <button type="submit">pesquisar</button>
        </Form>
        {inputError && <Error>{inputError}</Error>}
      </header>

      <Repositories>
        {repositories.map((repo) => {
          return (
            <li key={repo.full_name}>
              <Link
                to={`/repository/${repo.full_name}`}
                title={repo.owner.login}
              >
                <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                <span>
                  <strong>{repo.full_name}</strong>
                  <span>{repo.description}</span>
                </span>
                <FiChevronRight size={20} />
              </Link>
            </li>
          );
        })}
      </Repositories>
    </>
  );
};

export default Dashboard;
