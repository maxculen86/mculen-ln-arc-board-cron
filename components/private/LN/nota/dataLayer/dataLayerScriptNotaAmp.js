/* eslint-disable camelcase */
import getAuthorByline from '../../../common/utils/getAuthorByline';
import { Subtypes } from '../../../common/utils/subtypes/subtypeHelper';

const extractDataFromTags = tags => {
    let keywords = [];
    if (tags) {
        keywords = tags.map(tag => tag.description);
    }

    return { keywords };
};

const extracDataFromCredits = by => {
    let authors = [];

    if (by) {
        authors = by
            .filter(v => v.type === 'author')
            .map(author => getAuthorByline(author));
    }
    return { authors: authors.length ? authors : ['Redacción LA NACION'] };
};

const dataLayerScriptNotaAmp = globalContent => {
    const {
        headlines,
        content_restrictions,
        subtype,
        _id,
        first_publish_date: firstPublishDate,
        taxonomy: { primary_section: primarySection, tags },
        credits: { by },
        display_date: displayDate
    } = globalContent || {};
    const valor =
        (content_restrictions && content_restrictions.content_code) || 'comun';
    // TODO: por ahora fijo nota, pero en el futuro debe ser dinamico segun sea home, acu o nota
    const pageType = 'nota';
    const mySubtype = Subtypes.find(sub => sub.id === subtype);
    const { name } = primarySection || {};
    const { authors } = extracDataFromCredits(by);
    const { keywords } = extractDataFromTags(tags);
    const title = (headlines && headlines.basic) || 'LA NACION - Noticia';

    return `
    {
        "vars" : {
            "pagetype": "${pageType}",
            "subtype":"${(mySubtype &&
                mySubtype.nombre &&
                mySubtype.nombre.toLowerCase()) ||
                ''}",
            "articleValue": "${valor}",
            "articleID": "${_id}",
            "articleSection": "${name || ''}",
            "articlePublicationDate": "${new Date(
                firstPublishDate
            ).toUTCString() || ''}",
            "articleAuthor": "${authors.map(author =>
                author.replace(/"/g, '\\"')
            )}",
            "articleTags": "${keywords.map(word => word.replace(/"/g, '\\"'))}",
            "articleTitle": "${title.replace(/"/g, '\\"')}",
            "articleLastUpdate": "${new Date(displayDate).toUTCString() || ''}",
            "credentialType": "N/A",
            "payUser": "no",
            "userRegistered": "no",
            "suscriptorType":"N/A",
            "userLogged":"no",
            "userID": "N/A"
        }
    } 
        `;
};

export default dataLayerScriptNotaAmp;
