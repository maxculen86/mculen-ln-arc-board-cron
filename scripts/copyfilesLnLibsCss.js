const fs = require('fs');
const path = require('path');
const glob = require('glob');

const sourcePattern = 'node_modules/@ln/**/**/*.css';
const targetDir = 'resources/packages/css/@ln';

// Patterns to exclude (can be strings or regex)
const excludePatterns = [/theme-/];

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

glob(sourcePattern, (err, files) => {
    if (err) {
        console.error('❌ Error scanning files:', err.message);
        process.exit(1);
    }

    const filteredFiles = files.filter(file => {
        const fileName = path.basename(file);
        const filePath = file;

        const shouldExclude = excludePatterns.some(pattern => {
            if (pattern instanceof RegExp) {
                return pattern.test(fileName) || pattern.test(filePath);
            }
            if (typeof pattern === 'string') {
                return fileName.includes(pattern) || filePath.includes(pattern);
            }
            return false;
        });

        return !shouldExclude;
    });

    const { successCount, errorCount } = filteredFiles.reduce(
        (counts, file) => {
            const relativePath = path.relative('node_modules/@ln', file);
            const targetPath = path.join(targetDir, relativePath);
            const targetDirPath = path.dirname(targetPath);

            if (!fs.existsSync(targetDirPath)) {
                fs.mkdirSync(targetDirPath, { recursive: true });
            }

            try {
                fs.copyFileSync(file, targetPath);
                return { ...counts, successCount: counts.successCount + 1 };
            } catch (copyErr) {
                console.error(`❌ Error copying ${file}:`, copyErr.message);
                return { ...counts, errorCount: counts.errorCount + 1 };
            }
        },
        { successCount: 0, errorCount: 0 }
    );

    console.info(`🎉 Copy CSS libs completed!`);
    console.info(
        `📊 Summary: ${filteredFiles.length} processed, ${successCount} copied, ${errorCount} failed`
    );

    if (errorCount > 0) {
        process.exit(1);
    }
});
