import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchToken from '../redux/actions/tokenAction';
import addUser from '../redux/actions/actionUser';
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
      const { sendToken, sendUser } = this.props;
      await sendToken();
      const { token } = this.props;
      localStorage.setItem('token', token);
      sendUser({ name, email });
      this.setState({
        redirect: true,
      });
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
                <ion-icon name="person-sharp" />
                <input
                  value={ name }
                  data-testid="input-player-name"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nome"
                  onChange={ this.handleInputChange }
                />
              </label>

              <label htmlFor="email">
                <ion-icon name="mail-sharp" />
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
  token: PropTypes.string.isRequired,
  sendUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  sendToken: () => dispatch(fetchToken()),
  sendUser: (infoUser) => dispatch(addUser(infoUser)),
  redirectToSettings: (nameUser) => dispatch(addUser(nameUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
