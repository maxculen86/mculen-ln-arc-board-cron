/**
 * @fileoverview Configuración centralizada para bundle analysis
 * @author Bundle Analysis Team
 */

const CONFIG = {
    THRESHOLDS: {
        USAGE: {
            HIGH: 10,
            MEDIUM: 5,
            LOW: 2
        },
        BUNDLE_SIZE_MB: {
            TOO_LARGE: 3,
            TOO_SMALL: 1
        }
    },

    // Filtros para excluir dependencias que no son candidatos
    EXCLUSIONS: {
        // Dependencias de desarrollo que no van al bundle final
        DEV_PATTERNS: [
            '@types/',
            'eslint',
            'prettier',
            'jest',
            'babel',
            'webpack',
            '@testing-library',
            'typescript'
        ],
        // Dependencias que son manejadas externalmente o muy pequeñas
        SKIP_PATTERNS: [
            'react', // Manejado por Arc XP
            'react-dom', // Manejado por Arc XP
            'prop-types' // Muy pequeño, no vale la pena
        ]
    },

    COMMANDS: {
        SIZE_ANALYSIS: 'du -hs node_modules/* | sort -hr | head -15',
        FIND_JS_FILES:
            'find components/ src/ -name "*.js" -o -name "*.jsx" 2>/dev/null',
        USAGE_COUNT: 'xargs grep -l "{pattern}" 2>/dev/null | wc -l',
        BUNDLE_SIZE: 'du -hs modules-optimized/wrapper.js'
    },

    PATHS: {
        WRAPPER_FILE: './wrapper-optimization.js',
        BUNDLE_FILE: './modules-optimized/wrapper.js'
    }
};

module.exports = CONFIG;
