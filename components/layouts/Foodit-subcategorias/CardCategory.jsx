import React from 'react';
import { useAppContext } from 'fusion:context';
import { Category } from '@ln/foodit-ui-category';
import { Text } from '@ln/common-ui-text';
import {
    cocinaAMedidaMock,
    getMockBySubcategory
} from '../../features/foodit-global/common/subcategorias/helpers';
import {
    applyPageBasedPriority,
    getCriticalImagesForPage,
    trackSubcategoryCard
} from './_helpers';
import { useImagePreload } from './hooks/useImagePreload';

export function CardCategory() {
    const { deployment, requestUri, contextPath } = useAppContext();

    const assetsPath = file =>
        deployment(
            `${contextPath}/resources/foodit/assets/images/subcategories/${file}`
        );

    const getMockDataForPreload = () => {
        if (requestUri?.includes('cocina-a-tu-medida')) {
            return cocinaAMedidaMock;
        }
        return getMockBySubcategory(requestUri);
    };

    const mockData = getMockDataForPreload();

    const criticalImages = getCriticalImagesForPage(
        requestUri,
        mockData,
        assetsPath
    );

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    useImagePreload(criticalImages, isMobile);

    if (requestUri?.includes('cocina-a-tu-medida')) {
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

    const currentMock = getMockBySubcategory(requestUri);

    if (currentMock) {
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

    return null;
}
