import React from 'react';
import propTypes from 'prop-types';
import { Container, Repository } from './style';

const CompareList = ({ repositories, removeRepository }) => (
  <Container>
    {repositories.map(repositorie => (
      <Repository key={repositorie.id}>
        <header>
          <img src={repositorie.owner.avatar_url} alt="facebook" />
          <strong>{repositorie.name}</strong>
          <small>{repositorie.owner.login}</small>
        </header>
        <ul>
          <li>
            {repositorie.stargazers_count}
            <small>starts</small>
          </li>
          <li>
            {repositorie.forks_count}
            <small>forks</small>
          </li>
          <li>
            {repositorie.open_issues_count}
            <small>issues</small>
          </li>
          <li>
            {repositorie.lastCommit}
            <small>last commit</small>
          </li>
        </ul>
        <div className="div-button">
          <button onClick={() => removeRepository(repositorie.id)} type="button" value="Excluir">
            <i className="fa fa-trash" />
            Excluir
          </button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.toString,
      owner: propTypes.shape({
        login: propTypes.string,
        avatar_url: propTypes.string,
      }),
      forks_count: propTypes.number,
      stargazers_count: propTypes.number,
      open_issues_count: propTypes.number,
      pushed_at: propTypes.string,
    }),
  ).isRequired,
  removeRepository: propTypes.func.isRequired,
};
export default CompareList;
