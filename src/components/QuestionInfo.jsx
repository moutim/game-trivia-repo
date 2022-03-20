import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionInfo extends Component {
  render() {
    const { questionNumber, category, difficulty } = this.props;
    return (
      <div className="question-info">
        <h1>{`Question number ${questionNumber + 1}`}</h1>
        <h2 data-testid="question-category">{ `Category: ${category}` }</h2>
        <h4>{ `Difficulty: ${difficulty}` }</h4>
      </div>
    );
  }
}

QuestionInfo.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default QuestionInfo;
