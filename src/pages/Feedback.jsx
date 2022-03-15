import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    if (assertions > than3) feedBackMessage = 'Well Done!';

    this.setState({ feedBackMessage });
  }

  render() {
    const { feedBackMessage } = this.state;
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <main>
          <h2>Feedback sobre sua partida de Trivia</h2>

          <h3>
            {`Nessa partida voce fez ${score} pontos!`}
          </h3>

          <h3>
            {`Voce acertou ${assertions} perguntas, ${feedBackMessage}`}
          </h3>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
