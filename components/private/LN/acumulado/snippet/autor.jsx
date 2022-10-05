/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';
import {
    formatForObjectArray,
    stringToArray,
    formatForOneElementArray,
    extractAffilations,
    getBooksAndPodcasts
} from './helpers/snippetAuthorHelper';

const SnippetAutor = ({ globalContent = {} }) => {
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
        image: { url },
        awards = [],
        languages = '',
        expertise = '',
        podcasts = []
    } = globalContent;

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
        ...(byline && { name: byline }),
        ...(location && { birthPlace: location }),
        ...(bioPage && { url: `http://www.lanacion.com.ar${bioPage}` }),
        ...(url && { image: url }),
        ...(longBio && { description: longBio }),
        ...(bio && { disambiguatingDescription: bio }),
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
        contactPoint: {
            '@type': 'ContactPoint',
            ...(byline && role && { contactType: `${byline}: ${role}` }),
            ...(email && { email }),
            ...(bioPage && { url: `http://www.lanacion.com.ar${bioPage}` })
        },
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
};

SnippetAutor.propTypes = {
    globalContent: PropTypes.shape({
        byline: PropTypes.string,
        email: PropTypes.string,
        longBio: PropTypes.string,
        image: PropTypes.shape({
            url: PropTypes.string
        }),
        awards: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        languages: PropTypes.string,
        location: PropTypes.string
    }).isRequired
};

export default SnippetAutor;
