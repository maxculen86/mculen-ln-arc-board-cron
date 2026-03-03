import React from 'react';
import { Category } from '@ln/foodit-ui-category';

export function CategoryDefault({
    currentMock,
    applyPageBasedPriority,
    trackSubcategoryCard,
    assetsPath,
    requestUri
}) {
    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-16 gap-24_md gap-32_lg">
            {currentMock.map(
                (
                    {
                        title,
                        container,
                        imageProps,
                        linkProps,
                        trackingLabel,
                        classNames
                    },
                    idx
                ) => (
                    <Category
                        key={title}
                        classnames={{
                            container: classNames,
                            top: 'max-w-78'
                        }}
                        container={container}
                        title={title}
                        imageProps={applyPageBasedPriority(
                            {
                                ...imageProps,
                                src: assetsPath(imageProps.src)
                            },
                            idx,
                            requestUri
                        )}
                        linkProps={{
                            ...linkProps,
                            onClick: () =>
                                trackSubcategoryCard(
                                    { title, trackingLabel },
                                    requestUri
                                )
                        }}
                    />
                )
            )}
        </div>
    );
}
