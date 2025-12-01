/**
 * @fileoverview Bundle candidates analyzer
 * @description Analyzes dependencies for webpack bundle optimization
 * @author Bundle Analysis Team
 *
 * 💡 AYUDA: Para ver archivos y detalles completos usa:
 *    npm run analyze-candidates -- --verbose
 *
 * 🛠️ COMANDOS ÚTILES:
 *   npm run pre-build              # Generar bundle optimizado
 *   npm run build-impact           # Medir impacto en build
 *   du -hs node_modules/* | sort -hr | head -10 # Top 10 dependencias por tamaño
 *   npm ls --depth=1               # Ver dependencias directas
 *   npm run analyze-candidates     # Este script
 */

const { BundleAnalysis } = require('./bundle-analysis');

/**
 * Analyze bundle optimization candidates
 * Uses modular architecture with SOLID principles
 * @param {boolean} verbose - Show detailed recommendations
 */
async function analyzeBundleCandidates(verbose = false) {
    await BundleAnalysis.run(verbose);
}

// Exportar para uso programático
module.exports = analyzeBundleCandidates;

// Ejecutar si se llama directamente
if (require.main === module) {
    // Parse command line arguments
    const args = process.argv.slice(2);
    const verbose = args.includes('--verbose') || args.includes('-v');

    analyzeBundleCandidates(verbose);
}
