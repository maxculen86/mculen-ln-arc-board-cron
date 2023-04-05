import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModNavigation from './mod-navigation';
import withImage from './hocs/withImage';
import ComImage from './com-image';
import ComTitle from './com-title';

import '../../../resources/dist/css/ln/modules/mod-category.css';

const ModCategory = props => {
    const {
        revista,
        category,
        style = undefined,
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
                            isApertura
                        />
                    </h1>
                </div>
            ) : (
                <ComTitle
                    link={url}
                    tag="h1"
                    size="--threexl"
                    weight="--font-extra"
                    style={style}
                    customTitle={`Ir a ${category}`}
                    content={category}
                    classCondition="--black"
                />
            )}
            <ModNavigation
                navigation={navigation}
                classCondition="--category --font-primary --l --font-medium"
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
