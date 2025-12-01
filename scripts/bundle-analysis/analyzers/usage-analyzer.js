/**
 * @fileoverview Usage frequency analyzer
 * @author Bundle Analysis Team
 */

const fs = require('fs');
const ShellExecutor = require('../utils/shell-executor');
const Logger = require('../utils/logger');
const CONFIG = require('../config');

/**
 * Analyzes dependency usage frequency
 */
class UsageAnalyzer {
    /**
     * Get production dependencies from package.json
     * @returns {string[]} Array of dependency names
     */
    static getProductionDependencies() {
        try {
            const packageJson = JSON.parse(
                fs.readFileSync('./package.json', 'utf8')
            );
            const dependencies = Object.keys(packageJson.dependencies || {});

            // Filtrar dependencias que no son candidatos
            return dependencies.filter(dep => {
                // Excluir patrones de dev
                const isDevPattern = CONFIG.EXCLUSIONS.DEV_PATTERNS.some(
                    pattern => dep.includes(pattern)
                );

                // Excluir patrones a omitir
                const isSkipPattern = CONFIG.EXCLUSIONS.SKIP_PATTERNS.some(
                    pattern => dep.includes(pattern)
                );

                return !isDevPattern && !isSkipPattern;
            });
        } catch (error) {
            Logger.error('No se pudo leer package.json');
            return [];
        }
    }

    /**
     * Analyze usage frequency for production dependencies
     * @param {boolean} verbose - Show detailed usage analysis
     * @returns {Object} Usage results
     */
    static async analyze(verbose = false) {
        if (!verbose) {
            // Mostrar spinner mientras analiza
            return Logger.spinnerSync(
                'Analizando frecuencia de uso',
                () => {
                    // Ejecutar el análisis sin mostrar detalles
                    const productionDeps = this.getProductionDependencies();
                    const usageResults = {};

                    productionDeps.forEach(dep => {
                        const requireCount = this.getRequireCount(dep);
                        const importCount = this.getImportCount(dep);
                        const totalUsage = requireCount + importCount;

                        if (totalUsage > 0) {
                            usageResults[dep] = totalUsage;
                        }
                    });

                    return usageResults;
                },
                2000
            );
        }

        Logger.section('ANÁLISIS DE FRECUENCIA DE USO', '🔍');

        const productionDeps = this.getProductionDependencies();
        Logger.item(
            `Analizando ${productionDeps.length} dependencias de producción...`
        );

        const usageResults = {};

        productionDeps.forEach(dep => {
            const requireCount = this.getRequireCount(dep);
            const importCount = this.getImportCount(dep);
            const totalUsage = requireCount + importCount;

            if (totalUsage > 0) {
                usageResults[dep] = totalUsage;
                Logger.item(`${dep}: ${totalUsage} archivos`);
            }
        });

        // Mostrar estadísticas
        const foundDeps = Object.keys(usageResults).length;
        const totalDeps = productionDeps.length;
        Logger.item(
            `📊 Resultado: ${foundDeps}/${totalDeps} dependencias en uso`
        );

        return usageResults;
    }

    /**
     * Get require count for dependency
     * @param {string} dep - Dependency name
     * @returns {number} Require count
     */
    static getRequireCount(dep) {
        const command = `${CONFIG.COMMANDS.FIND_JS_FILES} | ${CONFIG.COMMANDS.USAGE_COUNT.replace(
            '{pattern}',
            `require.*${dep}`
        )}`;
        return ShellExecutor.executeNumeric(command);
    }

    /**
     * Get import count for dependency
     * @param {string} dep - Dependency name
     * @returns {number} Import count
     */
    static getImportCount(dep) {
        const command = `${CONFIG.COMMANDS.FIND_JS_FILES} | ${CONFIG.COMMANDS.USAGE_COUNT.replace(
            '{pattern}',
            `import.*${dep}`
        )}`;
        return ShellExecutor.executeNumeric(command);
    }

    /**
     * Generate recommendations based on usage
     * @param {Object} usageResults - Usage results
     * @param {boolean} verbose - Show detailed recommendations
     */
    static generateRecommendations(usageResults, verbose = false) {
        if (!verbose) {
            // Solo mostrar estadísticas resumidas
            const alta = Object.values(usageResults).filter(
                count => count >= CONFIG.THRESHOLDS.USAGE.HIGH
            ).length;
            const media = Object.values(usageResults).filter(
                count =>
                    count >= CONFIG.THRESHOLDS.USAGE.MEDIUM &&
                    count < CONFIG.THRESHOLDS.USAGE.HIGH
            ).length;
            const baja = Object.values(usageResults).filter(
                count =>
                    count >= CONFIG.THRESHOLDS.USAGE.LOW &&
                    count < CONFIG.THRESHOLDS.USAGE.MEDIUM
            ).length;

            Logger.section('RESUMEN DE RECOMENDACIONES', '🎯');
            Logger.item(
                `📊 ${alta} alta prioridad, ${media} media prioridad, ${baja} baja prioridad`
            );
            Logger.item(
                `💡 Para ver detalles: npm run analyze-candidates -- --verbose`
            );
            return;
        }

        Logger.section('RECOMENDACIONES BASADAS EN USO', '🎯');

        const sortedResults = Object.entries(usageResults).sort(
            ([, a], [, b]) => b - a
        );

        if (sortedResults.length === 0) {
            Logger.item('📭 No se encontraron usos detectables');
            return;
        }

        sortedResults.forEach(([dep, count]) => {
            let priority;
            if (count >= CONFIG.THRESHOLDS.USAGE.HIGH) {
                priority = 'alta';
            } else if (count >= CONFIG.THRESHOLDS.USAGE.MEDIUM) {
                priority = 'media';
            } else if (count >= CONFIG.THRESHOLDS.USAGE.LOW) {
                priority = 'baja';
            } else {
                priority = 'excluir';
            }

            Logger.recommendation(dep, count, priority);
        });
    }
}

module.exports = UsageAnalyzer;
