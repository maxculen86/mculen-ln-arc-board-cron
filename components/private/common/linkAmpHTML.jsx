import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import get from './utils/get';
import { GlobalContext } from './context/globalContext';

const LinkAmpHTML = props => {
    const { subtype, canonicalUrl, arcSite: website, nodeType } = props;
    const gc = useContext(GlobalContext);

    console.log(gc);

    const data = useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website
        },
        transform: resp => {
            return get(resp, 'site.with-amp', {});
        }
    });

    const hasAmpLink = get(data, subtype || nodeType || '', undefined);

    const slash = canonicalUrl && canonicalUrl.slice(-1) !== '/' ? '/' : '';

    return hasAmpLink && canonicalUrl ? (
        <link
            rel="amphtml"
            href={`https://www.lanacion.com.ar${canonicalUrl}${slash}?outputType=amp`}
        />
    ) : (
        <></>
    );
};

LinkAmpHTML.propTypes = {
    subtype: PropTypes.string.isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired
};

export default LinkAmpHTML;
