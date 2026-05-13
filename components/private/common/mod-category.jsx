import React from 'react';
import { cx } from '@ln/ds-cva';
import ModNavigation from './mod-navigation';
import ComImage from './com-image';
import ComTitle from './com-title';
import replaceUrlResizerToWWW from '../../../content/sources/utils/replaceUrlResizerToWWW';
import get from './utils/get';
import useGetLogoImage from './hooks/useGetLogoImage';
import '../../../resources/dist/css/ln/modules/mod-category.css';
import SocialNetwork from './social-network';

function ModCategory({
    imageId = '',
    revista = '',
    category = '',
    style,
    navigation,
    url,
    sectionId = '',
    socials
}) {
    const image = useGetLogoImage(imageId) || {};
    const wwwImage = replaceUrlResizerToWWW(image);
    const {
        width,
        height,
        url: imageUrl,
        resized_urls: [firstResizedUrl] = []
    } = wwwImage || {};

    const resizedUrl = get(firstResizedUrl, 'resizedUrl', '');
    const { width: resizedWidth, height: resizedHeight } = get(
        firstResizedUrl,
        'option',
        {}
    );

    return (
        <div
            className={cx('mod-categories', {
                '--no-app': sectionId === '/juegos'
            })}
        >
            {revista ? (
                <div className="mod-logo">
                    <h1>
                        <span>{category}</span>
                        <ComImage
                            width={resizedWidth || width}
                            height={resizedHeight || height}
                            src={resizedUrl || imageUrl}
                            alt={category}
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
                    classCondition="text-neutral-light-800"
                />
            )}
            <ModNavigation
                navigation={navigation}
                classCondition="--category --font-primary --l --font-medium"
                style={style}
            />
        </div>
    );
}

export default ModCategory;
