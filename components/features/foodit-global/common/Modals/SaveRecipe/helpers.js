import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';
import get from '../../../../../private/common/utils/get';
import saveBookmarks from '../../bookmark/api/postBookmarks';
import { fillBookmarks } from '../../bookmark/iconHelper';
import {
    dataLayerContainerDictionary,
    dataLayerDictionary,
    dataLayerLayoutDictionary
} from '../../dataLayer/_helpers';

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

export const addSavedBookmarksToDataLayer = ({
    articlesDetails = [],
    carouselTitle = '',
    layout = '',
    fatherType = ''
}) => {
    if (articlesDetails.length) {
        const [firstArticle] = articlesDetails;
        const label =
            dataLayerDictionary[get(firstArticle, 'content.variant')] || '';
        const title =
            get(firstArticle, 'content.headlines.basic') ||
            get(firstArticle, 'content.headlines.mobile', '');

        const isFromCarouselHeader = articlesDetails.length > 1;

        const origin =
            fatherType && dataLayerContainerDictionary[layout]
                ? dataLayerContainerDictionary[layout]
                : dataLayerLayoutDictionary[layout] || '';

        addEventToDataLayerV2({
            event: 'e_linkclick',
            category: 'interaction',
            origin,
            action: isFromCarouselHeader ? 'guardar_todo' : 'guardar',
            ...(isFromCarouselHeader
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
    layout,
    carouselTitle = '',
    fatherType
}) => {
    const actions = {
        close,
        nextStep: () => setIndexStep(indexStep + 1),
        save: async () => {
            fillBookmarks(
                articlesDetails.map(({ content = {} }) => content.id)
            );
            close();

            addSavedBookmarksToDataLayer({
                articlesDetails,
                carouselTitle,
                layout,
                fatherType
            });

            const addFolder = selectedFolder.value === 'new';

            const nameFolder = addFolder ? newFolder : selectedFolder?.label;

            await saveBookmarks(articlesDetails, nameFolder, addFolder);
        }
    };
    return actions[action] && actions[action]();
};

export const getConfig = (saveRecipeConfigs, indexStep) => {
    const stepIndex = `step-${indexStep}`;
    const saveFolderKey = 'save-folder';

    return {
        title: get(saveRecipeConfigs[saveFolderKey], `${stepIndex}.title`, ''),
        leftButton: get(
            saveRecipeConfigs[saveFolderKey],
            `${stepIndex}.leftButton`,
            {}
        ),
        rightButton: get(
            saveRecipeConfigs[saveFolderKey],
            `${stepIndex}.rightButton`,
            {}
        ),
        showSelect: get(
            saveRecipeConfigs[saveFolderKey],
            `${stepIndex}.showSelect`,
            false
        ),
        showInputFolder: get(
            saveRecipeConfigs[saveFolderKey],
            `${stepIndex}.showInputFolder`,
            false
        )
    };
};
