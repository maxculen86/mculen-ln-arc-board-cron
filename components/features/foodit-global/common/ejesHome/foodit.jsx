import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import { ejesHomeMock } from '../subcategorias/helpers';
import { MediaScroller } from '../../../ui/foodit/mediaScroller/default';
import { CardEjes } from '../../../ui/foodit/CardEjes/default';

export function EjesHome() {
    const { deployment, contextPath } = useAppContext();

    const assetsPath = file =>
        deployment(
            `${contextPath}/resources/foodit/assets/images/ejes/${file}`
        );

    const responsive = {
        base: { columns: 8, span: 3 },
        md: { columns: 12, span: 3 },
        lg: { columns: 16, span: 4 }
    };

    return (
        <div data-tw>
            <div className="-mb-28 xl:-mb-0">
                <MediaScroller responsive={responsive}>
                    <Static>
                        {ejesHomeMock.map(
                            (
                                {
                                    title,
                                    imageProps,
                                    linkProps,
                                    classNames,
                                    trackingLabel
                                },
                                index
                            ) => (
                                <CardEjes
                                    key={title}
                                    title={title}
                                    image={assetsPath(imageProps.src)}
                                    classNames={classNames}
                                    href={linkProps.href}
                                    fetchPriority={index === 0 ? 'high' : 'low'}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    trackingProps={{
                                        'data-interaction':
                                            'dataLayerInteraction',
                                        'data-event': 'e_linkclick',
                                        'data-category': 'cards_home',
                                        'data-label': trackingLabel,
                                        'data-action': 'N/A'
                                    }}
                                />
                            )
                        )}
                    </Static>
                </MediaScroller>
            </div>
        </div>
    );
}
