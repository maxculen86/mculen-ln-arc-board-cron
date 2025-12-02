/**
 * @fileoverview Size analyzer for dependencies
 * @author Bundle Analysis Team
 */

const ShellExecutor = require('../utils/shell-executor');
const Logger = require('../utils/logger');
const CONFIG = require('../config');

/**
 * Analyzes dependency sizes
 */
class SizeAnalyzer {
    /**
     * Analyze and display dependency sizes
     * @param {boolean} verbose - Show detailed size analysis
     */
    static async analyze(verbose = false) {
        if (!verbose) {
            // Mostrar spinner mientras analiza
            await Logger.spinnerSync(
                'Analizando tamaños de dependencias',
                () => {
                    // Ejecutar análisis sin mostrar resultado
                    ShellExecutor.executeLines(CONFIG.COMMANDS.SIZE_ANALYSIS);
                },
                1500
            );
            return;
        }

        Logger.section('TOP 15 DEPENDENCIAS POR TAMAÑO', '📦');

        const sizes = ShellExecutor.executeLines(CONFIG.COMMANDS.SIZE_ANALYSIS);

        if (sizes.length === 0) {
            Logger.error('Error analizando tamaños');
            return;
        }

        sizes.forEach(size => Logger.item(size));
    }
}

module.exports = SizeAnalyzer;
