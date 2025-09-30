import React from 'react';
import { Category } from '@ln/foodit-ui-category';
import { useAppContext } from 'fusion:context';
import { ejesHomeMock } from '../subcategorias/helpers';
import { trackHomeCard } from '../../../../layouts/Foodit-subcategorias/_helpers';

export function EjesHome() {
    const { deployment, contextPath } = useAppContext();

    const assetsPath = file =>
        deployment(
            `${contextPath}/resources/foodit/assets/images/ejes/${file}`
        );

    return (
        <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg pt-24 pt-0_lg gap-16 gap-24_md gap-32_lg">
            {ejesHomeMock.map(
                ({
                    title,
                    container,
                    imageProps,
                    linkProps,
                    classNames,
                    trackingLabel
                }) => (
                    <Category
                        key={title}
                        classnames={{
                            container: classNames,
                            top: 'max-w-96'
                        }}
                        container={container}
                        title={title}
                        imageProps={{
                            ...imageProps,
                            src: assetsPath(imageProps.src)
                        }}
                        linkProps={{
                            ...linkProps,
                            onClick: () => trackHomeCard({ trackingLabel })
                        }}
                    />
                )
            )}
        </div>
    );
}
