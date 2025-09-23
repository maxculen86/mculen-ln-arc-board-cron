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
        <CommonMediaScroller className="gap-32" {...props}>
            <CommonMediaScroller.Track>{children}</CommonMediaScroller.Track>
            <CommonMediaScroller.Prev
                isIconOnly
                title="Ver anterior"
                aria-label="Ver anterior"
                rounded="custom"
                color="custom"
                variant="outline"
                className="w-40 h-40 bg-[var(--color-primary-light)] text-black rounded-4 translate-none p-12 hover:bg-[var(--color-primary-light)]"
            >
                <span className="inline-block h-6 w-6 border-t border-l border-current rotate-[-45deg] ml-2" />
            </CommonMediaScroller.Prev>
            <CommonMediaScroller.Next
                isIconOnly
                title="Ver siguiente"
                aria-label="Ver siguiente"
                rounded="custom"
                color="custom"
                variant="outline"
                className="w-40 h-40 bg-[var(--color-primary-light)] text-black rounded-4 translate-none p-12 hover:bg-[var(--color-primary-light)]"
            >
                <span className="inline-block h-6 w-6 border-t border-r border-current rotate-[45deg] mr-2" />
            </CommonMediaScroller.Next>
            <CommonMediaScroller.Progress className="rounded-[var(--radius-range)]" />
        </CommonMediaScroller>
    );
}

MediaScroller.Item = CommonMediaScroller.Item;
MediaScroller.Track = CommonMediaScroller.Track;
MediaScroller.Prev = CommonMediaScroller.Prev;
MediaScroller.Next = CommonMediaScroller.Next;
MediaScroller.Progress = CommonMediaScroller.Progress;

MediaScroller.propTypes = CommonMediaScroller.propTypes;
