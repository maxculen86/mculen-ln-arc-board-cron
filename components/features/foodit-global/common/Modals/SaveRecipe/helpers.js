import get from '../../../../../private/common/utils/get';
import saveBookmarks from '../../bookmark/api/postBookmarks';
import { fillBookmarks } from '../../bookmark/iconHelper';

export const saveRecipeConfig = {
    'new-folder': {
        'step-1': {
            title: 'Guardar',
            rightButton: {
                text: 'Cancelar',
                title: 'Cancelar',
                action: 'close'
            },
            leftButton: {
                text: 'Siguiente',
                title: 'Siguiente',
                action: 'nextStep'
            },
            showSelect: true,
            action: 'nextStep'
        },
        'step-2': {
            title: 'Nueva carpeta',
            rightButton: {
                text: 'Atras',
                title: 'Atras',
                action: 'forwardStep'
            },
            leftButton: {
                text: 'Guardar',
                title: 'Guardar',
                action: 'save'
            },
            showInputFolder: true,
            suggestions: ['Para los lunes', 'Para los martes', 'Para el finde']
        }
    },
    'current-folder': {
        'step-1': {
            title: 'Guardar',
            rightButton: {
                text: 'Cancelar',
                title: 'Cancelar',
                action: 'close'
            },
            leftButton: {
                text: 'Siguiente',
                title: 'Siguiente',
                action: 'save'
            },
            showSelect: true
        }
    }
};

export const actionButtons = ({
    action,
    close,
    indexStep,
    newFolder,
    selectedFolder,
    setIndexStep,
    articlesDetails
}) => {
    const actions = {
        close,
        forwardStep: () => setIndexStep(indexStep - 1),
        nextStep: () => setIndexStep(indexStep + 1),
        save: async () => {
            fillBookmarks(
                articlesDetails.map(({ content = {} }) => content.id)
            );
            close();

            const addFolder = selectedFolder.value == 'new';

            const nameFolder = addFolder ? newFolder : selectedFolder?.label;

            await saveBookmarks(articlesDetails, nameFolder, addFolder);
        }
    };
    return actions[action] && actions[action]();
};

export const getConfig = (saveRecipeConfig, selectedFolder, indexStep) => {
    const optionsSave =
        selectedFolder.value === 'new' ? 'new-folder' : 'current-folder';
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
