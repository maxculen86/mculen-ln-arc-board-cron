import addEventToDataLayer from '../../../../../private/LN/common/utils/addEventToDataLayer';
import get from '../../../../../private/common/utils/get';
import saveBookmarks from '../../bookmark/api/postBookmarks';
import { fillBookmarks } from '../../bookmark/iconHelper';
import { dataLayerDictionary } from '../../dataLayer/_helpers';

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
        const label =
            dataLayerDictionary[get(firstArticle, 'content.variant')] || '';
        const title =
            get(firstArticle, 'content.headlines.basic') ||
            get(firstArticle, 'content.headlines.mobile', '');

        addEventToDataLayer({
            event: 'e_linkclick',
            category: 'interaction',
            action: 'guardar',
            ...(articlesDetails.length > 1
                ? { title: carouselTitle }
                : {
                      title,
                      label,
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

            const addFolder = selectedFolder.value === 'new';

            const nameFolder = addFolder ? newFolder : selectedFolder?.label;

            await saveBookmarks(articlesDetails, nameFolder, addFolder);
        }
    };
    return actions[action] && actions[action]();
};

export const getConfig = (saveRecipeConfig, indexStep) => {
    const stepIndex = `step-${indexStep}`;
    const saveFolderKey = 'save-folder';

    return {
        title: get(saveRecipeConfig[saveFolderKey], `${stepIndex}.title`, ''),
        leftButton: get(
            saveRecipeConfig[saveFolderKey],
            `${stepIndex}.leftButton`,
            {}
        ),
        rightButton: get(
            saveRecipeConfig[saveFolderKey],
            `${stepIndex}.rightButton`,
            {}
        ),
        showSelect: get(
            saveRecipeConfig[saveFolderKey],
            `${stepIndex}.showSelect`,
            false
        ),
        showInputFolder: get(
            saveRecipeConfig[saveFolderKey],
            `${stepIndex}.showInputFolder`,
            false
        )
    };
};
