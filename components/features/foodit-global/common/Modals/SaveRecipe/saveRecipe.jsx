import { getConfig } from './helpers';
import { saveRecipeConfig } from './helpers';
import HeaderSaveRecipe from './components/header';
import MainSaveRecipe from './components/main';
import FooterSaveRecipe from './components/footer';

const SaveRecipe = props => {
    const {
        close,
        folders,
        ids,
        indexStep,
        newFolder,
        selectedFolder,
        setFolders,
        setIndexStep,
        setNewFolder,
        setSelectedFolder
    } = props;

    const {
        leftButton,
        rightButton,
        showInputFolder,
        showSelect,
        suggestions,
        title
    } = getConfig(saveRecipeConfig, selectedFolder, indexStep);

    return (
        <>
            <HeaderSaveRecipe title={title} />
            <MainSaveRecipe
                folders={folders}
                newFolder={newFolder}
                selectedFolder={selectedFolder}
                setNewFolder={setNewFolder}
                setSelectedFolder={setSelectedFolder}
                showInputFolder={showInputFolder}
                showSelect={showSelect}
                suggestions={suggestions}
            />
            <FooterSaveRecipe
                close={close}
                folders={folders}
                ids={ids}
                indexStep={indexStep}
                leftButton={leftButton}
                newFolder={newFolder}
                rightButton={rightButton}
                selectedFolder={selectedFolder}
                setFolders={setFolders}
                setIndexStep={setIndexStep}
            />
        </>
    );
};

export default SaveRecipe;
