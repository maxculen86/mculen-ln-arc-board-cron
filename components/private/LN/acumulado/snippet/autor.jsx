/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';

const extractLanguajes = languages => {
    const lang = languages.split(',');
    if (lang[0] === '') return [];

    return lang.map(lan => {
        return { '@type': 'Language', name: lan.trim() };
    });
};

const extractAreasExpertise = (expertise, location) => {
    const experts = expertise.split(',');
    if (experts[0] === '') return [];

    experts.push({
        '@type': 'Place',
        name: location
    });

    return experts;
};

const SnippetAutor = ({ globalContent = {} }) => {
    const {
        byline = '',
        email = '',
        author_type: authorType = '',
        longBio = '',
        location = '',
        image: { url },
        awards = [],
        languages = '',
        expertise = ''
    } = globalContent;

    const awardsFormated = awards.map(aw => aw.name);
    const languajesFormated = extractLanguajes(languages);
    const knowsAbout = extractAreasExpertise(expertise, location);
    const sameAs = getSocialsNetwork(globalContent);

    const data = {
        '@context': 'http://schema.org',
        '@type': 'Person',
        name: byline,
        image: url,
        workLocation: {
            '@type': 'Place',
            name: location
        },
        description: longBio,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '',
            contactType: authorType,
            email
        },
        knowsAbout,
        knowsLanguage: languajesFormated,
        sameAs,
        jobTitle: authorType,
        award: awardsFormated
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
