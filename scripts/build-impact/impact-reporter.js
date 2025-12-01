/**
 * @fileoverview Impact reporter for build impact measurement
 * @author Bundle Analysis Team
 */

const Logger = require('../bundle-analysis/utils/logger');
const DependencyAnalyzer = require('./dependency-analyzer');
const SizeAnalyzer = require('./size-analyzer');

/**
 * Bundle impact reporter following Single Responsibility Principle
 */
class ImpactReporter {
    /**
     * Display system overview
     */
    static displaySystemOverview() {
        Logger.section('BUNDLE OPTIMIZATION IMPACT', '📊');

        const totalSize = SizeAnalyzer.getDirectorySize('node_modules');
        if (totalSize) {
            Logger.success(`Total node_modules size: ${totalSize}`);
        }
    }

    /**
     * Display top dependencies analysis (only production dependencies)
     */
    static displayTopDependencies() {
        Logger.section(
            'Top 15 PRODUCTION dependencies by size (optimizable)',
            '🔍'
        );

        // Get production dependencies for filtering
        const prodDeps = DependencyAnalyzer.getProductionDependencies();

        // Core dependencies to exclude from optimization analysis
        const coreExclusions = [
            'react',
            'react-dom',
            'prop-types',
            'next',
            'vue',
            'angular'
        ];

        const topDeps = SizeAnalyzer.getTopDependencies(25, prodDeps)
            .filter(
                dep =>
                    !coreExclusions.some(
                        core =>
                            dep.name === core || dep.name.startsWith(`${core}/`)
                    )
            )
            .slice(0, 15);

        if (topDeps.length > 0) {
            topDeps.forEach((dep, index) => {
                Logger.item(`${index + 1}. ${dep.name} - ${dep.size}`);
            });
            Logger.item(
                '💡 Se excluyen dependencias core (react, react-dom) para enfocar optimización'
            );
        } else {
            Logger.error(
                'Could not analyze optimizable production dependencies'
            );
        }
    }

    /**
     * Display bundle analysis
     */
    static displayBundleAnalysis() {
        Logger.section('Optimized bundle', '📊');

        const bundleSize = SizeAnalyzer.getDirectorySize('modules-optimized');
        if (bundleSize) {
            Logger.success(`Bundle size: ${bundleSize}`);
            Logger.item('Location: modules-optimized/');
        } else {
            Logger.error('Bundle not generated - run: npm run pre-build');
        }
    }

    /**
     * Display dependency classification with production clarification
     */
    static displayDependencyAnalysis() {
        const prodDeps = DependencyAnalyzer.getProductionDependencies();
        const devDeps = DependencyAnalyzer.getDevDependencies();

        Logger.section('Análisis de dependencias', '📈');

        Logger.success(
            `Production dependencies: ${prodDeps.length} (VAN A PRODUCCIÓN)`
        );
        Logger.item(
            `Development dependencies: ${devDeps.length} (NO van a producción)`
        );
        Logger.item(
            `Total en node_modules: ${prodDeps.length + devDeps.length}`
        );

        Logger.section('IMPORTANTE', '⚠️');
        Logger.item('Solo las "dependencies" van al bundle de producción.');
        Logger.item(
            'Las "devDependencies" solo se usan durante desarrollo y testing.'
        );
    }

    /**
     * Display completion message and useful commands
     */
    static displayCompletion() {
        Logger.success('Impact measurement completed');
        Logger.item('💡 To generate optimized bundle: npm run pre-build');
    }
}

module.exports = ImpactReporter;
