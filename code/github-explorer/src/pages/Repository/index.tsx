import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiExternalLink } from 'react-icons/fi';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';
import LogoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: string;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const loadData: Function = async () => {
      const [resRepository, resIssues] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`),
      ]);
      setRepository(resRepository.data);
      setIssues(resIssues.data);
    };
    loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <Link to="/">
          <img src={LogoImg} alt="Github Explorer" />
        </Link>
        <Link to="/">
          <FiChevronLeft size={20} />
          <span>Voltar</span>
        </Link>
      </Header>

      {repository ? (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <h1>{repository.full_name}</h1>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      ) : (
        <p>Loading...</p>
      )}

      <Issues>
        {issues.map((issue) => (
          <li key={issue.id}>
            <a
              href={issue.html_url}
              title={issue.title}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <strong>{issue.title}</strong>
                <span>{issue.user.login}</span>
              </span>
              <FiExternalLink size={20} />
            </a>
          </li>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
