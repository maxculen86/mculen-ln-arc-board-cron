import React from 'react';
import { MediaScroller as CommonMediaScroller } from '@ln/ds-common-mediascroller';

/**
 * @typedef {import('@ln/ds-common-mediascroller').MediaScrollerRootProps} MediaScrollerProps
 */

/**
 * @param {MediaScrollerProps} props
 * @returns {React.ReactElement}
 */

export function MediaScroller({ children, className, ...props }) {
    return (
        <CommonMediaScroller
            {...props}
            overflowOnMobile
            responsive={{ sm: '280px' }}
        >
            <CommonMediaScroller.Track>{children}</CommonMediaScroller.Track>
            <CommonMediaScroller.Prev className="w-32">
                &lt;
            </CommonMediaScroller.Prev>
            <CommonMediaScroller.Next className="w-32">
                &gt;
            </CommonMediaScroller.Next>
            <CommonMediaScroller.Progress />
        </CommonMediaScroller>
    );
}

MediaScroller.Item = CommonMediaScroller.Item;

MediaScroller.propTypes = CommonMediaScroller.propTypes;
