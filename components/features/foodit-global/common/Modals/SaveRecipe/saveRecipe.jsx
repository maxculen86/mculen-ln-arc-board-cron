import React, { useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import useSelectListener from './hooks/useSelectListener';
import useInputListener from './hooks/useInputListener';

import HeaderSaveRecipe from './components/header';
import MainSaveRecipe from './components/main';
import FooterSaveRecipe from './components/footer';

import { getConfig, saveRecipeConfig } from './helpers';

function SaveRecipe({
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

    return (
        <>
            <HeaderSaveRecipe title={title} />
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
        </>
    );
}

SaveRecipe.propTypes = {
    close: PropTypes.func.isRequired,
    ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    indexStep: PropTypes.number.isRequired,
    setIndexStep: PropTypes.func.isRequired,
    collectionArticles: PropTypes.arrayOf(PropTypes.object),
    carouselTitle: PropTypes.string,
    fatherType: PropTypes.string
};

SaveRecipe.defaultProps = {
    collectionArticles: [],
    carouselTitle: '',
    fatherType: ''
};

export default SaveRecipe;
