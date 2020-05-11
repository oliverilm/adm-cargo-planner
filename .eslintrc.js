module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "cypress/globals": true,
  },
  parser: "babel-eslint",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "cypress"],
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:cypress/recommended",
    "plugin:jsdoc/recommended",
  ],
  rules: {
    "jsdoc/require-description": 1,
    "jsdoc/require-description-complete-sentence": 1,
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "prefer-arrow-callback": ["error"],
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/prop-types": 0,
    camelcase: [0, { properties: "never" }],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        components: ["Label"],
        required: {
          some: ["nesting", "id"],
        },
        allowChildren: false,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always-and-inside-groups",
      },
    ],
    "no-alert": 0,
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
  },
};
