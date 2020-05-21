import styled, { css } from 'styled-components';

interface FormProps {
  hasError: boolean;
}

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    text-decoration: none;
    color: #a8a8b3;
    transition: all 0.3s;

    &:hover {
      color: #333;
    }

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const RepositoryInfo = styled.article`
  margin-top: 5rem;

  header {
    display: flex;
    align-items: center;

    img {
      width: 7.5rem;
      height: 7.5rem;
      border-radius: 50%;
      margin-right: 1rem;
    }

    div {
      margin-left: 1rem;

      strong {
        font-size: 2.25rem;
        color: #3d3d4d;
      }

      p {
        font-size: 1.125rem;
        color: #737380;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 2.5rem;

    li {
      & + li {
        margin-left: 5rem;
      }

      strong {
        display: block;
        font-size: 2.25rem;
      }

      span {
        display: block;
        margin-top: 0.25rem;
        color: #6c6c80;
      }
    }
  }
`;

export const Issues = styled.ul`
  margin-top: 5rem;
  max-width: 43.75rem;

  li {
    position: relative;
    display: block;
    width: 100%;
    background: #fff;
    border-radius: 0.3rem;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0);
    transition: all 0.3s;
    margin-bottom: 0.75rem;
    flex: 1;

    &:hover {
      transform: scale(1.01);
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    }
  }

  a {
    position: relative;
    display: block;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    strong {
      color: #3d3d4d;
      font-size: 1.25rem;
    }

    & > span {
      color: #a8a8b3;
      flex-direction: column;
      display: flex;
      flex-grow: 1;
      position: relative;
      overflow: hidden;

      span {
        display: inline-block;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    svg {
      color: #cbcbb6;
      margin-left: 1rem;
    }
  }

  img {
    display: block;
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
`;
