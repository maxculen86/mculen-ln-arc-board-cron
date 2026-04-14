import React from 'react';
import { cx } from '@ln/ds-cva';
import ImageUI from '../../../../../features/ui/ln/image/default';
import OpeningAddons from './OpeningAddons';
import OpeningTitles from './OpeningTitles';
import { sectionHeight } from './styles';

function OpeningImage50({
    src,
    srcset,
    sizes,
    width,
    height,
    altText,
    globalContent = {},
    layout = '',
    title1 = '',
    title2 = '',
    subheadline = ''
}) {
    const openingContainerClassname = cx(
        'flex flex-col flex-1 justify-center text-center gap-8 h-full px-16',
        'md:px-32 md:col-span-10 md:col-start-2',
        'lg:pt-80 lg:col-span-8 lg:col-start-3',
        'xl:col-start-1 xl:col-end-9 xl:text-left xl:items-start xl:p-0 xl:pl-32',
        'min-[1367px]:xl:max-w-552 min-[1367px]:justify-self-end'
    );

    const titleClass = 'text-display-sm pt-4';

    return (
        <section
            className={cx(
                'relative w-screen -translate-x-1/2 left-1/2 bg-black-dark',
                sectionHeight
            )}
            data-diagram="image-50-right-title-left"
        >
            <div className="flex flex-col items-center gap-40 h-full pt-40 md:pt-80 md:grid md:grid-cols-12 lg:pt-0 lg:gap-8 xl:grid-cols-16 xl:gap-32">
                <div className={openingContainerClassname}>
                    <OpeningAddons
                        globalContent={globalContent}
                        layout={layout}
                    />
                    <OpeningTitles
                        h1Props={{
                            text: title1,
                            className: titleClass
                        }}
                        h2Props={{
                            text: title2,
                            className: titleClass
                        }}
                    />
                    {subheadline && (
                        <p className="prumo text-white text-subheading-md">
                            {subheadline}
                        </p>
                    )}
                </div>
                {src && (
                    <div className="w-full h-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-8 xl:col-start-9 overflow-hidden">
                        <ImageUI
                            alt={altText}
                            src={src}
                            srcSet={srcset}
                            sizes={sizes}
                            width={width}
                            height={height}
                            className="w-full h-full object-cover"
                            renderImgOnly
                            fetchPriority="high"
                            loading="eager"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default OpeningImage50;
