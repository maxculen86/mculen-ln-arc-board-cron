import React from 'react';
import { cx } from '@ln/ds-cva';
import OpeningMedia from './OpeningMedia';
import OpeningAddons from './OpeningAddons';
import OpeningTitles from './OpeningTitles';
import { openingImage100Variants, sectionHeight } from './styles';

function OpeningImage100({
    diagram,
    src,
    srcset,
    sizes,
    width,
    height,
    altText,
    videoUrl,
    posterUrl,
    mobileImageData,
    globalContent = {},
    layout = '',
    title1 = '',
    title2 = '',
    subheadline = '',
    hasStorytellingMobile = false,
    withOpacity = true
}) {
    const hasMedia = Boolean(videoUrl || src);

    const variant = diagram.split('title-')[1];

    const wrapperClass = openingImage100Variants.wrapper({ variant });
    const containerClass = openingImage100Variants.container({ variant });
    const addonsClass = openingImage100Variants.addons({ variant });

    return (
        <section
            className={cx(
                'relative w-screen overflow-hidden -translate-x-1/2 left-1/2 bg-black-dark md:mb-56',
                sectionHeight
            )}
            data-diagram={diagram}
        >
            {hasMedia && (
                <OpeningMedia
                    videoUrl={videoUrl}
                    posterUrl={posterUrl}
                    src={src}
                    srcset={srcset}
                    sizes={sizes}
                    width={width}
                    height={height}
                    altText={altText}
                    mobileImage={
                        hasStorytellingMobile && mobileImageData?.src
                            ? mobileImageData
                            : undefined
                    }
                    classname="absolute inset-0"
                    withOpacity={withOpacity}
                />
            )}
            <div className={wrapperClass}>
                <div className={containerClass}>
                    <OpeningAddons
                        globalContent={globalContent}
                        layout={layout}
                        classnames={{
                            container: addonsClass
                        }}
                    />
                    <OpeningTitles
                        h1Props={{ text: title1, className: 'text-neutral-1' }}
                        h2Props={{ text: title2, className: 'text-neutral-1' }}
                    />
                    {subheadline && (
                        <p className="font-primary text-neutral-1 text-subheading-md max-md:hidden">
                            {subheadline}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default OpeningImage100;
