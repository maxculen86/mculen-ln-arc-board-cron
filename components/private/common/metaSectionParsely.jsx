import React from 'react';
import PropTypes from 'prop-types';
import CapitalizeFIrstLetter from '../common/utils/capitalizeFirstLetter';
import { VIDEO } from './utils/subtypes/subtypeHelper';

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

const MetaSectionParsely = ({ arcSite, taxonomy, subtype }) => {
    if (arcSite !== 'la-nacion-ar' || !taxonomy) return <></>;
    const content = getContent(
        taxonomy.primary_section._id || taxonomy.sections[0]._id
    );

    return subtype === VIDEO ? (
        <>
            <meta name="parsely-section" content={content} />
            <meta name="parsely-type" content="post" />
        </>
    ) : (
        <meta name="parsely-section" content={content} />
    );
};

MetaSectionParsely.propTypes = {
    arcSite: PropTypes.string.isRequired,
    taxonomy: PropTypes.shape({
        primary_section: PropTypes.shape({
            _id: PropTypes.string
        }),
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string
            })
        )
    }).isRequired,
    subtype: PropTypes.number.isRequired
};

export default MetaSectionParsely;
