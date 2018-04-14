import Vue from 'vue';

const LOGIN_URL = 'login';

export default {

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds)
    .then((data) => {
      localStorage.setItem('auth_token', data.body.token);
      localStorage.setItem('user_role', data.body.userRole);
      context.$store.dispatch('login', {
        token: data.body.token,
        role: data.body.userRole
      });

      // Redirect to a specified route
      if (redirect) {
        context.$router.push(redirect);
      }
    });
  },

  logout(context) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    // Vue.http.headers.delete('Authorization');
    context.$store.dispatch('logout');
    context.$router.push('login');
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token')
    };
  },

  restoreLogin(context, redirectSuccess = null, redirectFailure = null) {
    const authToken = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('user_role');

    if (authToken && userRole) {
      context.$store.dispatch('login', {
        token: authToken,
        role: userRole
      });
      if (redirectSuccess) {
        context.$router.push(redirectSuccess);
      }
      return;
    }

    // Vue.http.headers.delete('Authorization');
    context.$store.dispatch('logout');
    context.$router.push('login');

    if (redirectFailure) {
      context.$router.push(redirectFailure);
    }
  }
};
