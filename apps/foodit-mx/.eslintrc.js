module.exports = {
    root: true,
    extends: ['../../.eslintrc.js'],
    rules: {
        // Durante la migración progresiva (Fases 3-4), los componentes se van
        // copiando al bundle incrementalmente. Los imports van a estar sin resolver
        // hasta que cada bloque de Fase 4 se complete. Downgrade a warn para no
        // bloquear el desarrollo. Volver a 'error' cuando Fase 4 esté completa.
        'import/no-unresolved': ['warn', { ignore: ['fusion:'] }]
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
