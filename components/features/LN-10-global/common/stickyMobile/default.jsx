import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';
import { Dialog } from '@ln/common-ui-dialog';
import { useStickyMobile } from './_helpers/useStickyMobile';
import { NotaStickyMobile } from './components/notaStickyMobile';
import { HeaderSticky } from './components/headerSticky';
import { handleClickForCTRcomponent } from '../../../../private/common/utils/noteTracker/ctrTracker';

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
        handleClickForCTRcomponent('close');
    };

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
                        <NotaStickyMobile article={article} />
                        {index + 1 < articlesToShow.length && <hr />}
                    </Fragment>
                ))}
            </Dialog.Body>
        </Dialog>
    );
}

StickyMobile.propTypes = {
    articlesToShow: PropTypes.arrayOf(
        PropTypes.shape({
            alt: PropTypes.string,
            _id: PropTypes.string,
            promo_items: PropTypes.shape({
                basic: PropTypes.shape({
                    url: PropTypes.string,
                    resized_urls: PropTypes.arrayOf(
                        PropTypes.shape({
                            resizedUrl: PropTypes.string,
                            option: PropTypes.shape({
                                width: PropTypes.number,
                                height: PropTypes.number
                            })
                        })
                    )
                })
            }),
            website_url: PropTypes.string,
            headlines: PropTypes.shape({
                mobile: PropTypes.string,
                basic: PropTypes.string
            })
        })
    ).isRequired
};

export default StickyMobile;
