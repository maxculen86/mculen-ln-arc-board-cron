import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import SnippetRender from '../../../common/snippet/snippetRender';
import getAssetsPath from '../../../common/utils/getAssetsPath';
import { addHours } from '../../../common/utils/dateAndTimeUtil';
import {
    extractDataFromPromoItems,
    urlSchema
} from '../../common/utils/extractDataFromPromoItems';
import addRelatedImage from '../../common/utils/addRelatedImage';
import {
    generatePostObject,
    generatePostObjectWithoutPowerUp
} from '../../../common/utils/schema/liveBlog/generatePostObject';
import getFirstParagraph from '../../../common/utils/getFirstParagraph';
import get from '../../../common/utils/get';
import getOrganizationId from '../../../common/utils/getOrganizationId';
import { addForwardSlash } from '../../common/utils/addForwardSlash';
import { useLiveblogAuthors } from '../../../../layouts/LN-Nota-Liveblog_Editorial/components/body/authorBox/hook/useLiveblogAuthors';
import { getLiveblogLocation } from './helpers/getLiveblogLocation';

function SnippetLiveblog(props) {
    const { siteProperties, globalContent, contextPath, deployment } = props;

    const {
        canonical_url: canonicalUrl,
        headlines,
        content_elements: contentElements,
        subheadlines,
        first_publish_date: firstPublishDate,
        display_date: displayDate
    } = globalContent || {};

    const { promo_items: promoItems } = addRelatedImage(globalContent);

    const PLACEHOLDER = getAssetsPath(contextPath)(deployment)(
        'placeholderLN-600x60.jpg'
    );

    const checkForLiveBlogElements = contentElements.findIndex(elem => {
        const { subtype = 'default', type = '' } = elem;
        return type === 'custom_embed' && subtype === 'custom-liveblog';
    });

    const { image } = extractDataFromPromoItems(promoItems, PLACEHOLDER);

    const schemaHost = get(siteProperties, 'host', SITE_LANACION).replace(
        /\/+$/,
        ''
    );
    const schemaHostWithSlash = addForwardSlash(schemaHost);
    const url = `${schemaHost}${canonicalUrl || ''}`;
    const blogObjects =
        checkForLiveBlogElements === -1
            ? generatePostObjectWithoutPowerUp(globalContent, url, PLACEHOLDER)
            : generatePostObject(globalContent, url, PLACEHOLDER);

    const converageStart = new Date(firstPublishDate);
    const coverageEnd = addHours(12, displayDate);
    const noteTitle =
        headlines &&
        `${headlines.meta_title || headlines.basic || 'LA NACION - Noticia'}`;

    const noteDescription =
        (subheadlines && subheadlines.basic) ||
        getFirstParagraph(contentElements);

    const { authors, shouldShow } = useLiveblogAuthors();

    const authorsArray = shouldShow ? authors : [];
    const liveblogLocation = getLiveblogLocation(globalContent);

    const data = {
        '@context': urlSchema,
        '@type': 'LiveBlogPosting',
        publisher: {
            '@id': getOrganizationId(siteProperties)
        },
        ...(authorsArray.length > 0 && {
            author: authorsArray.map(author => ({
                '@type': 'Person',
                name: author.name
            }))
        }),
        about: {
            '@type': 'Event',
            name: noteTitle,
            startDate: converageStart,
            endDate: coverageEnd,
            ...(liveblogLocation && {
                location: {
                    '@type': 'Place',
                    name: 'LA NACION',
                    address: {
                        '@type': 'PostalAddress',
                        ...liveblogLocation
                    }
                }
            }),
            organizer: {
                '@type': 'Organization',
                name: 'La Nación',
                url: schemaHostWithSlash
            },
            performer: {
                '@type': 'Organization',
                name: 'La Nación',
                url: schemaHostWithSlash
            },
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
            description: noteDescription,
            image
        },
        url,
        '@id': '#liveBlogPosting',
        description: noteDescription,
        coverageStartTime: converageStart,
        coverageEndTime: coverageEnd,
        headline: noteTitle,
        liveBlogUpdate: blogObjects
    };

    return <SnippetRender id="Schema_LiveBlog" data={data} />;
}

export default SnippetLiveblog;
