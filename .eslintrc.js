module.exports = {
  env: {
    browser: true,
    es6: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb", "plugin:react/recommended", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,

    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/react-in-jsx-scope": "off",
      "react/forbid-prop-types": "off",
      "import/prefer-default-export": "off",
  },
};
