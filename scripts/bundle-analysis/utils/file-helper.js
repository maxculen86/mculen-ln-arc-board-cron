/**
 * @fileoverview File system operations helper
 * @author Bundle Analysis Team
 */

const fs = require('fs');

/**
 * Safe file system operations
 */
class FileHelper {
    /**
     * Check if file exists
     * @param {string} filePath - Path to check
     * @returns {boolean} True if exists
     */
    static exists(filePath) {
        try {
            return fs.existsSync(filePath);
        } catch {
            return false;
        }
    }

    /**
     * Read file content safely
     * @param {string} filePath - Path to file
     * @returns {string|null} File content or null
     */
    static readFile(filePath) {
        try {
            return this.exists(filePath)
                ? fs.readFileSync(filePath, 'utf8')
                : null;
        } catch {
            return null;
        }
    }

    /**
     * Get file size in MB
     * @param {string} filePath - Path to file
     * @returns {number} Size in MB or 0
     */
    static getSizeMB(filePath) {
        try {
            if (!this.exists(filePath)) return 0;
            const stats = fs.statSync(filePath);
            return Number((stats.size / 1024 / 1024).toFixed(2));
        } catch {
            return 0;
        }
    }
}

module.exports = FileHelper;
