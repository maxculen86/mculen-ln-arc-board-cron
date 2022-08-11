/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import SnippetRender from '../../../common/snippet/snippetRender';
import get from '../../../common/utils/get';

const SnippetWiki = () => {
    const props = get(useAppContext(), 'globalContent', {});
    const { wikiSourceData = {} } = props;
    const { schemas_info: schemasInfo = {}, image = {}, type } =
        wikiSourceData || {};
    const { resizedUrls = [] } = image;

    const { resizedUrl } = resizedUrls.find(e => e.option.width === 320) || {};

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
        ...(givenName && { givenName }),
        ...(additionalName && { additionalName }),
        ...(familyName && { familyName }),
        ...(jobTitle && { jobTitle }),
        ...(location && { location }),
        ...(address && { address }),
        ...(birthDate && { birthDate }),
        ...(birthPlace && { birthPlace }),
        ...(legalName && { legalName }),
        ...(foundingLocation && { foundingLocation }),
        ...(foundingDate && { foundingDate }),
        ...(resizedUrl && { image: resizedUrl })
    };
    return <SnippetRender data={data} />;
};

export default SnippetWiki;
