/**
 * @fileoverview Dependency analyzer for build impact measurement
 * @author Bundle Analysis Team
 */

const path = require('path');
const FileHelper = require('../bundle-analysis/utils/file-helper');

/**
 * Package.json dependency analyzer following Single Responsibility Principle
 */
class DependencyAnalyzer {
    /**
     * Get production dependencies
     * @returns {string[]} Production dependency names
     */
    static getProductionDependencies() {
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const content = FileHelper.readFile(packageJsonPath);
        if (!content) return [];

        try {
            const packageJson = JSON.parse(content);
            return Object.keys(packageJson.dependencies || {});
        } catch {
            return [];
        }
    }

    /**
     * Get development dependencies
     * @returns {string[]} Development dependency names
     */
    static getDevDependencies() {
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const content = FileHelper.readFile(packageJsonPath);
        if (!content) return [];

        try {
            const packageJson = JSON.parse(content);
            return Object.keys(packageJson.devDependencies || {});
        } catch {
            return [];
        }
    }
}

module.exports = DependencyAnalyzer;
