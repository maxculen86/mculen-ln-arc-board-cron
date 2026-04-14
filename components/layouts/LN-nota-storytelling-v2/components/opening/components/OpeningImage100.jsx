import React from 'react';
import { cx } from '@ln/ds-cva';
import ImageUI from '../../../../../features/ui/ln/image/default';
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
    globalContent = {},
    layout = '',
    title1 = '',
    title2 = '',
    subheadline = ''
}) {
    const variant = diagram.split('title-')[1];

    const wrapperClass = openingImage100Variants.wrapper({ variant });
    const containerClass = openingImage100Variants.container({
        variant
    });
    const addonsClass = openingImage100Variants.addons({ variant });

    return (
        <section
            className={cx(
                'relative w-screen overflow-hidden -translate-x-1/2 left-1/2 bg-black-dark',
                sectionHeight
            )}
            data-diagram={diagram}
        >
            {src && (
                <ImageUI
                    alt={altText}
                    src={src}
                    srcSet={srcset}
                    sizes={sizes}
                    width={width}
                    height={height}
                    renderImgOnly
                    classnames={{
                        wrapper: 'opacity-60',
                        image: 'w-full h-full object-cover overflow-hidden'
                    }}
                    fetchPriority="high"
                    loading="eager"
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
                        h1Props={{ text: title1 }}
                        h2Props={{ text: title2 }}
                    />
                    {subheadline && (
                        <p className="prumo text-white text-subheading-md">
                            {subheadline}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default OpeningImage100;
