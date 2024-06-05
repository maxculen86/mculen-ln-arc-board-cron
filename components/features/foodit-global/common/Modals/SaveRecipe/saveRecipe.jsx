import { useEffect, useRef } from 'react';
import useInputListener from './hooks/useInputListener';

import HeaderSaveRecipe from './components/header';
import MainSaveRecipe from './components/main';
import FooterSaveRecipe from './components/footer';

import { getConfig, saveRecipeConfig } from './helpers';
import useSelectListener from './hooks/useSelectListener';

const SaveRecipe = props => {
    const {
        close,
        ids,
        indexStep,
        setIndexStep,
        collectionArticles,
        carouselTitle
    } = props;
    const inputRef = useRef(null);

    const {
        onChange: onInputFolderChange,
        value: inputValue,
        error: inputError
    } = useInputListener('');

    const { onSelectChange, selectValue = {} } = useSelectListener({});

    const {
        leftButton,
        rightButton,
        showInputFolder,
        showSelect,
        title
    } = getConfig(saveRecipeConfig, indexStep);

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
            />
        </>
    );
};

export default SaveRecipe;
