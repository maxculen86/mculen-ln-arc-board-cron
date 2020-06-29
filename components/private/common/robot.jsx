import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import get from './utils/get';

const Robot = props => {
    const { subtype, canonicalUrl, arcSite: website } = props;
    const data = useContent({
        sourceName: 'navigationTreeSource',
        query: {
            website
        }
    });

    const hasAmpLink = get(
        data && data.site && data.site['with-amp'] ? data.site['with-amp'] : {},
        subtype || '',
        undefined
    );

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
    arcSite: PropTypes.string.isRequired
};

export default Robot;
