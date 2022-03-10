import React, { Component } from 'react';

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
      const { name, email, isDisable } = this.state;
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
          </div>

        </main>
      );
    }
}

export default Login;
