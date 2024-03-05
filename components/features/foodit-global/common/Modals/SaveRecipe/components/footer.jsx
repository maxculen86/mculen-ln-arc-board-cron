import { transformBookmarkContent } from '../../../bookmark/_helper';
import { useGetFooditArticles } from '../../../bookmark/hooks/useGetFooditArticle';
import { actionButtons } from '../helpers';
import { Button } from '@ln/foodit-ui-button';

const FooterSaveRecipe = ({
    close,
    indexStep,
    leftButton,
    newFolder,
    rightButton,
    selectedFolder,
    setIndexStep,
    ids,
    collectionArticles = []
}) => {
    const articles = useGetFooditArticles(
        (!collectionArticles.length && ids) || []
    );

    const articlesDetails =
        (collectionArticles.length &&
            collectionArticles.map(article =>
                transformBookmarkContent(article)
            )) ||
        articles;

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
                        indexStep,
                        newFolder,
                        selectedFolder,
                        setIndexStep,
                        articlesDetails
                    })
                }
                disabled={!selectedFolder?.value || !articlesDetails.length}
            >
                {rightButton.text}
            </Button>
        </footer>
    );
};

export default FooterSaveRecipe;
