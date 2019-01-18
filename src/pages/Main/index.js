import React, { Component } from 'react';
import moment from 'moment';
import logo from '../../assets/logo.png';
import { Container, Form, Logo } from './styles';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    repositoriesInput: '',
    repositories: localStorage.getItem('repositories')
      ? JSON.parse(localStorage.getItem('repositories'))
      : [],
    repositoryError: false,
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoriesInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      this.setState({
        repositoriesInput: '',
        repositories: [...this.state.repositories, repository],
      });

      localStorage.setItem('repositories', JSON.stringify(this.state.repositories));

      this.setState({ repositoryError: false });
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  handleRemoveRepository = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem('repositories', JSON.stringify(updatedRepositories));
  };

  render() {
    return (
      <Container>
        <Logo src={logo} alt="Github Compare" />
        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuario/repositorio"
            value={this.state.repositoriesInput}
            onChange={e => this.setState({ repositoriesInput: e.target.value })}
          />
          <button type="submit">OK</button>
        </Form>
        <CompareList
          repositories={this.state.repositories}
          removeRepository={this.handleRemoveRepository}
        />
      </Container>
    );
  }
}
