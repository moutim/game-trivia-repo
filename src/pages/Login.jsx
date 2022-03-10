import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions/actions';

class Login extends Component {
    state = {
      email: '',
      name: '',
      isDisable: true,
    }

    isValidInfo = () => {
      const { email, name } = this.state;

      if (email && name) {
        this.setState({ isDisable: false });
      } else this.setState({ isDisable: true });
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
      } = this.state;

      return (
        <main>
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

        </main>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  redirectToSettings: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  redirectToSettings: (state) => dispatch(addUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
