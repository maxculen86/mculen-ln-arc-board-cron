import get from '../../../private/common/utils/get';
import getTooltip from '../../../private/LN/common/utils/getTooltip';
import {
    getSectionLogo,
    dictionaryAlt
} from '../../../private/common/utils/sectionUtils';
import {
    LIVEBLOG,
    VIDEO,
    VIDEO_VERTICAL
} from '../../../private/common/utils/subtypes/subtypeHelper';
import {
    isOlderThanXHoursAgo,
    getFormattedStringDate,
    getUpdateDateMoreYears
} from '../../../private/common/utils/dateAndTimeUtil';
import { isEmptyString } from '../../../private/common/utils/dataValidation';
import transformISODate from '../../../private/common/utils/transformISODate';
import {
    calcReadingMinutes,
    countWords,
    isExcludedSubtype
} from '../../../features/LN-10-global/common/readingTime/_helpers';
import { getClassNameByLayout } from '../../../private/common/utils/modDateHelper';
import { getMediaData } from '../../_helpers/mediaHelper';
import { getVerticalPlayer } from '../../../private/common/videoPlayerJw/utils/helperJw';

export const getVideoOpeningTitleData = ({
    globalContent,
    layout,
    siteService,
    prefix
}) => {
    const {
        taxonomy: { sections = [] } = {},
        distributor = { name: 'LA NACION' },
        owner = {},
        label = {},
        headlines = {},
        subtype = '',
        display_date: displayDate = ''
    } = globalContent || {};

    const sponsored = owner?.sponsored || false;
    const advertiser = label?.marca_anunciante?.text || null;

    let keyTooltip = '';
    if (sponsored) keyTooltip = 'Espacio Patrocinado';
    if (advertiser) keyTooltip = 'Content LAB';

    const tooltip = getTooltip(keyTooltip, siteService);
    const coverageEndTime = !isOlderThanXHoursAgo(displayDate, 12);

    const sectionData = getSectionLogo(sections, layout, distributor?.name);
    const { path, logoName, color, isExternal } = sectionData || {};
    const altLogo = dictionaryAlt[logoName] || logoName;
    const sponsor = !color && logoName ? `${logoName}-blanco` : logoName;

    return {
        sponsorData: {
            path,
            logoName,
            sponsor,
            altLogo,
            isExternal,
            tooltip,
            advertiser,
            sponsored
        },
        showLiveBadge: subtype === LIVEBLOG && coverageEndTime,
        titleProps: {
            prefixText: prefix ? `${prefix} ` : '',
            content: headlines.basic || '',
            size: subtype === VIDEO ? '--fourxl' : '--sixxl'
        }
    };
};

export const getVideoOpeningSubtitleData = ({ globalContent }) => {
    const {
        subheadlines: { basic: basicSubHeadline = '' } = {},
        subtype = '',
        display_date: displayDate = '',
        content_restrictions: { content_code: contentCode } = {}
    } = globalContent || {};

    const subtitleVideo = !isEmptyString(basicSubHeadline)
        ? basicSubHeadline
        : `Video publicado por LA NACION el ${transformISODate(displayDate)}.`;

    return {
        text: subtype === VIDEO ? subtitleVideo : basicSubHeadline || null,
        badgeForSubscribers: contentCode === 'cerrada',
        badgeType: subtype === VIDEO ? 'subscriberNegative' : 'subscriber'
    };
};

export const getVideoOpeningDateData = ({ globalContent, layout }) => {
    const {
        display_date: displayDate = '',
        credits = {},
        label = {},
        first_publish_date: firstPublishDate = '',
        last_updated_date: lastUpdatedDate = '',
        subheadlines: { basic: basicSubHeadline = '' } = {},
        headlines: { basic: basicHeadline = '' } = {},
        planning: {
            story_length: { word_count_actual: bodyWordCount = '' } = {}
        } = {},
        subtype = ''
    } = globalContent || {};

    const { edicion: labelEdicionImpresa } = label || {};
    const hasAuthors =
        Array.isArray(credits.by) &&
        credits.by.some(author => author.type === 'author');
    const shouldRenderDate = hasAuthors || Boolean(displayDate);

    const lastUpdatedResult = getUpdateDateMoreYears(
        firstPublishDate,
        lastUpdatedDate
    );
    const dateFormattedUpdate = getFormattedStringDate(lastUpdatedResult);

    const totalWordCount =
        countWords(basicSubHeadline) +
        countWords(basicHeadline) +
        (Number.isFinite(bodyWordCount)
            ? bodyWordCount
            : Number(bodyWordCount) || 0);

    const readingMinutes = calcReadingMinutes(totalWordCount);
    const hasReadingTime = readingMinutes !== 0 && !isExcludedSubtype(subtype);

    return {
        shouldRenderDate,
        modDateProps: {
            display_date: displayDate,
            labelEdicionImpresa,
            first_publish_date: firstPublishDate,
            last_updated_date: lastUpdatedDate
        },
        layoutClass: getClassNameByLayout({ layout }),
        lastUpdateLabel: dateFormattedUpdate
            ? `Actualizado el ${dateFormattedUpdate}`
            : '',
        readingTime: hasReadingTime
            ? {
                  minutes: readingMinutes.toString(),
                  label: readingMinutes === 1 ? 'minuto' : 'minutos'
              }
            : null
    };
};

export const getVideoOpeningShareData = ({ globalContent, layout }) => {
    const {
        _id: articleId,
        headlines: {
            basic: basicHeadline = '',
            mobile: mobileHeadline = ''
        } = {},
        subtype = '',
        promo_items: { summary = '', glossary = '' } = {},
        comments: { display_comments: displayComments = true } = {}
    } = globalContent || {};

    return {
        articleId,
        basicHeadline,
        mobileHeadline,
        summary,
        glossary,
        subtype,
        layout,
        displayComments
    };
};

export const getNotaVideoOpeningData = (promoItems, subtype) => {
    const mediaData = getMediaData(promoItems);
    const playerId = get(mediaData, 'embed.config.idPlayer', '');
    const variant =
        subtype === VIDEO_VERTICAL && getVerticalPlayer(playerId)
            ? 'vertical'
            : 'horizontal';

    return { mediaData, variant };
};
