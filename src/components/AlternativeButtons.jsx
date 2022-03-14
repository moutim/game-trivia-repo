import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AlternativeButtons.css';

class AlternativeButtons extends Component {
    state = {
      wasClicked: false,
      theButtonClassActive: 'hide',
    }

    handleSelectAnswer = () => {
      this.setState({ wasClicked: true, theButtonClassActive: 'show' });
    }

    // handleButtonNext = () => {

    // }

    render() {
      const { shuffleQuestions, correctAnswer } = this.props;
      const { wasClicked, theButtonClassActive } = this.state;
      return (
        <>
          <div>

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
          </div>
          <button
            type="submit"
            data-testid="btn-next"
            className={ theButtonClassActive }
            // onClick={ this.handleButtonNext() }
          >
            Next
          </button>
        </>
      );
    }
}

AlternativeButtons.propTypes = {
  shuffleQuestions: PropTypes.arrayOf.isRequired,
  correctAnswer: PropTypes.string.isRequired,
};

export default AlternativeButtons;
