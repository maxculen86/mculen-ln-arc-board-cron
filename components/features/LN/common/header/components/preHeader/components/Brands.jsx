import React from 'react';
import { Preheader as CommonPreHeader } from '@ln/ds-common-preheader';
import { useAppContext } from 'fusion:context';
import generateIconPath from '../../../../../../ui/ln/icon/helpers';
import brands from '../helpers/brandsData.json';

function Brands() {
    const { contextPath, deployment } = useAppContext();
    return (
        <CommonPreHeader.Content>
            {brands.links.map(link => (
                <CommonPreHeader.Link
                    key={link.label}
                    data-event="e_linkclick"
                    target="_blank"
                    {...link} // importante que este antes que logo para evitar override
                    logo={{
                        ...link.logo,
                        path: generateIconPath({
                            contextPath,
                            deployment,
                            type: 'default'
                        })
                    }}
                />
            ))}
        </CommonPreHeader.Content>
    );
}

export default Brands;
