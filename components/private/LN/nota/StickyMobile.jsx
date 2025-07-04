import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { cx } from '@ln/cva';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import { handleClickForCTRcomponent } from '../../common/utils/noteTracker/ctrTracker';
import get from '../../common/utils/get';

function StickyMobile({ alt, articleToShow }) {
    const {
        promo_items: promoItems = {},
        website_url: websiteUrl = '',
        headlines = {}
    } = articleToShow;

    const { basic: { url = '', resized_urls: resizedUrls = [] } = {} } =
        promoItems;

    const { mobile: headlinesMobile = '', basic: headlinesBasic = '' } =
        headlines;

    const headlineToUse = headlinesMobile || headlinesBasic;
    const [displaySticky, setDisplaySticky] = useState(true);

    const classNameContainer = cx(
        'sticky-mobile',
        'animation animation-name-fade-in-up animation-duration-300 transition transition-ease-in',
        'bg-light-50 rounded-top-left-16 rounded-top-right-16 fixed bottom-0 min-h-246 w-100 z-101 -ml-16',
        !displaySticky && 'none'
    );

    return (
        <section className={classNameContainer}>
            <div
                className="sticky-mobile-container flex flex-column flex-grow-1"
                data-mrf-recirculation="n_sticky"
            >
                <div className="header-sticky">
                    <div className="flex ai-center bg-blue-500 rounded-top-left-16 rounded-top-right-16 jc-center">
                        <div className="w-100 px-16 flex flex-row ai-center jc-between max-w-511">
                            <Icon size={28}>
                                <IconSprite name="productLn" fill="#fff" />
                            </Icon>
                            <Text
                                tag="h3"
                                className="arial text-16 text-neutral-light-1"
                                weight="bold"
                            >
                                Lo más leído
                            </Text>
                            <Button
                                onClick={() => {
                                    setDisplaySticky(false);
                                    handleClickForCTRcomponent('close');
                                }}
                                id="stickyMobileTestId"
                                iconOnly
                                size="inherit"
                                aria-hidden="true"
                            >
                                <Icon size={24}>
                                    <IconSprite
                                        name="close"
                                        fill="var(--neutral-light-1)"
                                    />
                                </Icon>
                            </Button>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    onClick={() => handleClickForCTRcomponent('open')}
                    className="pt-8 px-16 mx-auto max-w-511"
                >
                    <Link
                        href={websiteUrl}
                        title={headlineToUse}
                        className="flex gap-8 ai-center mb-125"
                    >
                        <Adaptableimage
                            src={get(resizedUrls[0], 'resizedUrl', url)}
                            alt={alt || headlineToUse}
                            sources={resizedUrls}
                            width={96}
                        />
                        {headlineToUse && (
                            <Text
                                className="arial text-16_110 text-neutral-light-800 text-ellipsis-3"
                                weight="bold"
                                tag="h2"
                            >
                                {headlineToUse}
                            </Text>
                        )}
                    </Link>
                </div>
            </div>
        </section>
    );
}

StickyMobile.propTypes = {
    alt: PropTypes.string,
    articleToShow: PropTypes.shape({
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
};

StickyMobile.defaultProps = {
    alt: '',
    articleToShow: {}
};

export default StickyMobile;
