import React from 'react';
import { Divider } from '@ln/ds-common-divider';
import ImageUI from '../../../../../features/ui/ln/image/default';
import OpeningAddons from './OpeningAddons';
import OpeningTitles from './OpeningTitles';

function OpeningImagePanoramic({
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
    subheadline = '',
    diagram
}) {
    const titleClass = 'text-base-dark text-center';
    const dataDiagram = 'image-panoramic';

    return (
        <>
            {src && (
                <div
                    className="w-screen overflow-hidden relative left-1/2 -translate-x-1/2"
                    data-diagram={dataDiagram}
                >
                    <div className="w-full min-md:aspect-1/1 md:h-[64vh] relative bg-black-dark overflow-hidden mb-16 md:mb-56">
                        <ImageUI
                            alt={altText}
                            src={src}
                            srcSet={srcset}
                            sizes={sizes}
                            width={width}
                            height={height}
                            className="object-cover opacity-60"
                            renderImgOnly
                            fetchPriority="high"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-black-dark -z-1" />
                    </div>
                </div>
            )}
            <section className="w-full" data-diagram={dataDiagram}>
                <div className="flex flex-col items-center justify-center gap-12 max-w-835 m-auto">
                    <OpeningAddons
                        globalContent={globalContent}
                        layout={layout}
                        classnames={{
                            contentLab: 'text-base-default'
                        }}
                        diagram={diagram}
                    />
                    <OpeningTitles
                        baseClassName="font-primary hero-title-fluid"
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
                        <p className="font-primary hero-subheading-fluid text-center max-w-635">
                            {subheadline}
                        </p>
                    )}
                    <Divider className="max-w-80 mt-28 mb-16" color="black" />
                </div>
            </section>
        </>
    );
}

export default OpeningImagePanoramic;
