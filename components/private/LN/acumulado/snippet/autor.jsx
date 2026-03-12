/* eslint-disable react/no-danger */
import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import SnippetRender from '../../../common/snippet/snippetRender';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';
import {
    formatForObjectArray,
    stringToArray,
    formatForOneElementArray,
    extractAffilations,
    getBooksAndPodcasts,
    authorBasicInfo
} from './helpers/snippetAuthorHelper';

function SnippetAutor({ globalContent = {} }) {
    const {
        affiliations = '',
        byline = '',
        email = '',
        bio_page: bioPage = '',
        bio = '',
        education = [],
        books = [],
        role,
        longBio = '',
        location = '',
        image = {},
        awards = [],
        languages = '',
        expertise = '',
        podcasts = []
    } = globalContent;

    const { url = '' } = image;
    const awardsFormated = formatForObjectArray(awards);
    const educationFormated = formatForObjectArray(education);
    const languajesFormated = stringToArray(languages);
    const knowsAbout = stringToArray(expertise);
    const sameAs = getSocialsNetwork(globalContent);
    const affilationsFormated = extractAffilations(affiliations);
    const booksAndPodcasts = getBooksAndPodcasts(books, podcasts);

    const data = {
        '@context': 'http://schema.org',
        '@type': 'Person',
        ...authorBasicInfo(byline, location, bioPage, url, longBio, bio),
        ...(knowsAbout && { knowsAbout: formatForOneElementArray(knowsAbout) }),
        ...(languajesFormated && {
            knowsLanguage: formatForOneElementArray(languajesFormated)
        }),
        ...(location && {
            workLocation: location
        }),
        ...(byline && role && { jobTitle: `${byline}: ${role}` }),
        ...(educationFormated && {
            alumniOf: formatForOneElementArray(educationFormated)
        }),
        ...(awardsFormated && {
            award: formatForOneElementArray(awardsFormated)
        }),
        ...(sameAs && { sameAs: formatForOneElementArray(sameAs) }),
        ...(byline &&
            role && {
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: `${byline}: ${role}`,
                    ...(email && { email }),
                    ...(bioPage && {
                        url: `${SITE_LANACION}${bioPage}`
                    })
                }
            }),
        ...(affilationsFormated && {
            affiliation: formatForOneElementArray(affilationsFormated)
        }),
        ...(booksAndPodcasts && {
            owns: {
                '@type': 'ItemList',
                itemListElement: formatForOneElementArray(booksAndPodcasts)
            }
        })
    };

    return <SnippetRender data={data} />;
}

export default SnippetAutor;
