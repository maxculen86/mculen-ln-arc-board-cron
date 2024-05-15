import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';
import get from '../../../../../private/common/utils/get';
import saveBookmarks from '../../bookmark/api/postBookmarks';
import { fillBookmarks } from '../../bookmark/iconHelper';

export const saveRecipeConfig = {
    'save-folder': {
        'step-1': {
            title: 'Guardar',
            rightButton: {
                text: 'Cancelar',
                title: 'Cancelar',
                action: 'close'
            },
            leftButton: {
                text: 'Aceptar',
                title: 'Aceptar',
                action: 'save'
            },
            showSelect: true
        },
        'step-2': {
            title: 'Guardar',
            rightButton: {
                text: 'Cancelar',
                title: 'Cancelar',
                action: 'close'
            },
            leftButton: {
                text: 'Aceptar',
                title: 'Aceptar',
                action: 'save'
            },
            showInputFolder: true
        }
    }
};

const addSavedBookmarksToDataLayer = (
    articlesDetails = [],
    carouselTitle = ''
) => {
    if (articlesDetails.length) {
        const [firstArticle] = articlesDetails;

        addEventToDataLayer({
            event: 'e_linkclick',
            category: 'interaction',
            action: 'guardar',
            ...(articlesDetails.length > 1
                ? { title: carouselTitle }
                : {
                      title: get(firstArticle, 'headlines.basic', ''),
                      label: get(firstArticle, 'content.variant', ''),
                      articleId: get(firstArticle, 'content.id', '')
                  })
        });
    }
};

export const actionButtons = ({
    action,
    close,
    indexStep,
    newFolder,
    selectedFolder,
    setIndexStep,
    articlesDetails,
    carouselTitle = ''
}) => {
    const actions = {
        close,
        nextStep: () => setIndexStep(indexStep + 1),
        save: async () => {
            fillBookmarks(
                articlesDetails.map(({ content = {} }) => content.id)
            );
            close();

            addSavedBookmarksToDataLayer(articlesDetails, carouselTitle);

            const addFolder = selectedFolder.value == 'new';

            const nameFolder = addFolder ? newFolder : selectedFolder?.label;

            await saveBookmarks(articlesDetails, nameFolder, addFolder);
        }
    };
    return actions[action] && actions[action]();
};

export const getConfig = (saveRecipeConfig, indexStep) => {
    const stepIndex = `step-${indexStep}`;

    return {
        title: get(saveRecipeConfig['save-folder'], `${stepIndex}.title`, ''),
        leftButton: get(
            saveRecipeConfig['save-folder'],
            `${stepIndex}.leftButton`,
            {}
        ),
        rightButton: get(
            saveRecipeConfig['save-folder'],
            `${stepIndex}.rightButton`,
            {}
        ),
        showSelect: get(
            saveRecipeConfig['save-folder'],
            `${stepIndex}.showSelect`,
            false
        ),
        showInputFolder: get(
            saveRecipeConfig['save-folder'],
            `${stepIndex}.showInputFolder`,
            false
        )
    };
};
