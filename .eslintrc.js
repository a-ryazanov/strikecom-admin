'use strict'

module.exports = {
    root: true,

    env: {
        browser: true,
        node: true,
    },

    extends: [
        '@x10d',
        '@x10d/eslint-config/typescript',
        '@x10d/eslint-config/vue',
    ],

    settings: {
        'import/resolver': {
            webpack: {
                config: require.resolve('@vue/cli-service/webpack.config.js'),
            },
        },
    },

    rules: {
        // Отключать правила импортов (например, `import/namespace`)
        // не имеет особого смысла, т.к. время, "освобожденное" ими,
        // начинают занимать другие (например,
        // `import/no-unresolved`, `import/named`, `import/no-named-as-default`),
        // что, вероятно связано с тем, что большая часть этого времени -
        // обращения к файлам, которые как-то кэшируются и не проявляются
        // на последующих правилах; т.е. какие-то в любом случае будут занимать это время.

        'import/extensions': ['error', 'never', { vue: 'always' }],

        '@typescript-eslint/no-unused-vars': ['error', {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
        }],
    },

    overrides: [
        {
            files: [
                '**/*.ts',
                '**/*.vue',
            ],
            rules: {

                // На усмотрение разработчика
                '@typescript-eslint/array-type': 'off',

                '@typescript-eslint/consistent-type-assertions': 'off',
            },
        },
    ],

}
