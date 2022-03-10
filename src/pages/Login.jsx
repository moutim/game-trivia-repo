import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchToken from '../redux/actions/tokenAction';
import addUser from '../redux/actions/actionUser';

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
      console.log(token);
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
      const { name, email, isDisable, redirect } = this.state;
      return (
        <main>
          { redirect && <Redirect to="/screenGame" /> }
          <h2>Login</h2>

          <div className="userInputs">
            <label htmlFor="name">
              Nome:
              <input
                value={ name }
                data-testid="input-player-name"
                type="text"
                name="name"
                id="name"
                onChange={ this.handleInputChange }
              />
            </label>

            <label htmlFor="email">
              Email:
              <input
                value={ email }
                data-testid="input-gravatar-email"
                type="text"
                name="email"
                id="email"
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              data-testid="btn-play"
              disabled={ isDisable }
              type="button"
              onClick={ this.handleButtonPlay }
            >
              Play
            </button>
          </div>
        </main>
      );
    }
}

Login.propTypes = {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
