import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { Dialog } from '@ln/common-ui-dialog';
import { cx } from '@ln/cva';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import useSelectListener from '../../../../LN-common/hooks/useSelectListener';
import useInputListener from './hooks/useInputListener';

import HeaderSaveRecipe from './components/header';
import MainSaveRecipe from './components/main';
import FooterSaveRecipe from './components/footer';

import { getConfig, saveRecipeConfig } from './helpers';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import EmptyState from '../../emptyState/foodit';
import { getVariantBarrier } from '../../emptyState/helpers';
import useGetUserConfig from '../../../hooks/useGetUserConfig';

function SaveRecipe({
    showModal,
    close,
    ids,
    indexStep,
    setIndexStep,
    onConfirmMove = null,
    collectionArticles = [],
    carouselTitle = '',
    fatherType = '',
    currentCollectionId = null
}) {
    const {
        layout,
        siteProperties: { layoutsName = {} }
    } = useAppContext() || {};
    const isMyRecipesLayout = layout === layoutsName.FooditRecetario;
    const inputRef = useRef(null);
    const { userType, isSubscribed } = useGetUserConfig();
    const [isLoading, setIsLoading] = useState(false);

    const modeConfig = isMyRecipesLayout ? 'move' : 'save';

    const classNameModal = cx(
        isSubscribed
            ? 'w-328 overflow-visible rounded-4 h-fit p-16 p-24_md p-32_lg gap-16 gap-24_md gap-32_lg bg-light-1'
            : 'p-16 p-24_md p-32_lg max-w-328 min-w-720_md min-w-944_lg bg-positive rounded-4'
    );

    const {
        onChange: onInputFolderChange,
        value: inputValue,
        error: inputError,
        restoreInputValue
    } = useInputListener('');

    const {
        onSelectChange,
        selectValue = {},
        restoreInputValue: restoreSelectValue
    } = useSelectListener({});

    const handleCLoseDialog = () => {
        restoreSelectValue();
        restoreInputValue();
        close();
    };

    const { leftButton, rightButton, showInputFolder, showSelect, title } =
        getConfig(saveRecipeConfig, indexStep, modeConfig);

    const handleRestoreInputValue = () => {
        restoreInputValue();
    };

    const availableCollections = useMemo(() => {
        if (modeConfig === 'move') {
            return collectionArticles.filter(collection => {
                const collectionGroup = collection.bookmarkGroup;

                if (
                    currentCollectionId &&
                    collectionGroup === currentCollectionId
                ) {
                    return false;
                }

                const specialCollections = [
                    'Todas',
                    'INGREDIENTS_BOOKMARK_GROUP'
                ];
                if (specialCollections.includes(collectionGroup)) {
                    return false;
                }

                return Boolean(collectionGroup);
            });
        }

        return collectionArticles;
    }, [collectionArticles, currentCollectionId, modeConfig]);

    useEffect(() => {
        if (selectValue.value === 'new') {
            setIndexStep(prev => prev + 1);
        }
    }, [selectValue, setIndexStep]);

    const renderDialogHeader = (className, children) => (
        <Dialog.Header className={className}>
            {children}
            <Button
                onClick={handleCLoseDialog}
                variant="link"
                title="Cerrar"
                aria-label="Cerrar"
            >
                <Icon>
                    <IconSprite name="close" />
                </Icon>
            </Button>
        </Dialog.Header>
    );

    return (
        <Dialog
            isOpen={showModal}
            onClose={handleCLoseDialog}
            position="center"
            classnames={{
                base: classNameModal,
                wrapper: 'flex flex-column gap-16 gap-24_md gap-32_lg'
            }}
            overlay
            closeOnClickOutside
        >
            {userType === 'subscribed' ? (
                <>
                    {renderDialogHeader(
                        'flex jc-between ai-center w-100 border border-bottom border-thin border-light-100 pb-16',
                        <HeaderSaveRecipe title={title} />
                    )}
                    <Dialog.Body>
                        <MainSaveRecipe
                            newFolder={inputValue}
                            onInputFolderChange={onInputFolderChange}
                            error={inputError}
                            selectedFolder={selectValue}
                            onSelectChange={onSelectChange}
                            showInputFolder={showInputFolder}
                            showSelect={showSelect}
                            inputRef={inputRef}
                            restoreInputValue={handleRestoreInputValue}
                            mode={modeConfig}
                            currentCollectionId={currentCollectionId}
                        />
                    </Dialog.Body>
                    <Dialog.Footer className="flex flex-column gap-16 gap-24_md gap-32_lg">
                        <hr />
                        <FooterSaveRecipe
                            close={handleCLoseDialog}
                            indexStep={indexStep}
                            leftButton={leftButton}
                            newFolder={inputValue}
                            hasInputError={Boolean(inputError?.hasError)}
                            rightButton={rightButton}
                            selectedFolder={selectValue}
                            setIndexStep={setIndexStep}
                            ids={ids}
                            collectionArticles={availableCollections}
                            carouselTitle={carouselTitle}
                            layout={layout}
                            fatherType={fatherType}
                            mode={modeConfig}
                            onConfirmMove={onConfirmMove}
                            currentCollectionId={currentCollectionId}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    </Dialog.Footer>
                </>
            ) : (
                <>
                    {renderDialogHeader('flex flex-column ai-end')}
                    <Dialog.Body>
                        <EmptyState
                            variant={getVariantBarrier(userType)}
                            direction="column"
                        />
                    </Dialog.Body>
                </>
            )}
        </Dialog>
    );
}

export default SaveRecipe;
