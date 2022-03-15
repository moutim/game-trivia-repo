import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AlternativeButtons.css';
// import { connect } from 'react-redux';
// import alternativeAction from '../redux/actions/actionQuestions';

class AlternativeButtons extends Component {
    handleSelectAnswer = () => {
      const { buttonNextShow, isClicked } = this.props;
      isClicked();
      buttonNextShow();
    }

    render() {
      const { shuffleQuestions, correctAnswer, wasClicked } = this.props;
      return (
        <>

          {
            shuffleQuestions.map((item, index) => {
              // Verifica se o item atual é igual a correctAnswer para colocar o datatestId correto
              if (item === correctAnswer) {
                return (
                  <button
                    key={ item }
                    data-testid="correct-answer"
                    type="button"
                    className={ wasClicked ? 'correctAnswer' : '' }
                    onClick={ this.handleSelectAnswer }
                  >
                    { item }
                  </button>);
              } return (
                <button
                  key={ item }
                  data-testid={ `wrong-answer-${index}` }
                  type="button"
                  className={ wasClicked ? 'wrongAnswer' : '' }
                  onClick={ this.handleSelectAnswer }
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
  buttonNextShow: PropTypes.func.isRequired,
  isClicked: PropTypes.func.isRequired,
  wasClicked: PropTypes.bool.isRequired,
};

AlternativeButtons.defaultProps = {
  correctAnswer: '',
};

export default AlternativeButtons;
