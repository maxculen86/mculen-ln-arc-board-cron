import React from 'react';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';

function IaTab({ id = '', title = '' }) {
    const { contextPath, deployment } = useAppContext();
    if (!id || !title) return null;
    const path = `${contextPath}/resources/images/svgDegrade/${id}-ia.webp`;
    const deploymentPath = deployment(path);

    return (
        <>
            <Icon size={24}>
                <Adaptableimage
                    src={deploymentPath}
                    height={24}
                    alt={`icono ${title}`}
                />
            </Icon>
            <Text
                as="h2"
                className="--font-bold text-20 as-flex-end"
                text={title}
            />
        </>
    );
}
export default IaTab;
