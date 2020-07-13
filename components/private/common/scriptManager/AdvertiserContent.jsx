/* eslint-disable react/require-default-props */
/* eslint-disable react/no-danger             */

import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

import get from 'lodash.get';
import getAssetsPath from '../utils/getAssetsPath';

const getFirstParagraph = contentElements =>
    contentElements.some(contentElement => contentElement.type === 'text')
        ? contentElements.find(contentElement => contentElement.type === 'text')
              .content
        : null;

const getImage = promoItems => {
    if (!promoItems) return null;
    const { basic = {} } = promoItems;
    return (basic.type === 'image' && basic.url) || null;
};

const AdvertiserContent = props => {
    const {
        siteProperties: { host },
        globalContent: {
            type,
            headlines,
            content_elements: contentElements,
            created_date: datePublished,
            last_updated_date: dateModified,
            website_url: websiteURL,
            owner
        },
        contextPath,
        deployment
    } = props;

    const promoItems = get(props, 'globalContent.promo_items');

    if (type !== 'story') return null;
    if (!getFirstParagraph(contentElements)) return null;
    if (!get(owner, 'sponsored')) return null;

    const LOGO_AMP = getAssetsPath(contextPath)(deployment)('logo-ln-amp.png');

    const script = {
        '@context': 'http://schema.org',
        url: host,
        name: get(headlines, 'basic'),
        headline: get(headlines, 'basic'),
        articleBody: getFirstParagraph(contentElements),
        datePublished,
        dateModified,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${host}`.concat(websiteURL)
        },
        '@type': 'AdvertiserContentArticle',
        image: {
            '@type': 'ImageObject',
            url: getImage(promoItems) || `${LOGO_AMP}`,
            width: 700,
            height: 420
        },
        publisher: {
            '@type': 'NewsMediaOrganization',
            name: 'LA NACION',
            logo: {
                '@type': 'ImageObject',
                url: `${LOGO_AMP}`
            }
        }
    };

    return (
        <script
            id="advertiser-content-article"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(script)
            }}
        />
    );
};

AdvertiserContent.propTypes = {
    siteProperties: PropTypes.shape.isRequired,
    globalContent: PropTypes.shape({
        type: PropTypes.string,
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        content_elements: PropTypes.shape.isRequired,
        promo_items: PropTypes.shape,
        created_date: PropTypes.string,
        last_updated_date: PropTypes.string,
        owner: PropTypes.shape({
            sponsored: PropTypes.bool
        }),
        website_url: PropTypes.string
    }),
    deployment: PropTypes.func.isRequired,
    contextPath: PropTypes.string.isRequired
};

export default Consumer(AdvertiserContent);
