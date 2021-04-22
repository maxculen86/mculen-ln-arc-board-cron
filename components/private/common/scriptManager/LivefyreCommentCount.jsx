import React from 'react';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';
import get from '../utils/get';

const LivefyreCommentCount = props => {
    const arcSite = get(props, 'arcSite', 'la-nacion-ar');
    const network = get(getProperties(arcSite), 'livefyre.network');
    const displayComments = get(
        props,
        'globalContent.comments.display_comments'
    );

    return (
        (displayComments && network && (
            <script
                defer
                type="text/javascript"
                data-lf-domain={network}
                src="https://cdn.livefyre.com/libs/commentcount/v1.0/commentcount.js"
            />
        )) ||
        null
    );
};

LivefyreCommentCount.propTypes = {
    arcSite: PropTypes.string.isRequired
};

export default LivefyreCommentCount;
