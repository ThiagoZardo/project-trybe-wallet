import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, infosExpenses } from '../actions';

const pagamento = 'Cartão de débito';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Lazer',
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

  handleSubmit = () => {
    const { expenses } = this.props;
    expenses(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: pagamento,
      tag: 'Trabalho',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { userEmail, currencies, expensesProp } = this.props;

    const total = expensesProp.reduce((acc, currentValue) => {
      acc += currentValue.value * currentValue.exchangeRates[currentValue.currency].ask;
      return acc;
    }, 0);

    return (
      <nav>
        <div data-testid="email-field">
          { userEmail }
        </div>
        <div data-testid="total-field">
          { total.toFixed(2) }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
        <form>

          <label
            htmlFor="value"
          >
            Valor
            <input
              data-testid="value-input"
              name="value"
              onChange={ this.changeInput }
              value={ value }
            />
          </label>

          <label
            htmlFor="description"
          >
            Descrição
            <input
              data-testid="description-input"
              name="description"
              onChange={ this.changeInput }
              value={ description }
            />
          </label>

          <label
            htmlFor="currency"
            data-testid="currency-input"
          >
            Moeda
            <select
              name="currency"
              id="currency"
              onChange={ this.changeInput }
              value={ currency }
            >
              {
                currencies.map(($) => <option key={ $ }>{ $ }</option>)
              }
            </select>
          </label>

          <label
            data-testid="method-input"
            htmlFor="method"
          >
            Método de Pagamento
            <select
              name="method"
              onChange={ this.changeInput }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label
            htmlFor="tag"
            data-testid="tag-input"
          >
            Categoria
            <select
              name="tag"
              onChange={ this.changeInput }
              value={ tag }
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
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>
        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {
              expensesProp && (
                expensesProp.map((el, index) => {
                  const { name, ask } = Object.values(el.exchangeRates)
                    .find((elName) => elName.code === el.currency);
                  return (
                    <tr
                      key={ index }
                    >
                      <td>{ el.description }</td>
                      <td>{ el.tag }</td>
                      <td>{ el.method }</td>
                      <td>{ Number(el.value).toFixed(2) }</td>
                      <td>{ name }</td>
                      <td>{ Number(ask) }</td>
                      <td>{ Number(ask).toFixed(2) }</td>
                      <td>{ Number(el.value).toFixed(2) * ask }</td>
                      <td>Real</td>
                    </tr>
                  );
                })
              )
            }
          </tbody>
        </table>
      </nav>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  awesomeApi: () => dispatch(fetchApi()),
  expenses: (state) => dispatch(infosExpenses(state)),
});

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expensesProp: state.wallet.expenses,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  awesomeApi: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
  expensesProp: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
