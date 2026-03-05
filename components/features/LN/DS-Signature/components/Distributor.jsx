import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import formatDistributorName from '../../../../private/LN/common/utils/formatDistributorName';
import LinkUI from '../../../ui/ln/link/default';

function Distributor({ name, mode, subcategory, shouldShowDistributor }) {
    if (!shouldShowDistributor) return null;

    return (
        <div>
            {name === 'LA NACION' || mode === 'custom' ? (
                <strong>{name}</strong>
            ) : (
                <div className="flex items-center gap-4">
                    <LinkUI
                        href={`${SITE_LANACION}/distributor/${formatDistributorName(name)}/`}
                        title={name}
                        color="black"
                    >
                        <strong>{name}</strong>
                    </LinkUI>
                    {subcategory.length > 0 && name === 'EL PAIS' && (
                        <strong>{subcategory}</strong>
                    )}
                </div>
            )}
        </div>
    );
}

export default Distributor;
