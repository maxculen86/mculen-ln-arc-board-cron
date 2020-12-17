/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';

const extractLanguajes = languages => {
    const lang = languages.split(',');
    if (lang[0] === '') return [];

    return lang.map(lan => {
        return { '@type': 'Language', name: lan.trim() };
    });
};

const SnippetAutor = props => {
    const {
        globalContent: {
            byline = '',
            email = '',
            author_type: authorType = '',
            role,
            longBio = '',
            location = '',
            image: { url },
            books = [],
            podcasts = [],
            education = [],
            awards = [],
            personal_website: personalWebsite,
            languages = '',
            affiliations = ''
        }
    } = props || {};

    const awardsFormated = awards.map(aw => aw.name);
    const languajesFormated = extractLanguajes(languages);
    // const affiliationsFormated = affiliations

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
        knowsAbout: [
            'National Security',
            'Transgender issues',
            {
                '@type': 'Place',
                name: 'Charleston, West Virginia, USA'
            }
        ],
        knowsLanguage: languajesFormated,
        sameAs: [
            'https://twitter.com/maggieNYT',
            'https://www.nytimes.com/by/maggie-haberman'
        ],
        jobTitle: 'Reporter',
        affiliation: [
            {
                '@type': 'Organization',
                name: 'Investigative Reporters and Editors',
                url: 'http://ire.org'
            },
            {
                '@type': 'Organization',
                name: 'Society of Environmental Journalists',
                url: 'http://www.sej.org/'
            }
        ],
        award: awardsFormated
    };

    return <SnippetRender id="Schema_NewsArticle" data={data} />;
};

SnippetAutor.propTypes = {
    globalContent: PropTypes.shape({
        byline: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string,
        longBio: PropTypes.string,
        image: PropTypes.shape({
            url: PropTypes.string
        }),
        books: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                publisher: PropTypes.string,
                url: PropTypes.string
            })
        ),
        podcasts: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                url: PropTypes.string
            })
        ),
        education: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        awards: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        personal_website: PropTypes.string,
        languages: PropTypes.string,
        affiliations: PropTypes.string,
        location: PropTypes.string
    }).isRequired
};

export default SnippetAutor;
