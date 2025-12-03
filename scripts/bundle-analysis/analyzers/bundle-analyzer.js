/**
 * @fileoverview Bundle analyzer for wrapper optimization
 * @author Bundle Analysis Team
 */

const FileHelper = require('../utils/file-helper');
const ShellExecutor = require('../utils/shell-executor');
const Logger = require('../utils/logger');
const CONFIG = require('../config');

/**
 * Analyzes current bundle state
 */
class BundleAnalyzer {
    /**
     * Analyze current wrapper dependencies
     */
    static analyzeWrapper() {
        Logger.section('DEPENDENCIAS ACTUALES EN WRAPPER', '📊');

        const content = FileHelper.readFile(CONFIG.PATHS.WRAPPER_FILE);

        if (!content) {
            Logger.error('wrapper-optimization.js no encontrado');
            return;
        }

        const dependencyMatches = content.match(
            /"([^"]+)":\s*require\("([^"]+)"\)/g
        );

        if (!dependencyMatches) {
            Logger.error('No se encontraron dependencias en wrapper');
            return;
        }

        Logger.item(
            `Total incluidas: ${dependencyMatches.length} dependencias`
        );

        dependencyMatches.forEach(match => {
            const dep = match.match(/"([^"]+)":\s*require\("([^"]+)"\)/)[2];
            Logger.success(dep);
        });
    }

    /**
     * Analyze bundle state and size
     */
    static analyzeBundleState() {
        Logger.section('ESTADO DEL BUNDLE OPTIMIZADO', '📊');

        if (!FileHelper.exists(CONFIG.PATHS.BUNDLE_FILE)) {
            Logger.error('Bundle no generado - ejecutar: npm run pre-build');
            return;
        }

        const bundleSizeOutput = ShellExecutor.execute(
            CONFIG.COMMANDS.BUNDLE_SIZE
        );
        if (bundleSizeOutput) {
            Logger.success(`Bundle generado: ${bundleSizeOutput.trim()}`);
        }

        const sizeMB = FileHelper.getSizeMB(CONFIG.PATHS.BUNDLE_FILE);
        this.evaluateBundleSize(sizeMB);
    }

    /**
     * Evaluate bundle size and provide feedback
     * @param {number} sizeMB - Bundle size in MB
     */
    static evaluateBundleSize(sizeMB) {
        if (sizeMB > CONFIG.THRESHOLDS.BUNDLE_SIZE_MB.TOO_LARGE) {
            Logger.warning(
                `Bundle grande (${sizeMB}MB) - considerar optimizar selección`
            );
        } else if (sizeMB < CONFIG.THRESHOLDS.BUNDLE_SIZE_MB.TOO_SMALL) {
            Logger.info(
                `Bundle pequeño (${sizeMB}MB) - considerar agregar más dependencias`
            );
        } else {
            Logger.success(`Tamaño óptimo (${sizeMB}MB)`);
        }
    }

    /**
     * Display useful commands
     */
    static displayCommands() {
        Logger.section('COMANDOS ÚTILES', '🛠️');

        const commands = [
            ['npm run pre-build', 'Generar bundle optimizado'],
            ['npm run build-impact', 'Medir impacto en build'],
            [
                'du -hs node_modules/* | sort -hr | head -10',
                'Top 10 dependencias por tamaño'
            ],
            ['npm ls --depth=1', 'Ver dependencias directas'],
            ['npm run analyze-candidates', 'Este script'],
            [
                'npm run analyze-candidates -- --verbose',
                '🔍 Ver archivos y detalles completos'
            ]
        ];

        Logger.commands(commands);

        Logger.item(
            '\n💡 Para análisis detallado usa: npm run analyze-candidates -- --verbose'
        );
        Logger.item(
            '\n✨ Análisis completado. Ver docs/webpack-optimization/dependency-selection-methodology.md\n'
        );
    }
}

module.exports = BundleAnalyzer;
