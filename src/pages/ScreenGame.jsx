import React, { Component } from 'react';
import arrayShuffle from 'array-shuffle';
import Header from '../components/Header';
import fetchQuestionsAPI from '../services/questionsAPI';
import AlternativeButtons from '../components/AlternativeButtons';

class ScreenGame extends Component {
  state = {
    // Fiz essas duas variaveis ja pensando quando tivermos o botao de 'proxima pergunta'
    // questionNumber: 0,
    // questions: [],
    currentQuestion: {},
    isDisabledButton: false,
    timer: 30,
    shuffleQuestions: [],
  }

  componentDidMount() {
    this.fetchQuestions();
    this.countdown();
  }

  countdown = () => {
    const { isDisabledButton, timer } = this.state;
    const ONE_SECOND = 1000;

    const intervalTime = () => {
      if (isDisabledButton === false && timer > 0) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    };

    setInterval(intervalTime, ONE_SECOND);

    const THIRTY_SECONDS = 30000;
    setTimeout(() => {
      this.setState({ isDisabledButton: true });
    }, THIRTY_SECONDS);
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    const { results } = await fetchQuestionsAPI(token);

    this.setState({ currentQuestion: results[0] });

    const { currentQuestion: {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    },
    } = this.state;

    let questionsArray = [];
    /*     // Quando a aplicacao renderiza pela 1 vez nosso incorrectAnswers e correctAnswer ainda sao 'undefined'
    // entao aqui faco a verificacao que ele existe antes de popular o array de questoes
    if (incorrectAnswers) */
    questionsArray = [correctAnswer, ...incorrectAnswers];

    const shuffleQuestions = this.shuffleQuestions(questionsArray);

    // Embaralhando o array de questoes
    this.setState({ shuffleQuestions });
  }

  // ref: https://www.npmjs.com/package/array-shuffle
  shuffleQuestions = (array) => arrayShuffle(array);

  render() {
    const {
      currentQuestion: {
        category,
        question,
        correct_answer: correctAnswer,
      },
      shuffleQuestions,
      isDisabledButton,
      timer } = this.state;

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
              isDisabledButton={ isDisabledButton }
            />
          </div>
          <h3>
            Tempo:
            { timer < 0 ? '0' : timer }
          </h3>
        </main>
      </>
    );
  }
}

export default ScreenGame;
