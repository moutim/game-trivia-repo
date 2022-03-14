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
      difficulty,
    }, timer } = this.state;

    let questionsArray = [];
    questionsArray = [correctAnswer, ...incorrectAnswers];

    const shuffleQuestions = this.shuffleQuestions(questionsArray);

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
          <h4>{ difficulty }</h4>
          <div data-testid="answer-options">
            <AlternativeButtons
              shuffleQuestions={ shuffleQuestions }
              correctAnswer={ correctAnswer }
              timer={ timer }
              difficulty={ difficulty }
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
