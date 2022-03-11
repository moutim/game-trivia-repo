import React, { Component } from 'react';
import Header from '../components/Header';
import fetchQuestionsAPI from '../services/questionsAPI';

class ScreenGame extends Component {
  // state = {
  //   questions: [],
  // }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const data = await fetchQuestionsAPI(token);
    console.log(data);
  }

  render() {
    const wrongAnswer = 'Alternativa Errada';
    const index = 0;
    return (
      <>
        <Header />
        <main>
          <h1>Perguntas</h1>
          <h2 data-testid="question-category">Categoria</h2>
          <h3 data-testid="question-text">Pergunta</h3>
          <div data-testid="answer-options">
            <button
              type="button"
              data-testid="correct-answer"
            >
              Alternativa Certa
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {wrongAnswer}
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {wrongAnswer}
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {wrongAnswer}
            </button>
          </div>
        </main>
      </>
    );
  }
}

export default ScreenGame;
