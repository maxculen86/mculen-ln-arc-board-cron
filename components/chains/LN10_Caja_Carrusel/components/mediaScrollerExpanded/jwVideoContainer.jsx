import React, { forwardRef } from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { cx } from '@ln/cva';
import { useCajaCarruselContext } from '../cajaCarruselContext';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import JwVideoPlayer from './jwVideoPlayer';

const JwVideoContainer = forwardRef((_, ref) => {
    const { onCloseMediaScrollerExpanded, videosData } =
        useCajaCarruselContext();

    if (!videosData.length) return null;

    const _className = cx(
        'scroll-y-auto scroll-y-none_md scroll-x-auto_md hide-scrollbar',
        'scroll-snap-block-mandatory scroll-snap-inline-mandatory_md',
        'w-100vw w-100_md h-100dvh_max767 grid_md grid-auto-flow-columm grid-auto-columns-100'
    );

    return (
        <ul ref={ref} className={_className}>
            {videosData.map(({ id, title }, i) => (
                <li
                    key={id}
                    data-scroller-index={i}
                    data-scroller-id={id}
                    data-title={title}
                    className="scroll-snap-align-start scroll-snap-align-center_md ratio-9-16 h-100dvh w-100 w-fit_md js-center flex"
                >
                    <div className="flex h-100 w-100 ratio-9-16 relative py-24_m">
                        <div className="w-100 absolute top-0 left-0 z-1 bg-gradient-dark bg-none_lg py-8 mt-24_m">
                            <Button
                                title="Cerrar"
                                onClick={onCloseMediaScrollerExpanded}
                                className="py-8 px-16 text-white relative left--130_lg"
                                variant="custom"
                                size="inherit"
                                iconOnly
                            >
                                <Icon size={24}>
                                    <IconSprite name="arrowLeft" />
                                </Icon>
                                <span className="text-16">Volver</span>
                            </Button>
                        </div>
                        <JwVideoPlayer videoId={id} />
                    </div>
                </li>
            ))}
        </ul>
    );
});

export default JwVideoContainer;
