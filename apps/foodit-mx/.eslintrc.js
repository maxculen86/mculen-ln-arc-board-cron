module.exports = {
    root: true,
    extends: ['../../.eslintrc.js'],
    globals: {
        // Globals externos de runtime cargados por <script> (no son undefs reales).
        firebase: 'readonly'
    },
    rules: {
        // Durante la migración progresiva (Fases 3-4), los componentes se van
        // copiando al bundle incrementalmente. Los imports van a estar sin resolver
        // hasta que cada bloque de Fase 4 se complete. Downgrade a warn para no
        // bloquear el desarrollo. Volver a 'error' cuando Fase 4 esté completa.
        'import/no-unresolved': ['warn', { ignore: ['fusion:'] }],
        // El código de features se copia VERBATIM del monolito (Fase 4). Trae nits
        // de estilo airbnb que NO son bugs (revisados: globals externos, params de
        // callback, expresiones con side-effect). Downgrade a warn durante la
        // migración para no bloquear el commit. Volver a 'error' cuando Fase 4 termine.
        'import/extensions': 'warn',
        'react/function-component-definition': 'warn',
        'react/jsx-no-useless-fragment': 'warn',
        camelcase: 'warn',
        'no-use-before-define': 'warn',
        'no-unused-vars': 'warn',
        'no-unused-expressions': 'warn',
        'arrow-body-style': 'warn',
        radix: 'warn',
        'import/no-useless-path-segments': 'warn'
    },
    overrides: [
        {
            // webpack.config.js usa CommonJS require() — sin módulos ES
            files: ['webpack.config.js'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
                'global-require': 'off'
            }
        }
    ]
};
