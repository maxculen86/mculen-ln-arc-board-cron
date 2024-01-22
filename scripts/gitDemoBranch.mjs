import inquirer from 'inquirer';
import simpleGit from 'simple-git';
import os from 'os';
import { Spinner } from 'cli-spinner';
import { spawn } from 'child_process';

const git = simpleGit();
const demoBranchPrefixes = ['LN/', 'hotfix', 'release'];
let demoBranchSuffix = 'demo';

async function checkUncommittedChanges() {
    const status = await git.status();
    return !status.isClean();
}

async function commitChanges() {
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'commitChanges',
            message: 'Hay cambios sin comitear. ¿Deseas comitearlos ahora?',
            default: false
        },
        {
            type: 'input',
            name: 'commitMessage',
            message: 'Ingresa la descripción del commit:',
            when: answers => answers.commitChanges
        }
    ]);

    if (answers.commitChanges) {
        await git.add('./*');
        await git.commit(answers.commitMessage);
    }
}

async function selectEnvironment() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'environment',
            message: 'Selecciona el ambiente para la rama de demostración:',
            choices: ['develop', 'sandbox', 'prod']
        }
    ]);

    if (answers.environment === 'sandbox') {
        demoBranchSuffix += '-sandbox';
    } else if (answers.environment === 'prod') {
        demoBranchSuffix += '-prod';
    }
}

async function runTests() {
    const spinner = new Spinner('Ejecutando tests... %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    return new Promise((resolve, reject) => {
        const testProcess = spawn('npm', ['run', 'test'], { stdio: 'inherit' });

        const handleSigint = () => {
            console.log('\nCancelación detectada. Limpiando...');
            testProcess.kill(); // Mata el proceso de los tests
            spinner.stop(true);
            reject('Tests cancelados por el usuario');
        };

        process.on('SIGINT', handleSigint);

        testProcess.on('close', code => {
            process.removeListener('SIGINT', handleSigint); // Elimina el manejador de SIGINT
            spinner.stop(true);
            if (code === 0) {
                resolve();
            } else {
                reject(`Test process exited with code ${code}`);
            }
        });
    });
}

async function createDemoBranch() {
    let originalBranch;

    try {
        await selectEnvironment();
        if (await checkUncommittedChanges()) {
            await commitChanges();
        }

        originalBranch = (await git.branchLocal()).current; // Asigna valor a originalBranch
        if (
            !demoBranchPrefixes.some(prefix =>
                originalBranch.startsWith(prefix)
            )
        ) {
            console.log(
                `La rama actual no cumple con el criterio de prefijos validos: ${demoBranchPrefixes.join(
                    ' '
                )}.`
            );
            return;
        }

        const testAnswer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'runTests',
                message: '¿Deseas ejecutar las pruebas antes del push?',
                default: true
            }
        ]);

        if (testAnswer.runTests) {
            await runTests();
        }

        const username = os.userInfo().username;
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const newBranch = `${demoBranchSuffix}/${timestamp}/${username}/${originalBranch}`;

        await git.checkoutLocalBranch(newBranch);

        const spinner = new Spinner('Realizando push de la rama %s ...');
        spinner.setSpinnerString('|/-\\');
        spinner.start();

        await git.push('origin', newBranch);
        spinner.stop(true);
        console.log(`Push realizado con éxito`);

        // Regresar a la rama original y eliminar la rama de demostración
        await git.checkout(originalBranch);
        await git.branch(['-d', newBranch]); // Cambiado para eliminar la rama local
        console.log(
            `Regresado a la rama original ${originalBranch} y eliminada la rama de demostración local ${newBranch}`
        );
    } catch (error) {
        console.error('Error:', error);
        if (originalBranch) {
            console.log(`Regresando a la rama original ${originalBranch}...`);
            await git.checkout(originalBranch);
            console.log(`Eliminando la rama de demostración...`);
        }
    }
}

createDemoBranch();
