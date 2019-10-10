import React from 'react';
import PropTypes from 'fusion:prop-types';

import ArticleMain from '../../common/articleTypes/articleMain';
import WithClientSideResize from '../../common/hocs/withClientSideResize';

const articleClientSide = ({ articleData }) => {
    return <ArticleMain articleData={articleData} />;
};

articleClientSide.propTypes = {
    articleData: PropTypes.shape({
        type: PropTypes.string
    }).isRequired
};

export default WithClientSideResize(articleClientSide, 'notaM');
