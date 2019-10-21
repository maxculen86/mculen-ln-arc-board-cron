import React from 'react';
import PropTypes from 'fusion:prop-types';
import CabezalRevistaComponent from '../../private/LN/acumulado/cabezalRevista';

const mapLink = (text, url) => {
    return { text, url };
};

const CabezalRevista = ({
    customFields: {
        textLink1,
        urlLink1,
        textLink2,
        urlLink2,
        textLink3,
        urlLink3,
        textLink4,
        urlLink4,
        textLink5,
        urlLink5
    }
}) => {
    const links = [];
    links.push(mapLink(textLink1, urlLink1));
    links.push(mapLink(textLink2, urlLink2));
    links.push(mapLink(textLink3, urlLink3));
    links.push(mapLink(textLink4, urlLink4));
    links.push(mapLink(textLink5, urlLink5));
    return <CabezalRevistaComponent links={links} />;
};

CabezalRevista.propTypes = {
    customFields: PropTypes.shape({
        textLink1: PropTypes.string.tag({ label: 'Texto Link 1' }),
        urlLink1: PropTypes.string.tag({ label: 'Url Link 1' }),
        textLink2: PropTypes.string.tag({ label: 'Texto Link 2' }),
        urlLink2: PropTypes.string.tag({ label: 'Url Link 2' }),
        textLink3: PropTypes.string.tag({ label: 'Texto Link  3' }),
        urlLink3: PropTypes.string.tag({ label: 'Url Link 3' }),
        textLink4: PropTypes.string.tag({ label: 'Texto Link 4' }),
        urlLink4: PropTypes.string.tag({ label: 'Url Link 4' }),
        textLink5: PropTypes.string.tag({ label: 'Texto Link 5' }),
        urlLink5: PropTypes.string.tag({ label: 'Url Link 5' })
    })
};

CabezalRevista.defaultProps = {
    customFields: {
        links: {}
    }
};

export default CabezalRevista;
