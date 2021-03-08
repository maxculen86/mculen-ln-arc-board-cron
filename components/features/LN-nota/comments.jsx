import Consumer from 'fusion:consumer';
import React from 'react';
import findTermica from '../../private/common/utils/findTermica';
import Comments from '../../private/LN/nota/comments';

const CommentsFeature = props => {
    const showLivefyre = findTermica('livefyre');
    if (!showLivefyre) return <></>;

    return <Comments {...props} />;
};

CommentsFeature.label = 'LN-Nota-Comments';

export default Consumer(CommentsFeature);
