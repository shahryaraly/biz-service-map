

Install learn
npm install -g lerna

Setup learn in root folder
lerna init && npm install

Install typescript & nodes
npm install typescript @types/node — save-dev

Install eslint prettier 
npm install eslint prettier @typescript-eslint/eslint-parser @typescript-eslint/eslint-plugin

eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ]
}


prettierrc.json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 120,
  "semi": false,
  "singleQuote": false,
  "bracketSpacing": true
}


Create common package under packages directory
mkdir utils

Setup package.json for utils package
npm init --scope @monorepo --workspace ./packages/utils -y




