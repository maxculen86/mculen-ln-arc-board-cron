import { useRef } from 'react';
import useInputListener from './hooks/useInputListener';

import HeaderSaveRecipe from './components/header';
import MainSaveRecipe from './components/main';
import FooterSaveRecipe from './components/footer';

import { getConfig, saveRecipeConfig } from './helpers';

const SaveRecipe = props => {
    const { close, ids, indexStep, setIndexStep, collectionArticles } = props;
    const inputRef = useRef(null);

    const {
        onChange: onInputFolderChange,
        value: inputValue
    } = useInputListener('');

    const { onChange: onSelectChange, value: selectValue } = useInputListener();

    const {
        leftButton,
        rightButton,
        showInputFolder,
        showSelect,
        suggestions,
        title
    } = getConfig(saveRecipeConfig, selectValue, indexStep);

    return (
        <>
            <HeaderSaveRecipe title={title} />
            <MainSaveRecipe
                newFolder={inputValue}
                onInputFolderChange={onInputFolderChange}
                selectedFolder={selectValue}
                onSelectChange={onSelectChange}
                showInputFolder={showInputFolder}
                showSelect={showSelect}
                suggestions={suggestions}
                inputRef={inputRef}
            />
            <FooterSaveRecipe
                close={close}
                indexStep={indexStep}
                leftButton={leftButton}
                newFolder={inputValue}
                rightButton={rightButton}
                selectedFolder={selectValue}
                setIndexStep={setIndexStep}
                ids={ids}
                collectionArticles={collectionArticles}
            />
        </>
    );
};

export default SaveRecipe;
