/**
 * @fileoverview Bundle analysis module exports
 * @author Bundle Analysis Team
 */

const SizeAnalyzer = require('./analyzers/size-analyzer');
const UsageAnalyzer = require('./analyzers/usage-analyzer');
const BundleAnalyzer = require('./analyzers/bundle-analyzer');
const CandidatesAnalyzer = require('./analyzers/candidates-analyzer');
const Logger = require('./utils/logger');

/**
 * Main bundle analysis orchestrator
 */
class BundleAnalysis {
    /**
     * Run complete analysis
     * @param {boolean} verbose - Show detailed recommendations
     */
    static async run(verbose = false) {
        Logger.section('ANALIZANDO CANDIDATOS PARA BUNDLE OPTIMIZATION', '🔍');

        // Analyze dependency sizes
        await SizeAnalyzer.analyze(verbose);

        // Analyze usage frequency and get results
        const usageResults = await UsageAnalyzer.analyze(verbose);

        // Analyze current wrapper state
        BundleAnalyzer.analyzeWrapper();

        // Generate usage recommendations (simplified)
        UsageAnalyzer.generateRecommendations(usageResults, verbose);

        // Generate candidates table and specific recommendations
        CandidatesAnalyzer.generateCandidatesReport(usageResults);

        // Analyze bundle state
        BundleAnalyzer.analyzeBundleState();

        // Display useful commands
        BundleAnalyzer.displayCommands();
    }
}

module.exports = {
    BundleAnalysis,
    SizeAnalyzer,
    UsageAnalyzer,
    BundleAnalyzer,
    CandidatesAnalyzer,
    Logger
};
