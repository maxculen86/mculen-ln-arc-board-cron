import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import get from './utils/get';

const Robot = props => {
    const { subtype, canonicalUrl, arcSite: website, nodeType } = props;

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

    return hasAmpLink && canonicalUrl ? (
        <link
            rel="canonical"
            href={`https://www.lanacion.com.ar${canonicalUrl}`}
        />
    ) : (
        <></>
    );
};

Robot.propTypes = {
    subtype: PropTypes.string.isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired
};

export default Robot;
