import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, infosExpenses } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: '',
      descricao: '',
      moeda: '',
      pagamento: '',
      categoria: '',
    };
  }

  componentDidMount() {
    const { awesomeApi } = this.props;
    awesomeApi();
  }

  changeInput = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  clearInputs = () => {
    this.setState({
      valor: '',
      descricao: '',
      moeda: '',
      pagamento: '',
      categoria: '',
    });
  }

  render() {
    const { userEmail, currencies, expenses } = this.props;
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
            <input
              data-testid="value-input"
              name="valor"
              onChange={ this.changeInput }
            />
          </label>

          <label
            htmlFor="descricao"
          >
            Descrição
            <input
              data-testid="description-input"
              name="descricao"
              onChange={ this.changeInput }
            />
          </label>

          <label
            htmlFor="moeda"
          >
            Moeda
            <select
              data-testid="currency-input"
              name="moeda"
              id="moeda"
              onChange={ this.changeInput }
            >
              {
                currencies.map(($) => <option key={ $ }>{ $ }</option>)
              }
            </select>
          </label>

          <label
            htmlFor="pagamento"
          >
            Método de Pagamento
            <select
              data-testid="method-input"
              name="pagamento"
              onChange={ this.changeInput }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label
            htmlFor="categoria"
          >
            Categoria
            <select
              data-testid="tag-input"
              name="categoria"
              onChange={ this.changeInput }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button
            id="btnAdd"
            type="button"
            onClick={ () => expenses(this.state) }
          >
            Adicionar despesa
          </button>
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
  expenses: (infos) => dispatch(infosExpenses(infos)),
});

Wallet.propTypes = {
  userEmail: PropTypes.objectOf(PropTypes.string).isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
  awesomeApi: PropTypes.func.isRequired,
  expenses: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
