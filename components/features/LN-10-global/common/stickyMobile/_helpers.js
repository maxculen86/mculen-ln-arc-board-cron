import get from '../../../../private/common/utils/get';

export const getComboIds = (articles, sep = ' | ') =>
    articles
        .reduce((acc, art) => {
            const artId = get(art, '_id');
            if (artId) acc.push(artId);
            return acc;
        }, [])
        .join(sep);

export const getTitle = a => a?.headlines?.mobile || a?.headlines?.basic || '';

export const getComboTitles = articles => articles.map(getTitle).join(' | ');
