import React from 'react';
import PropTypes from 'fusion:prop-types';

import ArticleMain from '../../common/articleTypes/articleMain';
import WithClientSideResize from '../../common/hocs/withClientSideResize';

const articleClientSide = ({ articleData, position }) => {
    return <ArticleMain articleData={articleData} position={position} />;
};

articleClientSide.propTypes = {
    articleData: PropTypes.shape({
        type: PropTypes.oneOf(['story'])
    }).isRequired,
    position: PropTypes.number
};

export default WithClientSideResize(articleClientSide, 'm', 'promo_items');
