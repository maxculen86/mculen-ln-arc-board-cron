/* eslint-disable react/require-default-props */
import Consumer from 'fusion:consumer';
import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import getScrollPercent from '../../../private/LN/common/utils/getScrollPercent';
import Comments from '../../../private/LN/nota/comments';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import {
    allowComments,
    shouldLoadViafoura
} from '../../../private/common/utils/commentsHelper';

const CommentsFeature = props => {
    const {
        globalContent: { first_publish_date: firstPublishDate }
    } = props;
    const displayComments = allowComments(props);
    const [isReady, setIsReady] = useState(false);
    const loadViafoura =
        shouldLoadViafoura(firstPublishDate) && displayComments;

    useEffect(() => {
        const handleScrollForComments = () => {
            const scrollPercentRounded = getScrollPercent();
            if (scrollPercentRounded > 60) {
                // setIsLoading(true);
                dynamicallyLoadScript(
                    'https://cdn.livefyre.com/Livefyre.js',
                    'head'
                )
                    .then(() => {
                        setIsReady(true);
                        // setIsLoading(false);
                        window.removeEventListener(
                            'scroll',
                            handleScrollForComments
                        );
                    })
                    .catch(error => {
                        // setIsLoading(false);
                        // console.error('Script loading failed! Handle this error', error);
                    });
            }
        };
        if (!loadViafoura && displayComments)
            window.addEventListener('scroll', e => handleScrollForComments());
        return () =>
            !loadViafoura &&
            window.removeEventListener('scroll', handleScrollForComments);
    });

    if (loadViafoura || !displayComments) return <></>;
    if (!isReady) return <LoadingIcon />;

    return <Comments {...props} />;
};

CommentsFeature.propTypes = {
    globalContent: PropTypes.shape({
        first_publish_date: PropTypes.string,
        comments: PropTypes.shape({
            display_comments: PropTypes.bool
        })
    })
};

CommentsFeature.label = 'LN-Nota-Comments';
CommentsFeature.lazy = ['default', 'amp'];

export default Consumer(CommentsFeature);
