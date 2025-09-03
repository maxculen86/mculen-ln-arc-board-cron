import React from 'react';
import { getMediaData } from '../../../private/LN/common/utils/mediaHelper';
import dateAndTimeUtil, {
    isOlderThanXHoursAgo
} from '../../../private/common/utils/dateAndTimeUtil';
import epigrafeAndCreditsData from '../../../private/common/utils/epigrafeAndCreditsData';

export const getEpigrafe = (basic, dataIframe) => {
    if (!basic) return { caption: null, credit: null };

    function Caption(text) {
        return <span className="com-text --caption --twoxs">{text}</span>;
    }

    function Credit(text) {
        return <span className="com-text --credit --twoxs">{text}</span>;
    }

    const { type, caption, embed, subtype } = basic;

    const renderByMediaType = {
        image: () => {
            const imageCredit = epigrafeAndCreditsData(basic);
            return {
                caption: caption ? Caption(caption) : null,
                credit: imageCredit ? Credit(imageCredit) : null
            };
        },

        raw_html: () => {
            if (!dataIframe) return { caption: null, credit: null };

            const iframeCredit = epigrafeAndCreditsData(dataIframe);
            return {
                caption: dataIframe.caption
                    ? Caption(dataIframe.caption)
                    : null,
                credit: iframeCredit ? Credit(iframeCredit) : null
            };
        },

        video_jw: () => {
            const videoCaption = embed?.config?.videoJw?.epigraphTitle;
            return {
                caption: videoCaption ? Caption(videoCaption) : null,
                credit: null
            };
        }
    };

    const mediaKey = subtype === 'video_jw' ? 'video_jw' : type;
    const renderFn = renderByMediaType[mediaKey];
    return renderFn ? renderFn() : { caption: null, credit: null };
};

export const getLiveBlogEditorialDataApertura = (globalContent = {}) => {
    const {
        headlines: { basic = '' } = {},
        display_date: displayDate,
        promo_items: promoItems = {},
        subheadlines: { basic: subheadline = '' } = {}
    } = globalContent;

    const coverageEndTime = !isOlderThanXHoursAgo(displayDate, 12);
    const { date, time } = dateAndTimeUtil(displayDate);

    const mediaData = getMediaData(promoItems);
    const { caption, credit } = getEpigrafe(mediaData, promoItems.basic);

    const epigraph = { caption, credit };

    const dataDescripcion = {
        title: basic,
        badge: coverageEndTime,
        subheadline
    };

    const isAIframe = mediaData?.type === 'raw_html';
    const dataMedia = {
        mediaData,
        ...(!isAIframe ? epigraph : {})
    };

    const dataDateTime = {
        date,
        time
    };

    return {
        dataDescripcion,
        dataMedia,
        dataEpigraph: epigraph,
        dataDateTime
    };
};
