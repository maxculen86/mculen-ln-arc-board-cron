import { actionButtons } from '../helpers';
import { Button } from '@ln/foodit-ui-button';

const FooterSaveRecipe = ({
    close,
    folders,
    ids,
    indexStep,
    leftButton,
    newFolder,
    rightButton,
    selectedFolder,
    setFolders,
    setIndexStep
}) => {
    return (
        <footer className="flex gap-16 as-end">
            <Button
                variant="accent"
                title="Guardar"
                size={40}
                onClick={() =>
                    actionButtons({
                        action: leftButton.action,
                        close,
                        folders,
                        ids,
                        indexStep,
                        newFolder,
                        selectedFolder,
                        setFolders,
                        setIndexStep
                    })
                }
            >
                {leftButton.text}
            </Button>
            <Button
                variant="accent"
                title="Guardar"
                size={40}
                onClick={() =>
                    actionButtons({
                        action: rightButton.action,
                        close,
                        folders,
                        ids,
                        indexStep,
                        newFolder,
                        selectedFolder,
                        setFolders,
                        setIndexStep
                    })
                }
                {...(selectedFolder === 'Elegir carpeta' && {
                    disabled: true
                })}
            >
                {rightButton.text}
            </Button>
        </footer>
    );
};

export default FooterSaveRecipe;
