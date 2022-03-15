import React, { Component } from 'react';
import arrayShuffle from 'array-shuffle';
import Header from '../components/Header';
import fetchQuestionsAPI from '../services/questionsAPI';
import AlternativeButtons from '../components/AlternativeButtons';

class ScreenGame extends Component {
  state = {
    // Fiz essas duas variaveis ja pensando quando tivermos o botao de 'proxima pergunta'
    questionNumber: 0,
    questions: [],
    currentQuestion: {},
    isShow: false,
    wasClicked: false,
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { results } = await fetchQuestionsAPI(token);
    const { questionNumber } = this.state;
    this.setState({ currentQuestion: results[questionNumber], questions: results });
  }

  handleButtonNextShow = () => {
    this.setState({
      isShow: true,
    });
  }

  isClicked = () => {
    this.setState({
      wasClicked: true,
    });
  }

  handleButtonNextQuestion = () => {
    const { questions, questionNumber } = this.state;
    this.setState({
      currentQuestion: questions[questionNumber + 1],
      wasClicked: false,
      isShow: false,
    });
  }

  // ref: https://www.npmjs.com/package/array-shuffle
  shuffleQuestions = (array) => arrayShuffle(array);

  render() {
    // const { isShow } = this.state;
    const { currentQuestion: {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    }, isShow, wasClicked } = this.state;

    let questionsArray = [];
    // Quando a aplicacao renderiza pela 1 vez nosso incorrectAnswers e correctAnswer ainda sao 'undefined'
    // entao aqui faco a verificacao que ele existe antes de popular o array de questoes
    if (incorrectAnswers) questionsArray = [correctAnswer, ...incorrectAnswers];
    // Embaralhando o array de questoes
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
              wasClicked={ wasClicked }
              isClicked={ this.isClicked }
              buttonNextShow={ this.handleButtonNextShow }
              shuffleQuestions={ shuffleQuestions }
              correctAnswer={ correctAnswer }
            />
          </div>
          {
            isShow && (
              <button
                type="button"
                className={ isShow ? 'show' : 'hide' }
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

export default ScreenGame;
