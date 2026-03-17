import React from 'react';
import { Category } from '@ln/foodit-ui-category';
import { useAppContext } from 'fusion:context';
import { ejesHomeMock } from '../subcategorias/helpers';

export function EjesHome() {
    const { deployment, contextPath } = useAppContext();

    const assetsPath = file =>
        deployment(
            `${contextPath}/resources/foodit/assets/images/ejes/${file}`
        );

    const trackingLabelHome = ejesHomeMock.map(item => item.trackingLabel);

    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg pt-24 pt-0_lg gap-16 gap-24_md gap-32_lg">
            {ejesHomeMock.map(
                (
                    { title, container, imageProps, linkProps, classNames },
                    index
                ) => (
                    <Category
                        key={title}
                        classnames={{
                            container: classNames,
                            top: 'max-w-78'
                        }}
                        container={container}
                        title={title}
                        imageProps={{
                            ...imageProps,
                            src: assetsPath(imageProps.src),
                            fetchPriority: index === 0 ? 'high' : 'low',
                            loading: index === 0 ? 'eager' : 'lazy'
                        }}
                        linkProps={{
                            ...linkProps,
                            'data-interaction': 'dataLayerInteraction',
                            'data-event': 'e_linkclick',
                            'data-category': 'cards_home',
                            'data-label': trackingLabelHome[index],
                            'data-action': 'N/A'
                        }}
                    />
                )
            )}
        </div>
    );
}
