import React from 'react';
import PropTypes from 'prop-types';
import { Category } from '@ln/foodit-ui-category';
import { Text } from '@ln/common-ui-text';
import { cocinaAMedidaMock } from '../../../../features/foodit-global/common/subcategorias/helpers';

export function CategoryCustom({
    assetsPath,
    requestUri,
    applyPageBasedPriority,
    trackSubcategoryCard
}) {
    return (
        <>
            <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
                {cocinaAMedidaMock
                    .slice(0, 2)
                    .map(
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
                                classnames={{
                                    container: classNames,
                                    top: 'max-w-96'
                                }}
                                key={title}
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

            <div>
                <Text as="p" className="prumo prumo-semibold text-20 pb-24">
                    Tipos de alimentación
                </Text>
                <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-16 gap-24_md gap-32_lg">
                    {cocinaAMedidaMock
                        .slice(2, 8)
                        .map(
                            (
                                {
                                    title,
                                    container,
                                    imageProps,
                                    linkProps,
                                    classNames,
                                    trackingLabel
                                },
                                idx
                            ) => (
                                <Category
                                    classnames={{
                                        container: classNames,
                                        top: 'max-w-96'
                                    }}
                                    key={title}
                                    container={container}
                                    title={title}
                                    imageProps={applyPageBasedPriority(
                                        {
                                            ...imageProps,
                                            src: assetsPath(imageProps.src)
                                        },
                                        idx + 2,
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
            </div>
        </>
    );
}

CategoryCustom.propTypes = {
    assetsPath: PropTypes.func.isRequired,
    requestUri: PropTypes.string.isRequired,
    applyPageBasedPriority: PropTypes.func.isRequired,
    trackSubcategoryCard: PropTypes.func.isRequired
};
