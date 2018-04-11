module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  'globals': {
    'localStorage': true,
    'FormData': true,
    'window': true
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'dot-notation': ['off'],
    'semi': ['warn'],
    'prefer-template': ['off'],
    'comma-dangle': ['off'],
    'no-unused-vars': ['warn'],
    'no-undef': ['warn'],
    'no-param-reassign': ['off'],
    'arrow-body-style': ['off'],
    "brace-style": [ 'warn', 'stroustrup', { 'allowSingleLine': false } ],
  }
}
