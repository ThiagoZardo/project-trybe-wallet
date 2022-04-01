import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  validadeLogin = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, this.validateButton);
  }

  validateButton = () => {
    const { email, password } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const seis = 6;
    if (password.length >= seis && emailRegex.test(email)) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  render() {
    const { isButtonDisabled, email } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        <form>
          <input
            name="email"
            type="text"
            placeholder="E-mail"
            data-testid="email-input"
            onChange={ this.validadeLogin }
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.validadeLogin }
          />
          <Link
            to="/carteira"
          >
            <button
              name="loginBtn"
              data-testid="login-submit-button"
              type="submit"
              disabled={ isButtonDisabled }
              onClick={ () => userEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
