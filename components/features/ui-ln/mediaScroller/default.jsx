import React from 'react';
import { MediaScroller as CommonMediaScroller } from '@ln/ds-common-mediascroller';
import { cx } from '@ln/ds-cva';
import Icon from '../icon/default';

/**
 * @typedef {import('@ln/ds-common-mediascroller').MediaScrollerRootProps} MediaScrollerProps
 */

/**
 * @param {MediaScrollerProps} props
 * @returns {React.ReactElement}
 */

function MediaScroller({ children, className, ...props }) {
    return (
        <CommonMediaScroller className={cx('gap-32', className)} {...props}>
            <CommonMediaScroller.Track>{children}</CommonMediaScroller.Track>
            <CommonMediaScroller.Prev
                isIconOnly
                title="Ver anterior"
                aria-label="Ver anterior"
                color="secondary"
                size={40}
                variant="outline"
                className="bg-white-default"
            >
                <Icon name="arrowLeft" size={16} />
            </CommonMediaScroller.Prev>
            <CommonMediaScroller.Next
                isIconOnly
                title="Ver siguiente"
                aria-label="Ver siguiente"
                color="secondary"
                size={40}
                variant="outline"
                className="bg-white-default"
            >
                <Icon name="arrowRight" size={16} />
            </CommonMediaScroller.Next>
            <CommonMediaScroller.Progress className="rounded-[var(--radius-range)]" />
        </CommonMediaScroller>
    );
}

export default MediaScroller;

MediaScroller.Item = CommonMediaScroller.Item;
MediaScroller.Track = CommonMediaScroller.Track;
MediaScroller.Prev = CommonMediaScroller.Prev;
MediaScroller.Next = CommonMediaScroller.Next;
MediaScroller.Progress = CommonMediaScroller.Progress;

MediaScroller.propTypes = CommonMediaScroller.propTypes;
