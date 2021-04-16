import React from 'react';
import PropTypes from 'fusion:prop-types';
import CapitalizeFIrstLetter from '../common/utils/capitalizeFirstLetter';

const validateCampo = id => (id.includes('/economia/campo') ? 'Campo' : false);

const getContent = id => {
    const isCampo = validateCampo(id);

    return isCampo
        ? isCampo
        : CapitalizeFIrstLetter(
              id
                  .slice(1, id.length)
                  .replace(/[\/]/g, '|')
                  .split('|')[0]
          );
};

const MetaSectionParsely = ({ arcSite, taxonomy }) => {
    if (arcSite !== 'la-nacion-ar' || !taxonomy) return <></>;
    const content = getContent(
        taxonomy.primary_section._id || taxonomy.sections[0]._id
    );

    return <meta name="parsely-section" content={content} />;
};

MetaSectionParsely.propTypes = {
    arcSite: PropTypes.string.isRequired,
    taxonomy: PropTypes.string.object
};

export default MetaSectionParsely;
