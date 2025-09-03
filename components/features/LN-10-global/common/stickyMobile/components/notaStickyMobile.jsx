import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@ln/contenidos-ui-link';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Text } from '@ln/contenidos-ui-text';
import get from '../../../../../private/common/utils/get';

export function NotaStickyMobile({ alt, article }) {
    const {
        promo_items: promoItems = {},
        website_url: websiteUrl = '',
        headlines = {}
    } = article;

    const { basic: { url = '', resized_urls: resizedUrls = [] } = {} } =
        promoItems;

    const { mobile: headlinesMobile = '', basic: headlinesBasic = '' } =
        headlines;

    const headlineToUse = headlinesMobile || headlinesBasic;

    if (!websiteUrl || !headlineToUse || !resizedUrls.length) return null;

    return (
        <Link href={websiteUrl} title={headlineToUse} className="flex gap-8">
            <div className="ratio-1-1" style={{ width: '90px' }}>
                <Adaptableimage
                    src={get(resizedUrls[0], 'resizedUrl', url)}
                    alt={alt || headlineToUse}
                    height={90}
                    width={90}
                />
            </div>
            {headlineToUse && (
                <Text
                    className="arial text-16_110 text-neutral-light-800 text-ellipsis-3 h-52"
                    weight="bold"
                    tag="h2"
                >
                    {headlineToUse}
                </Text>
            )}
        </Link>
    );
}

NotaStickyMobile.propTypes = {
    alt: PropTypes.string,
    article: PropTypes.shape({
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

NotaStickyMobile.defaultProps = {
    alt: '',
    article: {}
};

export default NotaStickyMobile;
