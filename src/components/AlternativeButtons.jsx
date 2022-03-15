import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AlternativeButtons.css';
import { connect } from 'react-redux';
import alternativeAction from '../redux/actions/actionQuestions';

class AlternativeButtons extends Component {
    state = {
      wasClicked: false,
      theButtonClassActive: 'hide',
    }

    handleSelectAnswer = () => {
      this.setState({
        wasClicked: true,
        theButtonClassActive: 'show',
      });
    }

    render() {
      const { shuffleQuestions, correctAnswer, wasSelected } = this.props;
      const { wasClicked, theButtonClassActive } = this.state;
      if (wasClicked) wasSelected(theButtonClassActive);
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

const mapDispatchToProps = (dispatch) => ({
  wasSelected: (classButton) => dispatch(alternativeAction(classButton)),
});

AlternativeButtons.propTypes = {
  shuffleQuestions: PropTypes.arrayOf.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  wasSelected: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AlternativeButtons);
