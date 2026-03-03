import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import formatDistributorName from '../../../../private/LN/common/utils/formatDistributorName';
import LinkUI from '../../../ui/ln/link/default';

function Distributor({ name, mode, subcategory, shouldShowDistributor }) {
    if (!shouldShowDistributor) return null;

    return (
        <div>
            {name === 'LA NACION' || mode === 'custom' ? (
                <span>{name}</span>
            ) : (
                <div className="flex items-center gap-4">
                    <LinkUI
                        href={`${SITE_LANACION}/distributor/${formatDistributorName(name)}/`}
                        title={name}
                        color="black"
                    >
                        <span>{name}</span>
                    </LinkUI>
                    {subcategory.length > 0 && name === 'EL PAIS' && (
                        <span>{subcategory}</span>
                    )}
                </div>
            )}
        </div>
    );
}

export default Distributor;
