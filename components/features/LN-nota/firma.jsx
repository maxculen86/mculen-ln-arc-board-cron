/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import StaticValidation from '../../private/common/staticValidation';

import ModAutor from '../../private/common/mod-autor';
import ComPartner from '../../private/common/com-partner';
import ComLink from '../../private/common/com-link';
import {
    place,
    filterByAuthor,
    getPropsBuilder,
    getPropsBuilderFromContentElements
} from '../../private/common/utils/firmaHelper';
import { compose } from '../../private/common/utils/functional';
import formatDistributorName from '../../private/LN/common/utils/formatDistributorName';

const FirmaFeature = props => {
    const {
        id: featureId,
        outputType,
        customFields: { position },
        globalContent: {
            content_elements: contentElements,
            credits: { by },
            distributor = { name: 'LA NACION' },
            withFirmaDistributor
        }
    } = props;
    const { name } = distributor;
    const constructProps =
        by && by.length
            ? getPropsBuilder(position)
            : getPropsBuilderFromContentElements(position);

    const { photo, medio, authors } =
        by && by.length
            ? compose(constructProps, filterByAuthor)(by)
            : compose(constructProps)(contentElements);

    const firmaDistributorHtml = nombre =>
        nombre === 'LA NACION' ? (
            <ComPartner size="--xs">{nombre}</ComPartner>
        ) : (
            <ComLink
                link={`${SITE_LANACION}/distributor/${formatDistributorName(
                    nombre
                )}/`}
            >
                <ComPartner size="--twoxs">{nombre}</ComPartner>
            </ComLink>
        );

    const content = withFirmaDistributor ? (
        firmaDistributorHtml(name)
    ) : (
        <div className="row FirmaAutor">
            <div className="col-12">
                <ModAutor
                    autor={authors}
                    foto={photo}
                    classCondition="--autor"
                    medio={medio}
                    amp={outputType === 'amp'}
                />
            </div>
        </div>
    );

    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            {content}
        </StaticValidation>
    );
};

FirmaFeature.propTypes = {
    id: PropTypes.string,
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        position: PropTypes.oneOf([place.Top, place.Bottom]).tag({
            label: 'Ubicacion'
        })
    }),
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                type: PropTypes.string,
                additional_properties: PropTypes.shape({
                    nodeType: PropTypes.string
                }),
                content: PropTypes.string
            })
        ),
        credits: PropTypes.shape({
            by: PropTypes.arrayOf(
                PropTypes.shape({
                    image: PropTypes.shape({
                        url: PropTypes.string
                    }),
                    byline: PropTypes.string,
                    name: PropTypes.string,
                    slug: PropTypes.string,
                    type: PropTypes.string,
                    _id: PropTypes.string
                })
            )
        }),
        distributor: PropTypes.shape({
            name: PropTypes.string
        }),
        withFirmaDistributor: PropTypes.bool
    })
};

FirmaFeature.label = 'LN-Nota-Firma';

export default Context(FirmaFeature);
