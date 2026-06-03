import React from 'react';
import { cx } from '@ln/ds-cva';
import ModNavigation from './mod-navigation';
import ComImage from './com-image';
import ComTitle from './com-title';
import { replaceUrlResizerToWWW } from './utils/image/resizer/v2/resizerHelper';
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
        <>
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
                        classCondition="--black"
                    />
                )}
                <ModNavigation
                    navigation={navigation}
                    classCondition="--category --font-primary --l --font-medium"
                    style={style}
                />
            </div>
            {socials?.length > 0 && (
                <div data-tw>
                    {socials.map(social => (
                        <SocialNetwork {...social} />
                    ))}
                </div>
            )}
        </>
    );
}

export default ModCategory;
