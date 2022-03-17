import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  handleButtonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const rankingUser = JSON.parse(localStorage.getItem('ranking'));
    return (
      <>

        <h1 data-testid="ranking-title">Ranking</h1>
        {
          rankingUser.map((rank, index) => (

            <ul key={ index }>
              <img src={ rank.picture } alt="User from Gravatar" />
              <p data-testid={ `player-name-${index}` }>{ rank.name }</p>
              <span data-testid={ `player-score-${index}` }>{ rank.score }</span>
            </ul>
          ))
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleButtonPlayAgain }
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

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  picture: state.player.pictureGravatar,
});

export default connect(mapStateToProps)(Ranking);
