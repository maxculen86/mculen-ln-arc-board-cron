import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/com-label.css';

const ComlabelArticle = props => {
    const { labelArticle } = props;

    if (!labelArticle) return null;

    return (
        <div className="com-label --sixxs" title={labelArticle}>
            {labelArticle}
        </div>
    );
};

ComlabelArticle.propTypes = {
    labelArticle: PropTypes.string.isRequired
};

export default ComlabelArticle;
