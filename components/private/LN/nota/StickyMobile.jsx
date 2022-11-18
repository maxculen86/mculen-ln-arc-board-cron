/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../../resources/dist/css/ln/components/sticky-mobile.css';
import Text from '../../common/text';
import Icon from '../../common/icon';
import ComLink from '../../common/com-link';
import ModPicture from '../../common/mod-picture';
import {
    crtViewTracker,
    handleClickForCTRcomponent
} from '../../common/utils/noteTracker/ctrTracker';

const StickyMobile = ({ headerText, alt, articleToShow }) => {
    const {
        promo_items: promoItems = {},
        website_url: websiteUrl = '',
        headlines = {}
    } = articleToShow;

    const {
        basic: { url = '', resized_urls: resizedUrls = [] } = {}
    } = promoItems;

    const {
        mobile: headlinesMobile = '',
        basic: headlinesBasic = ''
    } = headlines;

    const headlineToUse = headlinesMobile || headlinesBasic;
    const [displaySticky, setDisplaySticky] = useState(true);

    return (
        <section className={`sticky-mobile ${!displaySticky && 'hlp-none'}`}>
            <div className="header-sticky">
                <Text font="arial" size="2xs" weight="bold" tag="h3">
                    {headerText}
                </Text>
                <div
                    onClick={() => {
                        setDisplaySticky(false);
                        handleClickForCTRcomponent('close', articleToShow);
                    }}
                    aria-hidden="true"
                >
                    <Icon name="close" size="--xs" />
                </div>
            </div>
            <div
                aria-hidden="true"
                onClick={() =>
                    handleClickForCTRcomponent('open', articleToShow)
                }
            >
                <ComLink link="#" title={headlineToUse}>
                    <ModPicture
                        src={url}
                        alt={alt || headlineToUse}
                        sources={resizedUrls}
                    />
                    <Text font="sueca" size="2xs" weight="regular" tag="h2">
                        {headlineToUse}
                    </Text>
                </ComLink>
            </div>
            {crtViewTracker(articleToShow)}
        </section>
    );
};

StickyMobile.propTypes = {
    headerText: PropTypes.string,
    alt: PropTypes.string,
    articleToShow: PropTypes.shape({
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({
                url: PropTypes.string,
                resized_urls: PropTypes.array
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
