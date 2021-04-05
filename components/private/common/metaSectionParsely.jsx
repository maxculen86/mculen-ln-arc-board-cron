import React from 'react';
import PropTypes from 'fusion:prop-types';
import CapitalizeFIrstLetter from '../common/utils/capitalizeFirstLetter';

const validateCampo = _id =>
    _id.includes('/economia/campo') ? 'Campo' : false;

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

const MetaSectionParsely = ({ arcSite, _id = '', taxonomy = '' }) => {
    if (arcSite !== 'la-nacion-ar' || !_id) return <></>;

    const content = getContent(taxonomy ? taxonomy.primary_section._id : _id);

    return <meta name="parsely-section" content={content} />;
};

MetaSectionParsely.propTypes = {
    _id: PropTypes.string.isRequired,
    taxonomy: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

MetaSectionParsely.defaultProps = {
    _id: '',
    taxonomy: ''
};

export default MetaSectionParsely;
