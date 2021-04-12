module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "parserOptions": { "ecmaVersion": 2018 },
  "extends": ["eslint:recommended"],
  "rules": {
      "no-mixed-spaces-and-tabs": 1,
      "comma-dangle": 0,
      "no-unused-vars": 1,
      "eqeqeq": [1, "smart"],
      "no-useless-concat": 2,
      "no-self-compare": 2,
      "prefer-const": 2,
      "no-var": 2
  }
};
