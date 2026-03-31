import React from 'react';
import { cx } from '@ln/ds-cva';
import { bannerPlaceholderVariants } from './styles';

function BannerPBPlaceholder({
    slotName,
    targeting,
    dimensions,
    missDfpId = false,
    error = '',
    theme = 'light'
}) {
    const getTheme = () => {
        if (missDfpId || error) return 'error';
        return theme;
    };
    const containerClassName = bannerPlaceholderVariants({ theme: getTheme() });

    if (missDfpId) {
        return (
            <div data-tw style={{ display: 'contents' }}>
                <div
                    id="placeholder"
                    className={cx('no-dfpid', containerClassName)}
                >
                    FALTA DFP ID
                </div>
            </div>
        );
    }

    return (
        <div data-tw style={{ display: 'contents' }}>
            <div id="placeholder" className={containerClassName}>
                <h2>Banner {error}</h2>
                <p>{`Slot: ${slotName}`}</p>
                <p>{`Targeting: ${JSON.stringify(targeting)}`}</p>
                <p>{`Dimensions: ${JSON.stringify(dimensions)}`}</p>
            </div>
        </div>
    );
}

export default BannerPBPlaceholder;
