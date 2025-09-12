const fs = require('fs');
const path = require('path');

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

function analyzeCSSFile(filePath) {
    try {
        // Verificar que el archivo existe
        if (!fs.existsSync(filePath)) {
            console.error(`❌ Archivo no encontrado: ${filePath}`);
            return;
        }

        // Obtener estadísticas del archivo
        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf8');

        // Análisis básico
        const lines = content.split('\n').length;
        const characters = content.length;
        const charactersNoSpaces = content.replace(/\s/g, '').length;

        // Análisis CSS específico
        const cssRules = (content.match(/\[data-tw\][^{]+\{[^}]*\}/g) || [])
            .length;
        const mediaQueries = (content.match(/@media[^{]+\{/g) || []).length;
        const keyframes = (content.match(/@keyframes[^{]+\{/g) || []).length;
        const cssVariables = (content.match(/--[^:]+:/g) || []).length;

        const fileName = path.basename(filePath);
        console.info(`📊 ANÁLISIS DEL ARCHIVO: ${fileName.toUpperCase()}`);
        console.info('='.repeat(50)); // Línea separadora dinámica también
        console.info(`📁 Archivo: ${fileName}`);
        console.info(`📍 Ruta: ${filePath}`);
        console.info('');

        console.info('📏 TAMAÑO DEL ARCHIVO:');
        console.info(`   • Tamaño: ${formatBytes(stats.size)}`);
        console.info(`   • Bytes exactos: ${stats.size.toLocaleString()}`);
        console.info('');

        console.info('📄 CONTENIDO:');
        console.info(`   • Líneas: ${lines.toLocaleString()}`);
        console.info(`   • Caracteres totales: ${characters.toLocaleString()}`);
        console.info(
            `   • Caracteres sin espacios: ${charactersNoSpaces.toLocaleString()}`
        );
        console.info('');

        console.info('🎨 ANÁLISIS CSS:');
        console.info(`   • Reglas CSS: ${cssRules.toLocaleString()}`);
        console.info(`   • Media queries: ${mediaQueries.toLocaleString()}`);
        console.info(`   • Keyframes: ${keyframes.toLocaleString()}`);
        console.info(`   • Variables CSS: ${cssVariables.toLocaleString()}`);
        console.info('');

        console.info('📊 DENSIDAD:');
        console.info(`   • Bytes por línea: ${Math.round(stats.size / lines)}`);
        console.info(
            `   • Bytes por regla CSS: ${cssRules > 0 ? Math.round(stats.size / cssRules) : 'N/A'}`
        );
        console.info('');

        // Análisis de compresión potencial
        const gzipEstimate = Math.round(stats.size * 0.3);
        console.info('🗜️  COMPRESIÓN ESTIMADA:');
        console.info(
            `   • Gzip (estimado): ${formatBytes(gzipEstimate)} (~70% reducción)`
        );
        console.info(
            `   • Brotli (estimado): ${formatBytes(Math.round(stats.size * 0.25))} (~75% reducción)`
        );
        console.info('');

        // Fecha de modificación
        console.info('📅 INFORMACIÓN ADICIONAL:');
        console.info(
            `   • Última modificación: ${stats.mtime.toLocaleString()}`
        );
        console.info(`   • Creado: ${stats.birthtime.toLocaleString()}`);
    } catch (error) {
        console.error(`❌ Error al analizar el archivo: ${error.message}`);
    }
}

function parseArguments() {
    const args = process.argv.slice(2); // Remover 'node' y 'script.js'

    for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];

        // Opción 1: --file=path o --path=path
        if (arg.startsWith('--file=') || arg.startsWith('--path=')) {
            return arg.split('=')[1];
        }

        // Opción 2: --file path o --path path
        if (
            (arg === '--file' ||
                arg === '--path' ||
                arg === '-f' ||
                arg === '-p') &&
            args[i + 1]
        ) {
            return args[i + 1];
        }

        // Opción 3: Solo el path como argumento (sin flag)
        if (!arg.startsWith('-') && arg.includes('.css')) {
            return arg;
        }
    }

    return null;
}

function showHelp() {
    console.info('🚀 CSS File Analyzer');
    console.info('=====================');
    console.info('');
    console.info('📖 Uso:');
    console.info('  node scripts/analyzeCSSFile.js [opciones] [archivo]');
    console.info('');
    console.info('📋 Opciones:');
    console.info('  --file, -f <path>     Ruta al archivo CSS');
    console.info('  --path, -p <path>     Ruta al archivo CSS (alias)');
    console.info('  --help, -h            Mostrar esta ayuda');
    console.info('');
    console.info('💡 Ejemplos:');
    console.info(
        '  npm run analyze-css -- --file ./resources/dist/css/ln/tailwind.css'
    );
    console.info(
        '  npm run analyze-css -- -f ./resources/dist/css/ln/base.css'
    );
    console.info(
        '  npm run analyze-css -- --path=./resources/dist/css/foodit/tailwind.css'
    );
    console.info(
        '  npm run analyze-css -- ./resources/dist/css/ln/pages/acumulado.css'
    );
}

function main() {
    const args = process.argv.slice(2);

    // Mostrar ayuda si se solicita
    if (args.includes('--help') || args.includes('-h')) {
        showHelp();
        return;
    }

    // Obtener la ruta del archivo
    const filePath = parseArguments();

    if (!filePath) {
        console.error('❌ No se especificó una ruta de archivo válida.');
        console.info('');
        showHelp();
        process.exit(1);
    }

    // Analizar el archivo
    analyzeCSSFile(filePath);
}

// Ejecutar script
main();
