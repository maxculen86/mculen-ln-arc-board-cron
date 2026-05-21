import React from 'react';
import { Divider } from '@ln/ds-common-divider';
import OpeningMedia from './OpeningMedia';
import OpeningAddons from './OpeningAddons';
import OpeningTitles from './OpeningTitles';

function OpeningImagePanoramic({
    src,
    srcset,
    sizes,
    width,
    height,
    altText,
    videoUrl,
    posterUrl,
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
            {(videoUrl || src) && (
                <div
                    className="w-screen overflow-hidden relative left-1/2 -translate-x-1/2"
                    data-diagram={dataDiagram}
                >
                    <div className="w-full max-md:aspect-1/1 md:h-[64vh] relative bg-black-dark overflow-hidden mb-16 md:mb-56">
                        <OpeningMedia
                            videoUrl={videoUrl}
                            posterUrl={posterUrl}
                            src={src}
                            srcset={srcset}
                            sizes={sizes}
                            width={width}
                            height={height}
                            altText={altText}
                        />
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
                        <p className="font-primary text-subheading-md text-center max-w-635">
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
