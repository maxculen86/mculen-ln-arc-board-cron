/* eslint-disable react/require-default-props */
import Consumer from 'fusion:consumer';
import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import findTermica from '../../../private/common/utils/findTermica';
import get from '../../../private/common/utils/get';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import getScrollPercent from '../../../private/LN/common/utils/getScrollPercent';
import Comments from '../../../private/LN/nota/comments';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import { validateComments } from '../../../private/common/utils/commentsHelper';

const CommentsFeature = props => {
    const {
        globalContent: { comments }
    } = props;
    const displayComments = get(comments, 'display_comments', true);
    const [isReady, setIsReady] = useState(false);
    const showLivefyre = findTermica('livefyre');
    const { shouldLoad } = validateComments(props);
    const shouldLoadViafoura = shouldLoad && showLivefyre;

    useEffect(() => {
        const handleScrollForComments = () => {
            const scrollPercentRounded = getScrollPercent();
            if (scrollPercentRounded > 60) {
                dynamicallyLoadScript(
                    'https://cdn.livefyre.com/Livefyre.js',
                    'head'
                ).then(() => {
                    setIsReady(true);
                    window.removeEventListener(
                        'scroll',
                        handleScrollForComments
                    );
                });
            }
        };
        if (showLivefyre && displayComments && !shouldLoadViafoura)
            window.addEventListener('scroll', e => handleScrollForComments());
        return () =>
            !shouldLoadViafoura &&
            window.removeEventListener('scroll', handleScrollForComments);
    });

    if (!showLivefyre || !displayComments || shouldLoadViafoura) return <></>;
    if (!isReady) return <LoadingIcon />;

    return <Comments {...props} />;
};

CommentsFeature.propTypes = {
    globalContent: PropTypes.shape({
        comments: PropTypes.shape({
            display_comments: PropTypes.bool
        })
    })
};

CommentsFeature.label = 'LN-Nota-Comments';
CommentsFeature.lazy = ['default', 'amp'];

export default Consumer(CommentsFeature);
