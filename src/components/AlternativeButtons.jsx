import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AlternativeButtons.css';
import { connect } from 'react-redux';
import { addScore, addAssertions } from '../redux/actions/playerAction';

class AlternativeButtons extends Component {
    formulaScore = (difficulty, timer) => {
      const formulaBase = 10;
      const easy = 1;
      const medium = 2;
      const hard = 3;
      if (difficulty === 'easy') { return formulaBase + (timer * easy); }
      if (difficulty === 'medium') { return formulaBase + (timer * medium); }
      if (difficulty === 'hard') { return formulaBase + (timer * hard); }
    }

    handleSelectAnswer = ({ target: { id } }) => {
      const {
        correctAnswer,
        difficulty,
        timer,
        sendScore,
        sendAssertions,
        answerWasClicked,
      } = this.props;

      let score = 0;
      if (correctAnswer === id) {
        score = this.formulaScore(difficulty, timer);
        sendScore(score);
        sendAssertions();
      }
      const { name, scorePoints, picture } = this.props;
      const playerInfo = [{ name, score: scorePoints, picture }];
      localStorage.setItem('ranking', JSON.stringify(playerInfo));

      answerWasClicked();
    }

    render() {
      const {
        shuffleQuestions,
        correctAnswer,
        isDisabledButton,
        wasClicked,
      } = this.props;

      return (
        <>
          {
            shuffleQuestions.map((item, index) => {
              if (item === correctAnswer) {
                return (
                  <button
                    key={ item }
                    data-testid="correct-answer"
                    type="button"
                    className={ wasClicked ? 'correctAnswer' : 'alternativeButton' }
                    onClick={ this.handleSelectAnswer }
                    id={ item }
                    disabled={ isDisabledButton }

                  >
                    { item }
                  </button>);
              } return (
                <button
                  key={ item }
                  data-testid={ `wrong-answer-${index}` }
                  type="button"
                  className={ wasClicked ? 'wrongAnswer' : 'alternativeButton' }
                  onClick={ this.handleSelectAnswer }
                  id={ item }
                  disabled={ isDisabledButton }

                >
                  { item }
                </button>
              );
            })
          }
        </>
      );
    }
}

AlternativeButtons.propTypes = {
  shuffleQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string,
  difficulty: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  sendScore: PropTypes.func.isRequired,
  sendAssertions: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  scorePoints: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  isDisabledButton: PropTypes.bool.isRequired,
  answerWasClicked: PropTypes.func.isRequired,
  wasClicked: PropTypes.bool.isRequired,
};

AlternativeButtons.defaultProps = {
  correctAnswer: '',
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  picture: state.player.pictureGravatar,
  scorePoints: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score) => dispatch(addScore(score)),
  sendAssertions: () => dispatch(addAssertions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlternativeButtons);
