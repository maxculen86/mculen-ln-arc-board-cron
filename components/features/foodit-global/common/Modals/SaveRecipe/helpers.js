import get from '../../../../../private/common/utils/get';
export const saveRecipeConfig = {
    'new-folder': {
        'step-1': {
            title: 'Guardar',
            leftButton: {
                text: 'Cancelar',
                action: 'close'
            },
            rightButton: {
                text: 'Siguiente',
                action: 'nextStep'
            },
            showSelect: true,
            action: 'nextStep'
        },
        'step-2': {
            title: 'Nueva carpeta',
            leftButton: {
                text: 'Atras',
                action: 'forwardStep'
            },
            rightButton: {
                text: 'Guardar',
                action: 'save'
            },
            showInputFolder: true,
            suggestions: ['Para los lunes', 'Para los martes', 'Para el finde']
        }
    },
    'current-folder': {
        'step-1': {
            title: 'Guardar',
            leftButton: {
                text: 'Cancelar',
                action: 'close'
            },
            rightButton: {
                text: 'Guardar',
                action: 'save'
            },
            showSelect: true
        }
    }
};

export const actionButtons = ({
    action,
    close,
    ids,
    indexStep,
    newFolder,
    selectedFolder,
    setIndexStep
}) => {
    const actions = {
        close,
        forwardStep: () => setIndexStep(indexStep - 1),
        nextStep: () => setIndexStep(indexStep + 1),
        save: () => {
            const nameFolder =
                selectedFolder === 'Nueva carpeta' ? newFolder : selectedFolder;

            alert(`Se guardaron los ids: ${ids} en la carpeta ${nameFolder}`);
            close();
        }
    };
    return actions[action] && actions[action]();
};

export const getConfig = (saveRecipeConfig, selectedFolder, indexStep) => {
    const optionsSave =
        selectedFolder === 'Nueva carpeta' ? 'new-folder' : 'current-folder';
    const stepIndex = `step-${indexStep}`;

    return {
        title: get(saveRecipeConfig[optionsSave], `${stepIndex}.title`, ''),
        leftButton: get(
            saveRecipeConfig[optionsSave],
            `${stepIndex}.leftButton`,
            {}
        ),
        rightButton: get(
            saveRecipeConfig[optionsSave],
            `${stepIndex}.rightButton`,
            {}
        ),
        showSelect: get(
            saveRecipeConfig[optionsSave],
            `${stepIndex}.showSelect`,
            false
        ),
        showInputFolder: get(
            saveRecipeConfig[optionsSave],
            `${stepIndex}.showInputFolder`,
            false
        ),
        suggestions: get(
            saveRecipeConfig[optionsSave],
            `${stepIndex}.suggestions`,
            []
        )
    };
};
