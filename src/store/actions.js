export const login = ({ commit }, loginData) => {
  commit('login', loginData);
};

export const logout = ({ commit }) => {
  commit('logout');
};

export const setStocks = ({ commit }, stocks) => {
  commit('setStocks', stocks);
};
