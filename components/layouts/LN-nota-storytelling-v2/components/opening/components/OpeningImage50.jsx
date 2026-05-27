import React from 'react';
import { cx } from '@ln/ds-cva';
import OpeningMedia from './OpeningMedia';
import OpeningAddons from './OpeningAddons';
import OpeningTitles from './OpeningTitles';

function OpeningImage50({
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
    hasStorytellingMobile = false
}) {
    const descriptionContainerClassname = cx(
        'flex flex-col flex-1 justify-center text-center max-md:px-16',
        'md:col-start-2 md:col-end-12',
        'xl:max-w-none xl:mx-0 xl:text-left'
    );

    return (
        <section
            className="relative w-[calc(100vw+2px)] -translate-x-[calc(50%+1px)] left-1/2 bg-black-dark mb-16 md:mb-56"
            data-diagram="image-50-right-title-left"
        >
            <div className="flex flex-col items-center gap-responsive md:grid md:grid-cols-12 xl:flex xl:flex-row xl:items-stretch">
                <div className={descriptionContainerClassname}>
                    <div className="flex flex-col items-center gap-8 pt-40 pb-24 xl:py-40 md:max-w-835 md:mx-auto xl:mx-0 xl:w-full xl:max-w-none xl:x-pl-container-start xl:items-start">
                        <OpeningAddons
                            globalContent={globalContent}
                            layout={layout}
                            classnames={{
                                container:
                                    'xl:flex-wrap xl:mr-auto xl:max-w-552'
                            }}
                        />
                        <OpeningTitles
                            h1Props={{
                                text: title1,
                                className: 'xl:max-w-552 text-neutral-1'
                            }}
                            h2Props={{
                                text: title2,
                                className: 'xl:max-w-552 text-neutral-1'
                            }}
                        />
                        {subheadline && (
                            <p className="font-primary text-neutral-1 text-subheading-md xl:max-w-552">
                                {subheadline}
                            </p>
                        )}
                    </div>
                </div>
                <div className="relative max-xl:aspect-4/5 md:max-w-835 md:mx-auto xl:mx-0 md:col-start-2 md:col-end-12 xl:flex-1 xl:h-[calc(100vh-var(--header-sticky-height))] xl:max-w-none overflow-hidden">
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
                            hasStorytellingMobile ? mobileImageData : undefined
                        }
                    />
                </div>
            </div>
        </section>
    );
}

export default OpeningImage50;
