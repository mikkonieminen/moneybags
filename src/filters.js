import Vue from 'vue';

Vue.filter('truncate', (text, stop, clamp) => {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '');
});

Vue.filter('currency', (value) => {
  return `${parseFloat(value).toFixed(2)} €`;
});
