const path = require('path');

module.exports = {
    stories: ["../src/**/*.stories.tsx"],
    addons: [
        "@storybook/addon-actions",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-css-modules-preset",
        '@storybook/addon-postcss'
    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
    webpackFinal: async(config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "~": path.resolve(__dirname, "../src"),
        };

        return config;
    },
};