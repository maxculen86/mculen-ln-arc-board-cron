import React from 'react';
import LinkUI from '../../../ui/ln/link/default';
import buildDistributorUrl from '../../../../private/LN/common/utils/buildDistributorUrl';

function Distributor({ name, mode, subcategory, shouldShowDistributor }) {
    if (!shouldShowDistributor) return null;

    return (
        <div>
            {name === 'LA NACION' || mode === 'custom' ? (
                <strong>{name}</strong>
            ) : (
                <div className="flex items-center gap-4">
                    <LinkUI
                        href={buildDistributorUrl(name)}
                        title={name}
                        color="black"
                    >
                        <strong className="text ln-text text-16">{name}</strong>
                    </LinkUI>
                    {subcategory.length > 0 && name === 'EL PAIS' && (
                        <span className="text ln-text text-12 text-neutral-light-800">
                            {subcategory}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default Distributor;
