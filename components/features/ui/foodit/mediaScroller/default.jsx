import React from 'react';
import { MediaScroller as CommonMediaScroller } from '@ln/ds-common-mediascroller';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function MediaScroller({ children, responsive }) {
    const classNameButton =
        'rounded-full bg-white-default border border-secondary-positive';
    return (
        <CommonMediaScroller responsive={responsive}>
            <CommonMediaScroller.Track>{children}</CommonMediaScroller.Track>
            <CommonMediaScroller.Prev
                isIconOnly
                title="Ver anterior"
                aria-label="Ver anterior"
                color="secondary"
                size={40}
                variant="outline"
                className={classNameButton}
            >
                <Icon size={16}>
                    <IconSprite
                        className="text-secondary-positive"
                        name="arrow-left"
                    />
                </Icon>
            </CommonMediaScroller.Prev>
            <CommonMediaScroller.Next
                isIconOnly
                title="Ver siguiente"
                aria-label="Ver siguiente"
                color="secondary"
                size={40}
                variant="outline"
                className={classNameButton}
            >
                <Icon size={16}>
                    <IconSprite
                        className="text-secondary-positive"
                        name="arrow-right"
                    />
                </Icon>
            </CommonMediaScroller.Next>
            <CommonMediaScroller.Progress
                rounded="custom"
                className="rounded-[var(--radius-range)]"
            />
        </CommonMediaScroller>
    );
}
