/* eslint-disable react/require-default-props */
import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import ComPartner from '../../private/common/com-partner';
import ComLink from '../../private/common/com-link';
import formatDistributorName from '../../private/LN/common/utils/formatDistributorName';
import StaticValidation from '../../private/common/staticValidation';
import {
    HTMLLIBRE,
    RECETA
} from '../../private/common/utils/subtypes/subtypeHelper';

const FirmaLogoExterno = props => {
    const { id: featureId, globalContent } = props;
    const {
        distributor = { name: 'LA NACION' },
        subtype,
        credits,
        withFirmaDistributor
    } = globalContent || {};
    const { name } = distributor;
    const { by = [] } = credits || {};

    let content = <></>;

    const nameFormated = formatDistributorName(name);
    if (!withFirmaDistributor)
        content = (
            <ComLink link={`${SITE_LANACION}/distributor/${nameFormated}/`}>
                <ComPartner size="--twoxs">{name}</ComPartner>
            </ComLink>
        );
    if (name === 'LA NACION' && by.length > 0) content = <></>;
    if (subtype === RECETA && by.length === 0)
        content = <ComPartner size="--xs">Por LA NACION recetas</ComPartner>;
    if (subtype === RECETA && by.length > 0) content = <></>;
    if (subtype === HTMLLIBRE)
        content = <ComPartner size="--xs">{name}</ComPartner>;

    return <StaticValidation id={featureId}>{content}</StaticValidation>;
};

FirmaLogoExterno.propTypes = {
    id: PropTypes.string.isRequired,
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

export default Context(FirmaLogoExterno);
