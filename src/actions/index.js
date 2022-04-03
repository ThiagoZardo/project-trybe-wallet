import awesomeApi from '../services/awesomeapi';

export const saveEmail = (email) => ({
  type: 'USER_EMAIL',
  email,
});

export const infosExpensesAction = (infos, data) => ({
  type: 'INFOS_EXPENSES',
  infos,
  data,
});

export const requestApi = () => ({
  type: 'REQUEST_API',
});

export const responseAPI = (data) => ({
  type: 'RESPONSE_API',
  data,
});

export const failureApi = (error) => ({
  type: 'FAILURE_API',
  error,
});

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requestApi());
    try {
      const data = await awesomeApi();
      dispatch(responseAPI(data));
    } catch (error) {
      dispatch(failureApi(error));
    }
  };
}

export function infosExpenses(infos) {
  return async (dispatch) => {
    dispatch(requestApi());
    try {
      const data = await awesomeApi();
      dispatch(infosExpensesAction(infos, data));
    } catch (error) {
      dispatch(failureApi());
    }
  };
}
