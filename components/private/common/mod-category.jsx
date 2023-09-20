import React from 'react';
import PropTypes from 'fusion:prop-types';
import ModNavigation from './mod-navigation';
import ComImage from './com-image';
import ComTitle from './com-title';

import get from './utils/get';
import useGetLogoImage from './hooks/useGetLogoImage';
import '../../../resources/dist/css/ln/modules/mod-category.css';

const ModCategory = props => {
    const {
        imageId,
        revista,
        category,
        style = undefined,
        navigation,
        outputType,
        url
    } = props;

    const image = useGetLogoImage(imageId) || {};
    const {
        width,
        height,
        url: imageUrl,
        resized_urls: [firstResizedUrl] = []
    } = image || {};

    const resizedUrl = get(firstResizedUrl, 'resizedUrl', '');
    const { width: resizedWidth, height: resizedHeight } = get(
        firstResizedUrl,
        'option',
        {}
    );

    return (
        <div className="mod-categories">
            {revista ? (
                <div className="mod-logo">
                    <h1>
                        <span>{category}</span>
                        <ComImage
                            width={resizedWidth || width}
                            height={resizedHeight || height}
                            src={resizedUrl || imageUrl}
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
    imageId: PropTypes.string
};

ModCategory.defaultProps = {
    revista: '',
    category: '',
    style: undefined,
    imageId: '',
    navigation: undefined
};

export default ModCategory;
