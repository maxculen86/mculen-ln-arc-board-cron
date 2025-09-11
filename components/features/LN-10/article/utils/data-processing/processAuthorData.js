import { getDataAuthor } from '../../_helper';

const processAuthorData = ({ transformedArticle, editorData, chainConfig }) => {
    const { marqueeImg, marquee, authorsQuantity } = getDataAuthor({
        article: transformedArticle,
        variant: editorData.variant,
        authors: editorData.authors,
        hideAuthors: editorData.hideAuthors,
        withMarquee: chainConfig.withMarquee,
        withMarqueeImg: chainConfig.withMarqueeImg
    });

    return {
        marqueeImg,
        marquee,
        authorsQuantity
    };
};

export default processAuthorData;
