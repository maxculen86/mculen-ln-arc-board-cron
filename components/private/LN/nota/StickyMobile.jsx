/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/components/sticky-mobile.css';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import ModPicture from '../../common/mod-picture';
import { handleClickForCTRcomponent } from '../../common/utils/noteTracker/ctrTracker';
import get from '../../common/utils/get';

function StickyMobile({ headerText, alt, articleToShow }) {
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
    return (
        <section
            className={`sticky-mobile flex jc-center${!displaySticky && ' hlp-none'}`}
        >
            <div
                className="sticky-mobile-container flex flex-column gap-8 flex-grow-1"
                data-mrf-recirculation="n_sticky"
            >
                <div className="header-sticky">
                    <div className="flex gap-16 ai-center">
                        <div className="flex p-4 rounded-4 bg-la-nacion">
                            <Icon size={12}>
                                <IconSprite name="productLn" fill="#fff" />
                            </Icon>
                        </div>
                        <Text
                            className="--prumo --font-black text-16 flex-grow-1"
                            tag="h3"
                        >
                            {headerText}
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
                                <IconSprite name="close" />
                            </Icon>
                        </Button>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    onClick={() => handleClickForCTRcomponent('open')}
                >
                    <Link
                        href={websiteUrl}
                        title={headlineToUse}
                        className="flex ai-start ml-auto mr-auto gap-8"
                    >
                        <ModPicture
                            src={get(resizedUrls[0], 'resizedUrl', url)}
                            alt={alt || headlineToUse}
                            sources={resizedUrls}
                        />
                        <Text className="arial text-16 --font-regular" tag="h2">
                            {headlineToUse}
                        </Text>
                    </Link>
                </div>
            </div>
        </section>
    );
}

StickyMobile.propTypes = {
    headerText: PropTypes.string,
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
    headerText: '',
    alt: '',
    articleToShow: {}
};

export default StickyMobile;
