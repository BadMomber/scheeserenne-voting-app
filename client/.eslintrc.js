module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  extends: ["@nuxtjs", "prettier", "prettier/standard", "prettier/vue"],

  plugins: ["prettier"],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },

  rules: {
    "no-console": "off",
    "prettier/prettier": ["error", { semi: false, trailingComma: "all" }],
    // // https://github.com/prettier/eslint-config-prettier#vuehtml-self-closing
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "any",
        },
      },
    ],
  }

}
