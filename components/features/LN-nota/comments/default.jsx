import Consumer from 'fusion:consumer';
import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import findTermica from '../../../private/common/utils/findTermica';
import get from '../../../private/common/utils/get';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import getScrollPercent from '../../../private/LN/common/utils/getScrollPercent';
import Comments from '../../../private/LN/nota/comments';

const CommentsFeature = props => {
    const {
        globalContent: { comments }
    } = props;
    const displayComments = get(comments, 'display_comments', true);
    const [isReady, setIsReady] = useState(false);
    const showLivefyre = findTermica('livefyre');

    useEffect(() => {
        const handleScrollForComments = () => {
            const scrollPercentRounded = getScrollPercent();
            if (scrollPercentRounded > 60) {
                dynamicallyLoadScript(
                    'https://cdn.livefyre.com/Livefyre.js',
                    'head'
                )
                    .then(() => {
                        setIsReady(true);
                        window.removeEventListener(
                            'scroll',
                            handleScrollForComments
                        );
                    })
                    .catch(error => {
                        // console.error('Script loading failed! Handle this error', error);
                    });
            }
        };
        if (showLivefyre && displayComments)
            window.addEventListener('scroll', e => handleScrollForComments());
        return () =>
            window.removeEventListener('scroll', handleScrollForComments);
    });

    if (!isReady || !showLivefyre || !displayComments) return <></>;

    return <Comments {...props} />;
};

CommentsFeature.propTypes = {
    globalContent: PropTypes.shape({
        comments: PropTypes.shape({
            display_comments: PropTypes.bool
        })
    }).isRequired
};

CommentsFeature.label = 'LN-Nota-Comments';

export default Consumer(CommentsFeature);
