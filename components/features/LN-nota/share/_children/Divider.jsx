/* eslint-disable react/prop-types */
import React from 'react';
import { cx } from '@ln/ds-cva';

export function Divider({ variant = '' }) {
    const borderWidthOverride = 'border border-2';
    if (variant === 'vertical') {
        return <hr className={cx('vertical', borderWidthOverride)} />;
    }
    return (
        <>
            <hr className={cx('l-none vertical', borderWidthOverride)} />
            <hr className={cx('l-only', borderWidthOverride)} />
        </>
    );
}
