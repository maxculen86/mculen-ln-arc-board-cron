const path = require('path');

module.exports = {
    entry: './wrapper-optimization.js',
    mode: 'production', // Cambio a production para mejor optimización
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'modules-optimized'),
        filename: 'wrapper.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom', // Mantenemos react-dom como external aunque lo incluyamos
        'mock-require': 'mock-require'
    },
    optimization: {
        minimize: true,
        usedExports: true,
        sideEffects: false // Tree shaking más agresivo
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        node: '20' // Optimizar para Node 20+ (Lambda)
                                    },
                                    modules: false // Permitir tree shaking
                                }
                            ],
                            '@babel/preset-react'
                        ],
                        plugins: ['@babel/plugin-proposal-export-default-from']
                    }
                }
            }
        ]
    }
};
