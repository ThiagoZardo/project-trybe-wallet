const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'TIPO_DA_ACTION':
    return {
      ...state,
      user: {
        email: action.user.email,
      },
    };
  default:
    return state;
  }
}

export default reducer;
