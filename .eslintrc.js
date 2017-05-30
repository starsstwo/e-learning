// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ["standard", "vue"],
  // required to lint *.vue files
  plugins: [
    "html",
    "flowtype-errors"
  ],
  // add your custom rules here
  "rules": {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "flowtype-errors/show-errors": 2,
    "vue/jsx-uses-vars": 2,
    "semi": 2,
    "space-before-function-paren": 0,
    "camelcase": 1,
    "yoda": 0,
    "no-var": 2,
    "eol-last": 0
  }
}
