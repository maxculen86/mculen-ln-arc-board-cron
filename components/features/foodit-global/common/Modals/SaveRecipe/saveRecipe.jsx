import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { Dialog } from '@ln/common-ui-dialog';
import { cx } from '@ln/cva';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import useSelectListener from './hooks/useSelectListener';
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
    collectionArticles,
    carouselTitle,
    fatherType
}) {
    const { layout } = useAppContext() || {};
    const inputRef = useRef(null);
    const { userType, isSubscribed } = useGetUserConfig();

    const classNameModal = cx(
        isSubscribed
            ? 'w-328 overflow-visible rounded-4 h-fit p-16 p-24_md p-32_lg gap-16 gap-24_md gap-32_lg bg-light-1'
            : 'p-16 p-24_md p-32_lg max-w-328 min-w-720_md min-w-944_lg bg-positive rounded-4'
    );

    const {
        onChange: onInputFolderChange,
        value: inputValue,
        error: inputError
    } = useInputListener('');

    const { onSelectChange, selectValue = {} } = useSelectListener({});

    const { leftButton, rightButton, showInputFolder, showSelect, title } =
        getConfig(saveRecipeConfig, indexStep);

    useEffect(() => {
        if (selectValue.value === 'new') {
            setIndexStep(prev => prev + 1);
        }
    }, [selectValue]);

    const renderDialogHeader = (className, children) => (
        <Dialog.Header className={className}>
            {children}
            <Button
                onClick={close}
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
            onClose={close}
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
                        />
                    </Dialog.Body>
                    <Dialog.Footer className="flex flex-column gap-16 gap-24_md gap-32_lg">
                        <hr />
                        <FooterSaveRecipe
                            close={close}
                            indexStep={indexStep}
                            leftButton={leftButton}
                            newFolder={inputValue}
                            hasInputError={Boolean(inputError?.hasError)}
                            rightButton={rightButton}
                            selectedFolder={selectValue}
                            setIndexStep={setIndexStep}
                            ids={ids}
                            collectionArticles={collectionArticles}
                            carouselTitle={carouselTitle}
                            layout={layout}
                            fatherType={fatherType}
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

SaveRecipe.propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    indexStep: PropTypes.number.isRequired,
    setIndexStep: PropTypes.func.isRequired,
    carouselTitle: PropTypes.string,
    fatherType: PropTypes.string,
    collectionArticles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string
        })
    )
};

SaveRecipe.defaultProps = {
    collectionArticles: [],
    carouselTitle: '',
    fatherType: ''
};

export default SaveRecipe;
