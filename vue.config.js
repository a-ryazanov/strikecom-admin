'use strict'

const vueWebpackHelpers = require('@x10d/vue-kit/src/utils/webpack')


module.exports = {
    publicPath: 'moderation',
    lintOnSave: false,

    css: {
        sourceMap: false,
    },

    chainWebpack(config) {
    // С `*eval*` опциями в некоторых случаях
    // в Chrome не триггерится событие `unhandledrejection`
    // (см. https://bugs.chromium.org/p/v8/issues/detail?id=4874#c13)
        config.devtool('cheap-module-source-map')

        vueWebpackHelpers.chainVueSvgLoader(config)

        vueWebpackHelpers.setupCriticalPathRendering(
            config,
            [
                './src/styles/critical.styl',
            ],
        )
    },
}
