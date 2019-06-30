module.exports = {
  "env": {
    "browser": true,
    "jest": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "impliedStrict": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jest"
  ],
  "rules": {
  }
};
