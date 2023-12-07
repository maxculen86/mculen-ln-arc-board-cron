import inquirer from 'inquirer';
import simpleGit from 'simple-git';
import os from 'os';
import { Spinner } from 'cli-spinner';

const git = simpleGit();
const demoBranchPrefix = 'LN/';
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

async function createDemoBranch() {
    try {
        await selectEnvironment();
        if (await checkUncommittedChanges()) {
            await commitChanges();
        }

        const originalBranch = (await git.branchLocal()).current;
        if (!originalBranch.startsWith(demoBranchPrefix)) {
            console.log("La rama actual no cumple con el criterio de 'LN/'.");
            return;
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
        console.error('Error al crear la rama demo:', error);
    }
}

createDemoBranch();
