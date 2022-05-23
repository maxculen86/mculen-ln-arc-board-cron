/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import SnippetRender from '../../../common/snippet/snippetRender';
import get from '../../../common/utils/get';

const SnippetWiki = () => {
    const props = get(useAppContext(), 'globalContent', {});
    const slug = get(useAppContext(), 'globalContentConfig.query.slug', '');
    const { isWiki } = props;
    const wikiSourceData = useContent({
        source: isWiki ? 'wikiTagSource' : null,
        query: {
            slug,
            imageConfig: 'wikiTag'
        }
    });
    const { schemas_info: schemasInfo = {}, image = {}, type } =
        wikiSourceData || {};

    const {
        additional_name: additionalName,
        family_name: familyName,
        given_name: givenName,
        location,
        address,
        birth_date: birthDate,
        birth_place: birthPlace,
        job_title: jobTitle,
        legal_name: legalName,
        founding_location: foundingLocation,
        founding_date: foundingDate
    } = schemasInfo;

    const data = {
        '@context': 'https://schema.org',
        '@type': type === 1 ? 'Person' : 'Organization',
        givenName,
        additionalName,
        familyName,
        jobTitle,
        location,
        address,
        birthDate,
        birthPlace,
        legalName,
        foundingLocation,
        foundingDate,
        image: image.url
    };
    return <SnippetRender data={data} />;
};

export default SnippetWiki;

SnippetWiki.propTypes = {
    isWiki: PropTypes.string
};
