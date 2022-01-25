import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModNavigation from './mod-navigation';
import withImage from './hocs/withImage';
import ComImage from './com-image';

import '../../../resources/dist/css/ln/modules/mod-category.css';

const ModCategory = props => {
    const {
        revista,
        category,
        style,
        navigation,
        image,
        outputType,
        url
    } = props;

    const { width, height, url: imageUrl } = image || {};

    return (
        <div className="mod-categories">
            {revista ? (
                <div className="mod-logo">
                    <h1>
                        <span>{category}</span>
                        <ComImage
                            width={width}
                            height={height}
                            src={imageUrl}
                            alt={category}
                            amp={outputType === 'amp'}
                        />
                    </h1>
                </div>
            ) : (
                <h1 className="com-title --xl" style={style}>
                    <a href={url} className="com-link --black" title={category}>
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
    url: PropTypes.string.isRequired,
    style: PropTypes.shape({
        color: PropTypes.string
    }),
    navigation: PropTypes.string,
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
    style: undefined,
    image: {},
    navigation: undefined
};

export default withImage(ModCategory, null, true);
