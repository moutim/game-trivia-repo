import React, { Component } from 'react';
import arrayShuffle from 'array-shuffle';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchQuestionsAPI from '../services/questionsAPI';
import AlternativeButtons from '../components/AlternativeButtons';
import './ScreenGame.css';
import QuestionInfo from '../components/QuestionInfo';
import Timer from '../components/Timer';

class ScreenGame extends Component {
  state = {
    questionNumber: 0,
    questions: [],
    currentQuestion: {},
    isShow: false,
    wasClicked: false,
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
    const THIRTY_SECONDS = 30000;

    const intervalTime = setInterval(() => {
      if (isDisabledButton === false && timer > 0) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }, ONE_SECOND);

    setTimeout(() => {
      this.setState({ isDisabledButton: true });
      clearInterval(intervalTime);
    }, THIRTY_SECONDS);
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    const { results } = await fetchQuestionsAPI(token);
    this.setState({ currentQuestion: results[0], questions: results });

    const { currentQuestion: {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.state;

    let questionsArray = [];
    questionsArray = [correctAnswer, ...incorrectAnswers];

    const shuffleQuestions = this.shuffleQuestions(questionsArray);

    this.setState({ shuffleQuestions });
  }

  handleButtonNextShow = () => {
    this.setState({
      isShow: true,
    });
  }

  answerWasClicked = () => {
    this.setState({
      wasClicked: true,
      isShow: true,
    });
  }

  handleButtonNextQuestion = () => {
    const { questions, questionNumber } = this.state;
    const { history } = this.props;
    const lastQuestion = 4;
    if (questionNumber === lastQuestion) return history.push('/feedback');
    const plus1 = questionNumber + 1;

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[plus1];

    const questionsArray = [correctAnswer, ...incorrectAnswers];
    const shuffleQuestions = this.shuffleQuestions(questionsArray);
    // this.countdown();
    this.setState({
      shuffleQuestions,
      currentQuestion: questions[plus1],
      wasClicked: false,
      isShow: false,
      questionNumber: plus1,
      timer: 30,
    });
  }

  // ref: https://www.npmjs.com/package/array-shuffle
  shuffleQuestions = (array) => arrayShuffle(array);

  render() {
    const {
      currentQuestion: {
        category,
        question,
        correct_answer: correctAnswer,
        difficulty,
      },
      isShow,
      wasClicked,
      shuffleQuestions,
      isDisabledButton,
      timer,
      questionNumber,
    } = this.state;
    console.log(timer);
    return (
      <>
        <Header />
        <main>

          <section className="card">
            <div className="container-info">
              <QuestionInfo
                questionNumber={ questionNumber }
                category={ category }
                difficulty={ difficulty }
              />
            </div>
            <h3 data-testid="question-text">{ question }</h3>
            <div className="alternative-box" data-testid="answer-options">
              <AlternativeButtons
                wasClicked={ wasClicked }
                answerWasClicked={ this.answerWasClicked }
                shuffleQuestions={ shuffleQuestions }
                correctAnswer={ correctAnswer }
                timer={ timer }
                difficulty={ difficulty }
                isDisabledButton={ isDisabledButton }
              />
            </div>
            <div className="container-timer">
              <Timer timer={ timer } />
              {
                isShow || timer === 0 ? (
                  <button
                    type="button"
                    onClick={ this.handleButtonNextQuestion }
                    className="buttonNext"
                    data-testid="btn-next"
                  >
                    Next
                  </button>)
                  : false
              }
            </div>
          </section>

        </main>
      </>
    );
  }
}

ScreenGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ScreenGame;
