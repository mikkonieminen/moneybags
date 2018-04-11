<template>
  <div class="login">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12">
        <h4>Login</h4>
        <form @submit.prevent novalidate>
          <div class="form-group">
            <input class="form-control"
            type="email"
            placeholder="Email"
            v-model="credentials.email">
          </div>
          <div class="form-group">
            <input class="form-control"
            type="password"
            placeholder="Password"
            v-model="credentials.password">
          </div>
          <button class="btn btn-primary"
          type="submit"
          @click="submit()">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../auth';

export default {
  name: 'login',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    submit() {
      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      };
      Auth.login(this, credentials, '/');
    }
  }
};
</script>
