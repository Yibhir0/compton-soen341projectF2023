module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "commonjs": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true,
                "jest": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off",
        "no-prototype-builtins": 'off',
        "no-fallthrough": "off",
        "semi": "off",
        "quotes": "off",
        "no-empty": "off",
        "no-unused-vars": "off",
        "no-cond-assign": "off",
        "no-undef":"off",
        "no-useless-escape":"off",
        "no-misleading-character-class":"off",
        "getter-return":"off",
        "no-func-assign":"off",
        "no-sparse-arrays":"off",
        "no-redeclare":"off",
        "valid-typeof": "off",
        "no-control-regex":"off",
        "no-unsafe-finally":"off",
        "react/display-name":"off",
        "react/no-find-dom-node":"off"


    }
}
