import React from 'react';
import PropTypes from 'fusion:prop-types';

import GrillaNotas from '../../private/LN/acumulado/grillaNotas';
import { getSlotsOptions } from '../../private/LN/common/bannerRefactor/config';
// import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';

const groupBannerConfig = props => {
    const optionsSet = Object.keys(props.customFields);

    const numberGroups = optionsSet
        .filter(el => el.startsWith('position'))
        .map(el => el.match(/\d+/g)[0]);

    const config = [];

    numberGroups.forEach(n => {
        const configKeys = optionsSet.filter(
            el =>
                el.match(/\d+/g) &&
                el.match(/\d+/g)[0].length === n.length &&
                el.endsWith(n)
        );
        const configOpt = {};

        configKeys.forEach(ck => {
            configOpt[ck.replace(/\d+/g, '')] = props.customFields[ck];
        });

        config.push(configOpt);
    });

    return config;
};

function buildCustomFieldsForBanners() {
    const attributes = [
        {
            name: 'tablet',
            type: 'list',
            alias: 'tab'
        },
        {
            name: 'mobile',
            type: 'list',
            alias: 'mob'
        },
        {
            name: 'position',
            type: 'number'
        }
    ];

    return [...Array(10)].reduce(
        (acc, val, i) => ({
            ...acc,
            ...attributes.reduce((accumulator, value) => {
                return {
                    ...accumulator,
                    [`${value.name}${i + 1}`]:
                        value.type === 'list'
                            ? PropTypes.oneOf(getSlotsOptions(value.alias)).tag(
                                  {
                                      label: value.name,
                                      defaultValue: '',
                                      group: `Banner ${i + 1}`
                                  }
                              )
                            : PropTypes.number.tag({
                                  label: value.name,
                                  defaultValue: 0,
                                  group: `Banner ${i + 1}`
                              })
                };
            }, {})
        }),
        {}
    );
}

function GrillaNotasFeature(props) {
    const {
        customFields: { cantidadNotas, typeArticle }
    } = props;

    const bannerConfig = groupBannerConfig(props);

    return (
        <GrillaNotas
            size={cantidadNotas}
            typeArticle={typeArticle}
            bannerConfig={bannerConfig}
        />
    );
}

GrillaNotasFeature.label = 'LN-Acumulado-Grilla-Notas';
GrillaNotasFeature.propTypes = {
    customFields: PropTypes.shape({
        typeArticle: PropTypes.oneOf(['ArticleMain', 'ArticleTimeLine']).tag({
            defaultValue: 'ArticleMain',
            label: 'Tipo de articulo'
        }),
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' }),
        ...buildCustomFieldsForBanners()
    }).isRequired
};

export default GrillaNotasFeature;
