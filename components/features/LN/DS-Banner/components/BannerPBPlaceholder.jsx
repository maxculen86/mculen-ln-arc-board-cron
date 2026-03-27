import React from 'react';
import { cx } from '@ln/ds-cva';

function BannerPBPlaceholder({
    slotName,
    targeting,
    dimensions,
    missDfpId = false,
    error = ''
}) {
    const containerClassName = cx(
        'w-300 m-4',
        missDfpId || error ? 'bg-error-default' : 'bg-neutral-200'
    );

    if (missDfpId) {
        return (
            <div
                id="placeholder"
                className={cx('no-dfpid', containerClassName)}
            >
                FALTA DFP ID
            </div>
        );
    }

    return (
        <div id="placeholder" className={containerClassName}>
            <h2>Banner {error}</h2>
            <p>{`Slot: ${slotName}`}</p>
            <p>{`Targeting: ${JSON.stringify(targeting)}`}</p>
            <p>{`Dimensions: ${JSON.stringify(dimensions)}`}</p>
        </div>
    );
}

export default BannerPBPlaceholder;
