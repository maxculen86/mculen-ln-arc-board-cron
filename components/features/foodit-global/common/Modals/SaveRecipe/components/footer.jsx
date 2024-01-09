import { actionButtons } from '../helpers';
import { Button } from '@ln/foodit-ui-button';

const FooterSaveRecipe = ({
    close,
    ids,
    indexStep,
    leftButton,
    newFolder,
    rightButton,
    selectedFolder,
    setIndexStep
}) => {
    return (
        <footer className="flex gap-16 as-end">
            <Button
                variant="secondary"
                title="Cancelar"
                size={40}
                onClick={() =>
                    actionButtons({
                        action: leftButton.action,
                        close,
                        ids,
                        indexStep,
                        newFolder,
                        selectedFolder,
                        setIndexStep
                    })
                }
            >
                {leftButton.text}
            </Button>
            <Button
                variant="primary"
                title="Guardar"
                size={40}
                onClick={() =>
                    actionButtons({
                        action: rightButton.action,
                        close,
                        ids,
                        indexStep,
                        newFolder,
                        selectedFolder,
                        setIndexStep
                    })
                }
                disabled={!selectedFolder?.value}
            >
                {rightButton.text}
            </Button>
        </footer>
    );
};

export default FooterSaveRecipe;
