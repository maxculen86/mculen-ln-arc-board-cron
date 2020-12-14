import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import withStatic from '../../private/common/hocs/withStatic';
import ComPartner from '../../private/common/com-partner';

const FirmaLogoExterno = ({ globalContent: { distributor } }) => {
    const { name } = distributor || {};
    if (name === 'LA NACION') return <></>;
    return <ComPartner size="--xs">{name}</ComPartner>;
};

FirmaLogoExterno.propTypes = {
    globalContent: PropTypes.shape({
        distributor: PropTypes.shape({
            name: PropTypes.string,
            category: PropTypes.string
        })
    }).isRequired
};

FirmaLogoExterno.label = 'LN-Nota-FirmaLogoExterno';

export default withStatic(Context(FirmaLogoExterno));
