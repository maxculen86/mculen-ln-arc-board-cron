import React from 'react';

import ArticleMain from '../../common/articleTypes/articleMain';
import WithClientSideResize from '../../common/hocs/withClientSideResize';

const articleClientSide = ({ articleData }) => {
    return <ArticleMain articleData={articleData} />;
};

export default WithClientSideResize(articleClientSide);
