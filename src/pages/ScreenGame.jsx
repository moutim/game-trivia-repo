import React, { Component } from 'react';
import arrayShuffle from 'array-shuffle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchQuestionsAPI from '../services/questionsAPI';
import AlternativeButtons from '../components/AlternativeButtons';

class ScreenGame extends Component {
  state = {
    // Fiz essas duas variaveis ja pensando quando tivermos o botao de 'proxima pergunta'
    questionNumber: 0,
    questions: [],
    currentQuestion: [],
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { results } = await fetchQuestionsAPI(token);
    const { questionNumber } = this.state;
    this.setState({ currentQuestion: results[questionNumber], questions: results });
  }

  handleButtonNextQuestion = () => {
    const { questions, questionNumber } = this.state;
    this.setState({
      currentQuestion: questions[questionNumber + 1] });
  }

  // ref: https://www.npmjs.com/package/array-shuffle
  shuffleQuestions = (array) => arrayShuffle(array);

  render() {
    const { classButton } = this.props;
    const { currentQuestion: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.state;

    let questionsArray = [];
    // Quando a aplicacao renderiza pela 1 vez nosso incorrectAnswers e correctAnswer ainda sao 'undefined'
    // entao aqui faco a verificacao que ele existe antes de popular o array de questoes
    if (incorrectAnswers) questionsArray = [correctAnswer, ...incorrectAnswers];
    // Embaralhando o array de questoes
    console.log(questionsArray);
    const shuffleQuestions = this.shuffleQuestions(questionsArray);

    return (
      <>
        <Header />
        <main>
          <h1>Perguntas</h1>
          <h2 data-testid="question-category">{ category }</h2>
          <h3 data-testid="question-text">{ question }</h3>
          <div data-testid="answer-options">
            <AlternativeButtons
              shuffleQuestions={ shuffleQuestions }
              correctAnswer={ correctAnswer }
            />
          </div>
          {
            classButton === 'show' && (
              <button
                type="button"
                onClick={ this.handleButtonNextQuestion }
              >
                Next
              </button>)
          }
        </main>
      </>
    );
  }
}

ScreenGame.propTypes = {
  classButton: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  classButton: state.reducerClicked.classButton,
});

export default connect(mapStateToProps)(ScreenGame);
