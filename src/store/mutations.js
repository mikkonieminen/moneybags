export const login = (state, loginData) => {
  const user = {
    token: loginData.token,
    authenticated: true,
    role: loginData.role,
  };
  state.user = user;
  state.history.push('login');
};

export const logout = (state) => {
  const user = {
    token: '',
    authenticated: false,
    role: '',
  };
  state.user = user;
  state.history.push('logout');
};

export const setStocks = (state, stocks) => {
  state.stocks = stocks;
  state.history.push('setStocks');
};
