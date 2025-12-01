/**
 * @fileoverview Size analyzer for build impact measurement
 * @author Bundle Analysis Team
 */

const ShellExecutor = require('../bundle-analysis/utils/shell-executor');

/**
 * System size analyzer following Single Responsibility Principle
 */
class SizeAnalyzer {
    /**
     * Get directory size using shell command
     * @param {string} target - Path to analyze
     * @returns {string|null} Size string or null
     */
    static getDirectorySize(target) {
        const result = ShellExecutor.execute(`du -hs "${target}" 2>/dev/null`);
        return result ? result.trim().split('\t')[0] : null;
    }

    /**
     * Get top dependencies by size
     * @param {number} limit - Number of top dependencies
     * @param {string[]} filterDependencies - Optional filter list (production deps)
     * @returns {Array<{name: string, size: string}>} Top dependencies
     */
    static getTopDependencies(limit = 10, filterDependencies = null) {
        const command = `du -hs node_modules/* 2>/dev/null | sort -hr`;
        const result = ShellExecutor.execute(command);

        if (!result) return [];

        const allDeps = result
            .trim()
            .split('\n')
            .filter(line => line.trim())
            .map(line => {
                const [size, depPath] = line.split('\t');
                const name = depPath.replace('node_modules/', '');
                return { name, size };
            });

        // Filter by production dependencies if provided
        const filteredDeps = filterDependencies
            ? allDeps.filter(dep =>
                  filterDependencies.some(
                      prodDep =>
                          dep.name === prodDep ||
                          dep.name.startsWith(`${prodDep}/`)
                  )
              )
            : allDeps;

        return filteredDeps.slice(0, limit);
    }
}

module.exports = SizeAnalyzer;
