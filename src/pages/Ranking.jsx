import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            history.push('/');
          } }
        >
          Voltar à Tela inicial
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func }).isRequired,
};

export default Ranking;
