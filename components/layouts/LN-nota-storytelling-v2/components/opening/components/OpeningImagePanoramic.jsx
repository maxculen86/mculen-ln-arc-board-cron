import React from 'react';
import { Divider } from '@ln/ds-common-divider';
import { cx } from '@ln/ds-cva';
import ImageUI from '../../../../../features/ui/ln/image/default';
import OpeningAddons from './OpeningAddons';
import OpeningTitles from './OpeningTitles';
import { sectionHeight } from './styles';

function OpeningImagePanoramic({
    pictureSources,
    imgDefaultUrl,
    altText,
    globalContent = {},
    layout = '',
    title1 = '',
    title2 = '',
    subheadline = '',
    diagram
}) {
    const titleClass = 'text-base-dark text-center';

    return (
        <>
            {imgDefaultUrl && (
                <div
                    className={cx(
                        'w-screen h-screen overflow-hidden relative left-1/2 -translate-x-1/2',
                        sectionHeight
                    )}
                    data-diagram="image-panoramic"
                >
                    <ImageUI
                        alt={altText}
                        src={imgDefaultUrl}
                        className="w-full h-full object-cover"
                        fetchPriority="high"
                        loading="eager"
                        sources={pictureSources}
                    />
                </div>
            )}
            <section className="w-full" data-diagram="image-panoramic">
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
                        <p className="prumo text-subheading-md text-center max-w-635">
                            {subheadline}
                        </p>
                    )}
                    <Divider className="max-w-80 my-40 border-black-default" />
                </div>
            </section>
        </>
    );
}

export default OpeningImagePanoramic;
