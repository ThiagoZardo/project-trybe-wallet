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
    const { userEmail, currencies } = this.props;
    // console.log(currencies);
    return (
      <nav>
        <div data-testid="email-field">
          { userEmail }
        </div>
        <div data-testid="total-field">
          0
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
        <form>

          <label
            htmlFor="valor"
          >
            Valor
            <input data-testid="value-input" />
          </label>

          <label
            htmlFor="descricao"
          >
            Descrição
            <input data-testid="description-input" />
          </label>

          <label
            htmlFor="moeda"
          >
            Moeda
            <select data-testid="currency-input" id="moeda">
              {
                currencies.map(($) => <option key={ $ }>{ $ }</option>)
              }
            </select>
          </label>

          <label
            htmlFor="pagamento"
          >
            Método de Pagamento
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label
            htmlFor="categoria"
          >
            Categoria
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
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
