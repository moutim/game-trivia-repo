import React, { Component } from 'react';
import arrayShuffle from 'array-shuffle';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchQuestionsAPI from '../services/questionsAPI';
import AlternativeButtons from '../components/AlternativeButtons';

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
    } = this.state;

    return (
      <>
        {/* { questionNumber === redirectInPosition && <Redirect to="/feedback" /> } */}
        <Header />
        <main>
          <h1>Perguntas</h1>
          <h2 data-testid="question-category">{ category }</h2>
          <h3 data-testid="question-text">{ question }</h3>
          <h4>{ difficulty }</h4>
          <div data-testid="answer-options">
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
          {
            isShow && (
              <button
                type="button"
                className={ isShow ? 'show' : 'hide' }
                onClick={ this.handleButtonNextQuestion }
                data-testid="btn-next"
              >
                Next
              </button>)
          }
          <h3>
            Tempo:
            { timer }
          </h3>
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
