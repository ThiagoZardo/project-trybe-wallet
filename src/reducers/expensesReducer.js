const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  error: null,
};

const expensesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      expenses: action.infos,
    };
  default:
    return state;
  }
};

export default expensesReducer;
