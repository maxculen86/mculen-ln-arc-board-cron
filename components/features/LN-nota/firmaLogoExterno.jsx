/* eslint-disable react/require-default-props */
import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import withStatic from '../../private/common/hocs/withStatic';
import ComPartner from '../../private/common/com-partner';
import ComLink from '../../private/common/com-link';
import formatDistributorName from '../../private/LN/common/utils/formatDistributorName';
import {
    HTMLLIBRE,
    RECETA
} from '../../private/common/utils/subtypes/subtypeHelper';

const FirmaLogoExterno = props => {
    const { globalContent } = props;
    const {
        distributor = { name: 'LA NACION' },
        subtype,
        credits,
        withFirmaDistributor
    } = globalContent || {};
    const { name } = distributor;
    const { by = [] } = credits || {};

    if (name === 'LA NACION' && by.length > 0) return <></>;
    if (subtype === RECETA && by.length === 0)
        return <ComPartner size="--xs">Por LA NACION recetas</ComPartner>;
    if (subtype === RECETA && by.length > 0) return <></>;
    if (subtype === HTMLLIBRE)
        return <ComPartner size="--xs">{name}</ComPartner>;

    const nameFormated = formatDistributorName(name);
    return !withFirmaDistributor ? (
        <ComLink link={`${SITE_LANACION}/distributor/${nameFormated}/`}>
            <ComPartner size="--twoxs">{name}</ComPartner>
        </ComLink>
    ) : (
        <></>
    );
};

FirmaLogoExterno.propTypes = {
    globalContent: PropTypes.shape({
        distributor: PropTypes.shape({
            name: PropTypes.string,
            category: PropTypes.string
        }),
        credits: PropTypes.shape({
            by: PropTypes.array
        }),
        subtype: PropTypes.string
    }),
    siteProperties: PropTypes.shape({
        host: PropTypes.string.isRequired
    })
};

FirmaLogoExterno.label = 'LN-Nota-FirmaLogoExterno';

export default withStatic(Context(FirmaLogoExterno));
