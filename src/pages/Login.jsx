import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchToken from '../redux/actions/tokenAction';
import addUser from '../redux/actions/actionUser';
import { addPlayer, clearScore } from '../redux/actions/playerAction';
import triviaImg from '../trivia.png';
import './Login.css';

class Login extends Component {
    state = {
      email: '',
      name: '',
      isDisable: true,
      redirect: false,
    }

    isValidInfo = () => {
      const { email, name } = this.state;

      if (email && name) {
        this.setState({ isDisable: false });
      } else this.setState({ isDisable: true });
    }

    handleButtonPlay = async () => {
      const { name, email } = this.state;
      const { sendToken, sendUser, sendPlayer, cleaningScore } = this.props;
      // Agora nossa funcao sendToken ja adiciona o token no localStorage, logo nao precisamos inserir ele por aqui
      await sendToken();
      sendUser({ name, email });
      sendPlayer({ name, email });
      this.setState({ redirect: true });
      cleaningScore(0);
    }

    handleInputChange = ({ target: { value, id } }) => {
      this.setState({ [id]: value }, this.isValidInfo);
    }

    render() {
      const {
        redirectToSettings,
        history,
      } = this.props;

      const {
        name,
        email,
        isDisable,
        redirect,
      } = this.state;

      return (
        <main className="mainLogin">
          { redirect && <Redirect to="/screenGame" /> }

          <img src={ triviaImg } alt="Titulo Trivia" className="triviaImg" />

          <div className="containerInputs">
            <h2>Login</h2>

            <div className="userInputs">
              <label htmlFor="name">
                <i className="fa-solid fa-user" />
                <input
                  value={ name }
                  data-testid="input-player-name"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={ this.handleInputChange }
                />
              </label>

              <label htmlFor="email">
                <i className="fa-solid fa-envelope" />
                <input
                  value={ email }
                  data-testid="input-gravatar-email"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={ this.handleInputChange }
                />
              </label>

              <div className="userButtons">
                <button
                  data-testid="btn-play"
                  disabled={ isDisable }
                  type="button"
                  onClick={ this.handleButtonPlay }
                >
                  Play
                </button>

                <button
                  data-testid="btn-settings"
                  onClick={ () => {
                    redirectToSettings(name);
                    history.push('/settings');
                  } }
                  type="button"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  redirectToSettings: PropTypes.func.isRequired,
  sendToken: PropTypes.func.isRequired,
  sendUser: PropTypes.func.isRequired,
  sendPlayer: PropTypes.func.isRequired,
  cleaningScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendToken: () => dispatch(fetchToken()),
  sendUser: (infoUser) => dispatch(addUser(infoUser)),
  sendPlayer: (infoPlayer) => dispatch(addPlayer(infoPlayer)),
  redirectToSettings: (nameUser) => dispatch(addUser(nameUser)),
  cleaningScore: (score) => dispatch(clearScore(score)),
});

export default connect(null, mapDispatchToProps)(Login);
