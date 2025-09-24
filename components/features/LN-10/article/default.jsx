import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { articleCustomFields } from './_helper';
import useArticleFeature from './hooks/useArticleFeature';
import getArticleRenderer from './utils/getArticleRenderer';

function ArticleFeature({ id: featureId, customFields, searchableField }) {
    const data = useArticleFeature(featureId, customFields, searchableField);
    return getArticleRenderer(data);
}

ArticleFeature.label = 'LN10 Articulo';

ArticleFeature.propTypes = {
    id: PropTypes.string.isRequired,
    tree: PropTypes.shape({
        children: PropTypes.array
    }).isRequired,
    customFields: PropTypes.shape({
        noteId: articleCustomFields.noteId,
        title: articleCustomFields.title,
        lead: articleCustomFields.lead,
        imageId: articleCustomFields.imageId,
        hideImage: articleCustomFields.hideImage,
        authors: articleCustomFields.authors,
        hideAuthors: articleCustomFields.hideAuthors,
        hideFeature: articleCustomFields.hideFeature,
        description: articleCustomFields.description,
        hideDescription: articleCustomFields.hideDescription,
        chapita: articleCustomFields.chapita,
        chapitaStyle: articleCustomFields.chapitaStyle,
        video: articleCustomFields.video,
        html: articleCustomFields.html,
        videoComercial: articleCustomFields.videoComercial,
        cllBoard: articleCustomFields.cllBoard,
        variant: articleCustomFields.variant
    }).isRequired,
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    }).isRequired
};

export default Consumer(ArticleFeature);
