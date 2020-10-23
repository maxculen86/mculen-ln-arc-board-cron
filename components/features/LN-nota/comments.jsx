import Consumer from 'fusion:consumer';
import React from 'react';

import Comments from '../../private/LN/nota/comments';

const CommentsFeature = props => {
    return <Comments {...props} />;
};

CommentsFeature.label = 'LN-Nota-Comments';

export default Consumer(CommentsFeature);
