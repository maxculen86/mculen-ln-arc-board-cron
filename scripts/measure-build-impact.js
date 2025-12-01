#!/usr/bin/env node
/**
 * @fileoverview Dynamic build impact measurement
 * @description Measures bundle optimization impact using modular architecture
 * @author Bundle Analysis Team
 *
 * Applies SOLID principles with zero tolerance for ESLint/Prettier/Sonar
 * Reuses existing bundle-analysis utilities following DRY principle
 */

const ImpactReporter = require('./build-impact/impact-reporter');

/**
 * Main orchestrator following Open/Closed Principle
 */
class BuildImpactAnalyzer {
    /**
     * Execute complete impact analysis
     */
    static analyze() {
        ImpactReporter.displaySystemOverview();
        ImpactReporter.displayTopDependencies();
        ImpactReporter.displayBundleAnalysis();
        ImpactReporter.displayDependencyAnalysis();
        ImpactReporter.displayCompletion();
    }
}

// Run if called directly
if (require.main === module) {
    BuildImpactAnalyzer.analyze();
}

module.exports = BuildImpactAnalyzer;
