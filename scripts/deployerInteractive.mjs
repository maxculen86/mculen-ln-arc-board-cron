import inquirer from 'inquirer';
import simpleGit from 'simple-git';
import { Spinner } from 'cli-spinner';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * deployerInteractive.mjs — wrapper interactivo para scripts/deployer.js,
 * calcado del flujo de create-demo (scripts/gitDemoBranch.mjs): elige
 * ambiente, chequea cambios sin commitear, ofrece correr tests, y recién
 * ahí ejecuta el deploy real de apps/foodit-mx.
 */

const dirPath = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(dirPath, '..');
const git = simpleGit(REPO_ROOT);

const environments = [
    { name: 'Development', flag: '--dev' },
    { name: 'Sandbox', flag: '--sandbox' },
    { name: 'Staging', flag: '--st' },
    { name: 'Producción', flag: '--prod' }
];

// Sandbox y Development comparten mxId (ver deployer.js) — mismo riesgo de
// pisar sin aviso lo que esté live para el resto del equipo.
const SHARED_MX_ENVIRONMENTS = ['Sandbox', 'Development'];

async function checkUncommittedChanges() {
    const status = await git.status();
    return !status.isClean();
}

async function commitChanges() {
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'commitChanges',
            message:
                'Hay cambios sin comitear en apps/foodit-mx/. ¿Deseas comitearlos ahora?',
            default: false
        },
        {
            type: 'input',
            name: 'commitMessage',
            message: 'Ingresa la descripción del commit:',
            when: response => response.commitChanges
        }
    ]);

    if (answers.commitChanges) {
        // Acotado a apps/foodit-mx/: comitear todo el monorepo antes de un
        // deploy de esta MX arrastraría cambios sueltos sin relación.
        await git.add('apps/foodit-mx');
        await git.commit(answers.commitMessage);
    }
}

function runTests() {
    const spinner = new Spinner('Ejecutando tests de foodit-mx... %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    return new Promise((resolve, reject) => {
        const testProcess = spawn('npx', ['nx', 'run', 'foodit-mx:test'], {
            stdio: 'inherit',
            cwd: REPO_ROOT
        });

        const handleSigint = () => {
            console.warn('\nCancelación detectada. Limpiando...');
            testProcess.kill();
            spinner.stop(true);
            reject(new Error('Tests cancelados por el usuario'));
        };

        process.on('SIGINT', handleSigint);

        testProcess.on('close', code => {
            process.removeListener('SIGINT', handleSigint);
            spinner.stop(true);
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Los tests fallaron con código ${code}`));
            }
        });
    });
}

function runDeploy(flag, shouldPromote) {
    return new Promise((resolve, reject) => {
        const args = [path.join(dirPath, 'deployer.js'), flag];
        if (shouldPromote) args.push('--promote');

        const deployProcess = spawn('node', args, { stdio: 'inherit' });

        deployProcess.on('close', code => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`deployer.js terminó con código ${code}`));
            }
        });
    });
}

async function main() {
    try {
        const { environment } = await inquirer.prompt([
            {
                type: 'list',
                name: 'environment',
                message: 'Selecciona el ambiente para el deploy de foodit-mx:',
                choices: environments.map(e => e.name)
            }
        ]);
        const selected = environments.find(e => e.name === environment);

        if (await checkUncommittedChanges()) {
            await commitChanges();
        }

        const { runTestsFirst } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'runTestsFirst',
                message: '¿Deseas ejecutar las pruebas antes del deploy?',
                default: true
            }
        ]);

        if (runTestsFirst) {
            await runTests();
        }

        let shouldPromote = false;
        if (SHARED_MX_ENVIRONMENTS.includes(selected.name)) {
            const answer = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'promote',
                    message: `${selected.name} es compartido: promover esta versión pisa la demo que esté live ahora para todo el equipo. ¿Promover de todas formas?`,
                    default: false
                }
            ]);
            shouldPromote = answer.promote;
        }

        await runDeploy(selected.flag, shouldPromote);
        console.info('Deploy finalizado.');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
