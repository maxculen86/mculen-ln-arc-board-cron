import get from '../../../../../../common/utils/get';

const getSources = (children, storiesQuantity) => {
    return children.reduce((result, article) => {
        if (
            article &&
            (storiesQuantity === 0 || result.length < storiesQuantity)
        ) {
            return result.concat(article);
        }
        return result;
    }, []);
};

const respCajaCollection = (containerImage, props) => {
    const { children, customFields } = props;

    const layout = get(customFields, 'layout', null);
    let storiesQuantity = 0;
    if (layout) {
        storiesQuantity = parseInt(layout.charAt(layout.length - 1), 10);

        storiesQuantity = storiesQuantity || children.length;
    }
    const sources = getSources(children, storiesQuantity);

    if (!sources.length) {
        return null;
    }

    return {
        information: { ...customFields, image: containerImage },
        articles: sources
    };
};
export default respCajaCollection;
