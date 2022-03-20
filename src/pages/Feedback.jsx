import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    feedBackMessage: '',
  }

  componentDidMount() {
    let feedBackMessage;
    const than3 = 3;

    const { assertions } = this.props;

    if (assertions < than3) feedBackMessage = 'Could be better...';
    if (assertions >= than3) feedBackMessage = 'Well Done!';

    this.setState({ feedBackMessage });
    this.handleLocalStorage();
  }

  handleButtonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  // Referencie: https://medium.com/@lameckanao/armazenando-e-manipulando-dados-no-localstorage-7bcc901ba12b
  handleLocalStorage = () => {
    const { name, score, picture } = this.props;
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([{ name, score, picture }]));
    } else {
      const playersRanking = [
        ...JSON.parse(localStorage.getItem('ranking')), { name, score, picture },
      ];
      playersRanking.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(playersRanking));
    }
  }

  render() {
    const { feedBackMessage } = this.state;
    const { assertions, score, history } = this.props;
    return (
      <>
        <Header />
        <main>
          <h2>Feedback about your Trivia match</h2>

          <h3>
            {'In this match you scored '}
            <span data-testid="feedback-total-score">{ score }</span>
            {' points!'}
          </h3>

          <h3>
            {'You got '}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {' quetions right, '}
            <span data-testid="feedback-text">{ feedBackMessage }</span>
          </h3>

          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleButtonPlayAgain }
          >
            Play Again
          </button>

          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  picture: state.player.pictureGravatar,
});

export default connect(mapStateToProps)(Feedback);
