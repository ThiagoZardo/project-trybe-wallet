const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'TIPO_DA_ACTION':
    return {
      ...state,
      email: action.user.email,
    };
  default:
    return state;
  }
}

export default reducer;
