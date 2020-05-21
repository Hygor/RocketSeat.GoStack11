import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #3a3a3a;
  max-width: 24rem;
  line-height: 3.5rem;
  margin-top: 5rem;
`;

export const Form = styled.form<FormProps>`
  margin-top: 2.5rem;
  max-width: 43.65rem;
  display: flex;
  font-size: 1rem;
  background: transparent;
  border-radius: 0.3rem;
  overflow: hidden;
  box-shadow: 0 0 1rem transparent;

  ${(props) =>
    props.hasError &&
    css`
      box-shadow: 0 0 0.5rem #c53030;
    `}

  input,
  button {
    height: 4.375rem;
    display: flex;
    align-items: center;
    border: 0;
    font-size: 1rem;
  }

  input {
    flex: 1;
    padding: 0 1.5rem;
    border-radius: 0.3rem 0 0 0.3rem;
    color: #3a3a3a;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 13.125rem;
    background: #04d361;
    border-radius: 0 0.3rem 0.3rem 0;
    color: #fff;
    font-weight: bold;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repositories = styled.ul`
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

export const Error = styled.div`
  color: #c53030;
  margin-top: 1rem;
`;
