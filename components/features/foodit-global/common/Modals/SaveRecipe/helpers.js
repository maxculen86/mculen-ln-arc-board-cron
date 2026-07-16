import { pushFooditEvent } from '../../utils/pushFooditEvent';
import get from '../../../../../private/common/utils/get';
import saveBookmarks from '../../bookmark/api/postBookmarks';
import { toggleBookmarks } from '../../bookmark/iconHelper';
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
    },
    'move-folder': {
        'step-1': {
            title: 'Mover de colección',
            rightButton: {
                text: 'Cancelar',
                title: 'Cancelar',
                action: 'close'
            },
            leftButton: {
                text: 'Aceptar',
                title: 'Aceptar',
                action: 'move'
            },
            showSelect: true
        },
        'step-2': {
            title: 'Mover de colección',
            rightButton: {
                text: 'Cancelar',
                title: 'Cancelar',
                action: 'close'
            },
            leftButton: {
                text: 'Aceptar',
                title: 'Aceptar',
                action: 'move'
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

        pushFooditEvent({
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

const createApiGuard = () => {
    let isRunning = false;
    return async (fn, ...args) => {
        if (isRunning) {
            console.warn('Action already in progress, ignoring duplicate call');
            return null;
        }
        try {
            isRunning = true;
            return await fn(...args);
        } catch (error) {
            console.error('Error in API call:', error);
            throw error;
        } finally {
            isRunning = false;
        }
    };
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
    fatherType,
    onConfirmMove,
    setIsLoading = () => {}
}) => {
    const apiGuard = createApiGuard();

    const actions = {
        close,
        nextStep: () => setIndexStep(indexStep + 1),
        save: async () => {
            await apiGuard(async () => {
                try {
                    setIsLoading(true);

                    toggleBookmarks(
                        articlesDetails.map(({ content = {} }) => content.id),
                        true
                    );

                    addSavedBookmarksToDataLayer({
                        articlesDetails,
                        carouselTitle,
                        layout,
                        fatherType
                    });

                    const addFolder = selectedFolder.value === 'new';
                    const nameFolder = addFolder
                        ? newFolder
                        : selectedFolder?.value;

                    await saveBookmarks(articlesDetails, nameFolder);

                    close();
                } catch (error) {
                    console.error('Error in save action:', error);
                } finally {
                    setIsLoading(false);
                }
            });
        },
        move: async () => {
            await apiGuard(async () => {
                try {
                    setIsLoading(true);

                    const addFolder = selectedFolder.value === 'new';
                    const targetCollectionId = addFolder
                        ? null
                        : selectedFolder.value;
                    const newCollectionName = addFolder ? newFolder : null;

                    if (onConfirmMove) {
                        const success = await onConfirmMove(
                            targetCollectionId,
                            newCollectionName
                        );

                        if (success) {
                            close();
                        } else {
                            console.error('actionButtons.move - Move failed');
                        }
                    } else {
                        console.error(
                            'actionButtons.move - No onConfirmMove callback provided'
                        );
                    }
                } catch (error) {
                    console.error('Error in move action:', error);
                } finally {
                    setIsLoading(false);
                }
            });
        }
    };

    return actions[action] && actions[action]();
};

export const getConfig = (saveRecipeConfigs, indexStep, mode = 'save') => {
    const stepIndex = `step-${indexStep}`;
    const configKey = mode === 'move' ? 'move-folder' : 'save-folder';

    return {
        title: get(saveRecipeConfigs[configKey], `${stepIndex}.title`, ''),
        leftButton: get(
            saveRecipeConfigs[configKey],
            `${stepIndex}.leftButton`,
            {}
        ),
        rightButton: get(
            saveRecipeConfigs[configKey],
            `${stepIndex}.rightButton`,
            {}
        ),
        showSelect: get(
            saveRecipeConfigs[configKey],
            `${stepIndex}.showSelect`,
            false
        ),
        showInputFolder: get(
            saveRecipeConfigs[configKey],
            `${stepIndex}.showInputFolder`,
            false
        )
    };
};
