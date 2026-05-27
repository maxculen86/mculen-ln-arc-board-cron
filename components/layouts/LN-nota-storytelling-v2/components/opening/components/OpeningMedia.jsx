import React from 'react';
import { cx } from '@ln/ds-cva';
import ImageUI from '../../../../../features/ui/ln/image/default';

const COVER_CLASS = 'w-full h-full object-cover opacity-60';

function OpeningMedia({
    videoUrl,
    posterUrl,
    src,
    srcset,
    sizes,
    width,
    height,
    altText,
    mobileImage,
    classname = ''
}) {
    if (!videoUrl && !src) return null;

    const {
        src: mobileSrc,
        srcset: mobileSrcset,
        sizes: mobileSizes,
        width: mobileWidth,
        height: mobileHeight,
        altText: mobileAltText
    } = mobileImage || {};
    const hasMobile = Boolean(mobileSrc);

    if (videoUrl) {
        return (
            <>
                {hasMobile && (
                    <ImageUI
                        alt={mobileAltText}
                        src={mobileSrc}
                        srcSet={mobileSrcset}
                        sizes={mobileSizes}
                        width={mobileWidth}
                        height={mobileHeight}
                        renderImgOnly
                        classnames={{
                            image: cx(COVER_CLASS, classname, 'md:hidden')
                        }}
                        fetchPriority="high"
                        loading="eager"
                    />
                )}
                <video
                    className={cx(
                        COVER_CLASS,
                        classname,
                        hasMobile ? 'hidden md:block' : ''
                    )}
                    src={videoUrl}
                    poster={posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </>
        );
    }

    return (
        <>
            {hasMobile && (
                <ImageUI
                    alt={mobileAltText}
                    src={mobileSrc}
                    srcSet={mobileSrcset}
                    sizes={mobileSizes}
                    width={mobileWidth}
                    height={mobileHeight}
                    renderImgOnly
                    classnames={{
                        image: cx(COVER_CLASS, classname, 'md:hidden')
                    }}
                    fetchPriority="high"
                    loading="eager"
                />
            )}
            <ImageUI
                alt={altText}
                src={src}
                srcSet={srcset}
                sizes={sizes}
                width={width}
                height={height}
                renderImgOnly
                classnames={{
                    image: cx(
                        COVER_CLASS,
                        classname,
                        hasMobile ? 'hidden md:block' : ''
                    )
                }}
                fetchPriority="high"
                loading="eager"
            />
        </>
    );
}

export default OpeningMedia;
