import React from 'react';
import PropTypes from 'fusion:prop-types';
//import '../../../resources/dist/css/ln/components/com-labelarticle.css';

const ComlabelArticle = props => {
    const { labelArticle } = props;

    if (!labelArticle) return null;

    return (
        <div className="com-label --sevenxs" title={labelArticle}>
            {labelArticle}
        </div>
    );
};

export default ComlabelArticle;
