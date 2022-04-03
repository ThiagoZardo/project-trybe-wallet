// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  id: 0,
  currencies: [],
  expenses: [],
  loading: false,
  error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      loading: true,
    };
  case 'RESPONSE_API':
    return {
      ...state,
      loading: false,
      currencies: Object.keys(action.data),
    };
  case 'FAILURE_API':
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case 'INFOS_EXPENSES': {
    const obj = {
      id: state.id,
      ...action.infos,
      exchangeRates: action.data,
    };
    return {
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses, obj],
    };
  }
  default:
    return state;
  }
};

export default wallet;
