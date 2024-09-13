import cleanHtmlAttributes from '../../../private/common/utils/cleanHtmlAttributes';
import trimIfNotEmpty from '../../../private/common/utils/trimIfNotEmpty';

const Anticipo = ({
    customFields: { hide, title, url, textBadge, lead, video }
}) => {
    if (!title) return null;
    const anticipoUrl = trimIfNotEmpty(url);
    const anticipoVideo = cleanHtmlAttributes(video);
    return {
        information: {
            hideCaja: hide || false,
            title,
            url: anticipoUrl,
            textBadge,
            lead,
            video: anticipoVideo
        }
    };
};

export default Anticipo;
