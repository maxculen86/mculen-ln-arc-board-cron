import React, { Fragment, useEffect, useRef } from 'react';
import { cx } from '@ln/cva';
import { Dialog } from '@ln/common-ui-dialog';
import { useStickyMobile } from './hooks/useStickyMobile';
import { NotaStickyMobile } from './components/notaStickyMobile';
import { HeaderSticky } from './components/headerSticky';
import { handleClickForCTRcomponent } from '../../../../private/common/utils/noteTracker/ctrTracker';
import { scheduleTask } from '../../../../private/common/utils/scheduleTask';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { getComboIds, getComboTitles, getTitle } from './_helpers';

export function StickyMobile({ articlesToShow, ...r }) {
    const {
        displaySticky,
        isCollapsed,
        ref,
        closeHandler = () => {}
    } = useStickyMobile();

    const classNames = cx(
        'sticky-mobile-v2',
        'animation animation-duration-300 transition transition-ease-in',
        'bg-light-50',
        'rounded-top-left-16 rounded-top-right-16',
        'mb-62',
        'z-101',
        'overflow-hidden',
        !displaySticky && 'none'
    );

    const handleClose = () => {
        closeHandler();
        scheduleTask(() => handleClickForCTRcomponent('close'));
    };
    const comboIds = getComboIds(articlesToShow);
    const comboTitles = getComboTitles(articlesToShow);

    const lastSentRef = useRef(null);

    useEffect(() => {
        if (!displaySticky || articlesToShow.length === 0) return;

        const state = isCollapsed ? 'collapsed' : 'expanded';
        if (lastSentRef.current === state) return;

        if (isCollapsed) {
            const firstArticle = articlesToShow[0];
            if (firstArticle?._id) {
                addEventToDataLayerV2({
                    event: 'ImpresionStickyMobile',
                    articleId: firstArticle._id,
                    title: getTitle(firstArticle),
                    rest: {
                        number_note: 1
                    }
                });
            }
        } else {
            addEventToDataLayerV2({
                event: 'ImpresionStickyMobileCombo',
                rest: {
                    combo_notas: comboIds,
                    combo_titles: comboTitles
                }
            });
        }

        lastSentRef.current = state;
    }, [displaySticky, isCollapsed, articlesToShow]);

    return (
        <Dialog
            position="bottom"
            onClose={() => closeHandler}
            className={classNames}
            isOpen={displaySticky}
            data-mrf-recirculation="n_sticky"
            ref={ref}
            {...r}
        >
            <HeaderSticky handleClose={handleClose} />
            <Dialog.Body
                className={cx(
                    'sticky-mobile-v2-body flex flex-column px-16 py-8 gap-8 mb-50',
                    displaySticky && isCollapsed && 'fade-content-16',
                    displaySticky && !isCollapsed && 'open'
                )}
            >
                {articlesToShow.map((article, index) => (
                    <Fragment key={`sticky-article-${article._id}`}>
                        <NotaStickyMobile
                            article={article}
                            index={index}
                            articles={articlesToShow}
                        />
                        {index + 1 < articlesToShow.length && <hr />}
                    </Fragment>
                ))}
            </Dialog.Body>
        </Dialog>
    );
}

export default StickyMobile;
