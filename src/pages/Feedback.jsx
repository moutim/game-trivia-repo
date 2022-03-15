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
  }

  render() {
    const { feedBackMessage } = this.state;
    const { assertions, score, history } = this.props;
    return (
      <>
        <Header />
        <main>
          <h2>Feedback sobre sua partida de Trivia</h2>

          <h3>
            {`Nessa partida voce fez ${score} pontos!`}
          </h3>

          <h3>
            {`Voce acertou ${assertions} perguntas, `}
            <span data-testid="feedback-text">{ feedBackMessage }</span>
          </h3>

          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              history.push('/');
            } }
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
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
