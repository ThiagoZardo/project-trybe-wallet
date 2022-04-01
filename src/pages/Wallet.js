import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { awesomeApi } = this.props;
    awesomeApi();
  }

  render() {
    const { userEmail } = this.props;
    return (
      <nav>
        <p
          data-testid="email-field"
        >
          { userEmail }
        </p>
        <p
          data-testid="total-field"
        >
          0
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  awesomeApi: () => dispatch(fetchApi()),
});

Wallet.propTypes = {
  userEmail: PropTypes.objectOf(PropTypes.string).isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
  awesomeApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
