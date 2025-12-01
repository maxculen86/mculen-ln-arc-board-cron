/**
 * @fileoverview Shell command executor with error handling
 * @author Bundle Analysis Team
 */

const { execSync } = require('child_process');

/**
 * Safe shell command executor
 */
class ShellExecutor {
    /**
     * Execute command and return output
     * @param {string} command - Command to execute
     * @returns {string|null} Command output or null if failed
     */
    static execute(command) {
        try {
            return execSync(command, { encoding: 'utf8' });
        } catch {
            return null;
        }
    }

    /**
     * Execute command and return lines array
     * @param {string} command - Command to execute
     * @returns {string[]} Array of output lines
     */
    static executeLines(command) {
        const output = this.execute(command);
        return output ? output.split('\n').filter(Boolean) : [];
    }

    /**
     * Execute command and return numeric result
     * @param {string} command - Command to execute
     * @returns {number} Numeric result or 0
     */
    static executeNumeric(command) {
        const output = this.execute(command);
        if (!output) return 0;
        const number = parseInt(output.trim(), 10);
        return Number.isNaN(number) ? 0 : number;
    }
}

module.exports = ShellExecutor;
