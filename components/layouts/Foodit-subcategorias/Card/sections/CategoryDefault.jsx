import React from 'react';
import PropTypes from 'prop-types';
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
                            top: 'max-w-96'
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

CategoryDefault.propTypes = {
    currentMock: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            container: PropTypes.string,
            imageProps: PropTypes.shape({
                src: PropTypes.string,
                alt: PropTypes.string
            }),
            linkProps: PropTypes.shape({
                href: PropTypes.string,
                title: PropTypes.string
            }),
            trackingLabel: PropTypes.string,
            classNames: PropTypes.string
        })
    ).isRequired,
    assetsPath: PropTypes.func.isRequired,
    requestUri: PropTypes.string.isRequired,
    applyPageBasedPriority: PropTypes.func.isRequired,
    trackSubcategoryCard: PropTypes.func.isRequired
};
