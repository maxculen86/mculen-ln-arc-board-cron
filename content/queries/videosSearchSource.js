export const lastVideosQuery = () =>
    'sort=publish_date:desc&from=0&size=8&q=type:video';

export const lastVideosBySectionQuery = ({ sectionName, from, size }) => {
    let qryFrom = '',
        qrySize = '';
    if (from != null) qryFrom = `&from=${from}`;
    if (size != null) qrySize = `&size=${size}`;

    return `q=type:videoANDtaxonomy.sections._id="/${sectionName}"&sort=publish_date:desc${qryFrom}${qrySize}`;
};

export const sourceName = 'videosSearchSource';
