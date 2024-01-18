import { getConfig } from './helpers';
import { saveRecipeConfig } from './helpers';
import HeaderSaveRecipe from './components/header';
import MainSaveRecipe from './components/main';
import FooterSaveRecipe from './components/footer';
import useInputListener from './hooks/useInputListener';
import { useRef } from 'react';

const SaveRecipe = props => {
    const { close, ids, indexStep, setIndexStep } = props;
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
                ids={ids}
                indexStep={indexStep}
                leftButton={leftButton}
                newFolder={inputValue}
                rightButton={rightButton}
                selectedFolder={selectValue}
                setIndexStep={setIndexStep}
                inputRef={inputRef}
            />
        </>
    );
};

export default SaveRecipe;
