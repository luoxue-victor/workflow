// babel.config.js
module.exports = {
    presets: [
        [
            '@babel/preset-react',
            {
                targets: {
                    node: 'current',
                }
            },
            '@babel/preset-env',
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            "@babel/plugin-transform-modules-commonjs",
            {
                "allowTopLevelThis": true
            }
        ]
    ]
};
