/**
 * @fileoverview Structured logging utility
 * @author Bundle Analysis Team
 */

/* eslint-disable no-console */

const { default: cliSpinners } = require('cli-spinners');
const { default: logUpdate } = require('log-update');

/**
 * Consistent logging with emojis and formatting
 */
class Logger {
    /**
     * Log section header
     * @param {string} title - Section title
     * @param {string} emoji - Section emoji
     */
    static section(title, emoji = '📊') {
        console.log(`\n${emoji} ${title}:`);
    }

    /**
     * Log success message
     * @param {string} message - Success message
     */
    static success(message) {
        console.log(`  ✅ ${message}`);
    }

    /**
     * Log error message
     * @param {string} message - Error message
     */
    static error(message) {
        console.log(`  ❌ ${message}`);
    }

    /**
     * Log warning message
     * @param {string} message - Warning message
     */
    static warning(message) {
        console.log(`  ⚠️ ${message}`);
    }

    /**
     * Log info message
     * @param {string} message - Info message
     */
    static info(message) {
        console.log(`  🟡 ${message}`);
    }

    /**
     * Log item with indentation
     * @param {string} message - Item message
     */
    static item(message) {
        console.log(`  ${message}`);
    }

    /**
     * Show spinner animation with message
     * @param {string} message - Message to display
     * @param {Function} asyncAction - Async function to execute
     * @returns {Promise} Result of asyncAction
     */
    static async spinner(message, asyncAction) {
        const spinnerFrames = cliSpinners.dots.frames;
        let currentFrame = 0;

        const spinnerInterval = setInterval(() => {
            const frame = spinnerFrames[currentFrame];
            logUpdate(`  ${frame} ${message}`);
            currentFrame = (currentFrame + 1) % spinnerFrames.length;
        }, cliSpinners.dots.interval);

        try {
            const result = await asyncAction();
            clearInterval(spinnerInterval);
            logUpdate(`  ✅ ${message} completado`);
            logUpdate.done();
            return result;
        } catch (error) {
            clearInterval(spinnerInterval);
            logUpdate(`  ❌ ${message} falló`);
            logUpdate.done();
            throw error;
        }
    }

    /**
     * Show spinner for sync operations with proper animation
     * @param {string} message - Message to display
     * @param {Function} syncAction - Sync function to execute
     * @param {number} duration - Minimum duration in ms for visual feedback
     * @returns {Promise} Promise that resolves with result
     */
    static async spinnerSync(message, syncAction, duration = 2000) {
        const spinnerFrames = cliSpinners.dots.frames;
        let currentFrame = 0;

        // Start spinner
        const spinnerInterval = setInterval(() => {
            const frame = spinnerFrames[currentFrame];
            logUpdate(`  ${frame} ${message}`);
            currentFrame = (currentFrame + 1) % spinnerFrames.length;
        }, cliSpinners.dots.interval);

        // Wait a bit to show animation, then execute
        await new Promise(resolve => {
            setTimeout(resolve, 200);
        });

        let result;
        try {
            result = syncAction();
        } catch (error) {
            clearInterval(spinnerInterval);
            logUpdate(`  ❌ ${message} falló`);
            logUpdate.done();
            throw error;
        }

        // Show spinner for minimum duration
        await new Promise(resolve => {
            setTimeout(resolve, Math.max(0, duration - 200));
        });

        clearInterval(spinnerInterval);
        logUpdate.clear();

        return result;
    }

    /**
     * Log usage recommendation
     * @param {string} dependency - Dependency name
     * @param {number} count - Usage count
     * @param {string} priority - Priority level
     */
    static recommendation(dependency, count, priority) {
        const emoji = this.getPriorityEmoji(priority);
        console.log(
            `  ${emoji} ${priority.toUpperCase()}: ${dependency} (${count} archivos)`
        );
    }

    /**
     * Get emoji for priority
     * @param {string} priority - Priority level
     * @returns {string} Emoji
     */
    static getPriorityEmoji(priority) {
        const emojiMap = {
            alta: '✅',
            media: '🟡',
            baja: '⚠️',
            excluir: '❌'
        };
        return emojiMap[priority] || '📋';
    }

    /**
     * Log command list
     * @param {Array} commands - Array of [description, command] pairs
     */
    static commands(commands) {
        commands.forEach(([command, description]) => {
            console.log(`  ${command.padEnd(30)} # ${description}`);
        });
    }

    /**
     * Log candidates table
     * @param {Array} candidates - Array of candidate objects
     */
    static candidatesTable(candidates) {
        if (candidates.length === 0) {
            this.item('📭 No hay candidatos para optimización');
            return;
        }

        console.log(
            '\n┌─────────────────────────────────────────────┬──────┬────────┬────────────┐'
        );
        console.log(
            '│ Dependencia                                 │ Usos │ Tamaño │ Acción     │'
        );
        console.log(
            '├─────────────────────────────────────────────┼──────┼────────┼────────────┤'
        );

        candidates.forEach(candidate => {
            const name = candidate.name.padEnd(43);
            const usage = candidate.usage.toString().padStart(4);
            const size = candidate.size.padEnd(6);
            const { action } = candidate;

            let actionColor = action;
            if (action === '✅ INCLUIR')
                actionColor = `\x1b[32m${action}\x1b[0m`;
            else if (action === '🟡 EVALUAR')
                actionColor = `\x1b[33m${action}\x1b[0m`;
            else if (action === '❌ SALTAR')
                actionColor = `\x1b[31m${action}\x1b[0m`;

            console.log(
                `│ ${name} │ ${usage} │ ${size} │ ${actionColor.padEnd(18)} │`
            );
        });

        console.log(
            '└─────────────────────────────────────────────┴──────┴────────┴────────────┘'
        );
    }

    /**
     * Log wrapper instructions
     * @param {Array} toAdd - Dependencies to add
     */
    static wrapperInstructions(toAdd) {
        if (toAdd.length === 0) return;

        this.section('📝 AGREGAR AL WRAPPER-OPTIMIZATION.JS', '📝');
        this.item('Copia estas líneas al archivo wrapper-optimization.js:');
        console.log('');

        toAdd.forEach(dep => {
            console.log(`    "${dep}": require("${dep}"),`);
        });

        console.log('');
        this.item('📍 Ubicación: ./wrapper-optimization.js');
        this.item(
            '📖 Guía: docs/webpack-optimization/dependency-selection-methodology.md'
        );
    }
}

module.exports = Logger;
