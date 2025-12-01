/**
 * @fileoverview Candidates analyzer for final recommendations
 * @author Bundle Analysis Team
 */

const fs = require('fs');
const ShellExecutor = require('../utils/shell-executor');
const Logger = require('../utils/logger');
const CONFIG = require('../config');

/**
 * Analyzes and recommends specific candidates for wrapper optimization
 */
class CandidatesAnalyzer {
    /**
     * Get current wrapper dependencies
     * @returns {Set} Set of current wrapper dependencies
     */
    static getCurrentWrapperDeps() {
        try {
            const wrapperContent = fs.readFileSync(
                CONFIG.PATHS.WRAPPER_FILE,
                'utf8'
            );

            // Regex que maneja tanto comillas simples como dobles
            const matches = wrapperContent.match(
                /['"]([^'"]+)['"]:\s*require\(['"]([^'"]+)['"]\)/g
            );
            if (!matches) return new Set();

            return new Set(
                matches.map(match => {
                    const dep = match.match(
                        /['"]([^'"]+)['"]:\s*require\(['"]([^'"]+)['"]\)/
                    )[2];
                    return dep;
                })
            );
        } catch {
            return new Set();
        }
    }

    /**
     * Get dependency size from node_modules
     * @param {string} dep - Dependency name
     * @returns {string} Size string (e.g., "1.2M", "500K")
     */
    static getDependencySize(dep) {
        const command = `du -hs node_modules/${dep} 2>/dev/null | cut -f1`;
        const size = ShellExecutor.execute(command);
        return size ? size.trim() : 'N/A';
    }

    /**
     * Determine action based on usage and current state
     * @param {string} dep - Dependency name
     * @param {number} usage - Usage count
     * @param {Set} currentDeps - Current wrapper dependencies
     * @returns {string} Action recommendation
     */
    static determineAction(dep, usage, currentDeps) {
        if (currentDeps.has(dep)) {
            return '✅ YA INCLUIDA';
        }

        if (usage >= CONFIG.THRESHOLDS.USAGE.HIGH) {
            return '✅ INCLUIR';
        }

        if (usage >= CONFIG.THRESHOLDS.USAGE.MEDIUM) {
            return '🟡 EVALUAR';
        }

        return '❌ SALTAR';
    }

    /**
     * Generate candidates table and recommendations
     * @param {Object} usageResults - Usage analysis results
     */
    static generateCandidatesReport(usageResults) {
        Logger.section('🎯 CANDIDATOS PARA WRAPPER OPTIMIZATION', '🎯');

        const currentWrapperDeps = this.getCurrentWrapperDeps();
        const candidates = [];
        const toAdd = [];

        // Procesar solo los top candidatos para no saturar
        const sortedCandidates = Object.entries(usageResults)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 20); // Top 20 para mantener la tabla manejable

        Logger.item(
            '🔄 Analizando tamaños... (esto puede tomar unos segundos)'
        );

        sortedCandidates.forEach(([dep, usage]) => {
            const size = this.getDependencySize(dep);
            const action = this.determineAction(dep, usage, currentWrapperDeps);

            candidates.push({
                name: dep.length > 43 ? `${dep.substring(0, 40)}...` : dep,
                usage,
                size,
                action
            });

            // Agregar a lista de recomendaciones si debe incluirse
            if (action === '✅ INCLUIR') {
                toAdd.push(dep);
            }
        });

        // Mostrar tabla
        Logger.candidatesTable(candidates);

        // Mostrar estadísticas
        const incluir = candidates.filter(
            c => c.action === '✅ INCLUIR'
        ).length;
        const evaluar = candidates.filter(
            c => c.action === '🟡 EVALUAR'
        ).length;
        const yaIncluidas = candidates.filter(
            c => c.action === '✅ YA INCLUIDA'
        ).length;

        Logger.item(
            `📊 Resumen: ${incluir} a incluir, ${evaluar} a evaluar, ${yaIncluidas} ya incluidas`
        );

        // Mostrar instrucciones específicas
        if (toAdd.length > 0) {
            Logger.wrapperInstructions(toAdd);
        } else if (yaIncluidas > 0) {
            Logger.section('✅ ESTADO ACTUAL', '✅');
            Logger.item(
                'El wrapper ya tiene las dependencias más importantes incluidas.'
            );
            Logger.item(
                'Considera evaluar las marcadas con 🟡 según su tamaño.'
            );
        } else {
            Logger.section('🤔 SIN CANDIDATOS CLAROS', '🤔');
            Logger.item('No hay candidatos obvios para optimización.');
            Logger.item(
                'Considera revisar las dependencias marcadas con 🟡 EVALUAR.'
            );
        }
    }
}

module.exports = CandidatesAnalyzer;
