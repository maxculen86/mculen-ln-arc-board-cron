import React from 'react';
import OpeningAddons from './OpeningAddons';
import OpeningTitles from './OpeningTitles';
import Divider from '../../../../../features/ui/ln/divider/default';

function OpeningWithoutImage({
    globalContent = {},
    layout = '',
    title1 = '',
    title2 = '',
    subheadline = '',
    diagram
}) {
    return (
        <section className="w-full pt-40 md:pt-80" data-diagram="without-image">
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
                        className: 'text-center'
                    }}
                    h2Props={{
                        text: title2,
                        className: 'text-center'
                    }}
                />
                {subheadline && (
                    <p className="font-primary text-subheading-md text-center max-w-635">
                        {subheadline}
                    </p>
                )}
                <Divider
                    color="black"
                    className="w-80 min-w-80 max-w-80 mt-28 mb-16"
                />
            </div>
        </section>
    );
}

export default OpeningWithoutImage;
