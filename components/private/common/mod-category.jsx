import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModNavigation from './mod-navigation';
import withImage from './hocs/withImage';
import ComImage from './com-image';
import { SITE_LANACION } from 'fusion:environment';

import '../../../resources/dist/css/ln/modules/mod-category.css';

const ModCategory = props => {
    const {
        revista,
        category,
        style,
        navigation,
        image,
        outputType,
        id
    } = props;
    const { width, height, url } = image || {};

    return (
        <div className="mod-categories">
            {revista ? (
                <div className="mod-logo">
                    <h1>
                        <span>{category}</span>
                        <ComImage
                            width={width}
                            height={height}
                            src={url}
                            alt={category}
                            amp={outputType === 'amp'}
                        />
                    </h1>
                </div>
            ) : (
                <h1 className="com-title --xl" style={style}>
                    <a
                        href={`${SITE_LANACION}${id}/`}
                        className="com-link --black"
                        title={category}
                    >
                        {category}
                    </a>
                </h1>
            )}

            <ModNavigation
                navigation={navigation}
                classCondition="--category"
                style={style}
            />
        </div>
    );
};

ModCategory.propTypes = {
    revista: PropTypes.string,
    category: PropTypes.string,
    style: PropTypes.obj,
    navigation: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    image: PropTypes.shape({
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })
};

ModCategory.defaultProps = {
    revista: '',
    category: '',
    style: {},
    image: {}
};

export default withImage(ModCategory, null, true);
/* 
<i className={`com-logo logo-${revista} --large`} />
*/
