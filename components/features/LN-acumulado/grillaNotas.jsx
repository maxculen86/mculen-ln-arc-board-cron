/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import GrillaNotas from '../../private/LN/acumulado/grillaNotas/grillaNotas';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import { getIdsArticlesFromOtherCollections } from '../../private/LN/common/utils/cajaTemasValidators';
import {
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET
} from '../../private/LN/common/utils/bannerHelper';

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
            name: 'desktop',
            type: 'list',
            alias: 'dsk',
            bannerSlots: BANNERS_DESKTOP
        },
        {
            name: 'tablet',
            type: 'list',
            alias: 'tab',
            bannerSlots: BANNERS_TABLET
        },
        {
            name: 'mobile',
            type: 'list',
            alias: 'mob',
            bannerSlots: BANNERS_MOBILE
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
                            ? PropTypes.oneOf(value.bannerSlots).tag({
                                  label: value.name,
                                  defaultValue: '',
                                  group: `Banner ${i + 1}`
                              })
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
        acumuladoGeneral = {},
        articlesInCollection = [],
        collectionsInPage = []
    } = useGlobalProviderAcu();
    const { cantidad_notas = 30, tipo_acumulado = 'Grilla' } = acumuladoGeneral;
    const {
        globalContent: { node_type: nodeType, _id, Payload, distributorId },
        outputType,
        renderables
    } = useAppContext();

    const tagId =
        Payload && Payload.items && Payload.items.length
            ? Payload.items[0].slug
            : undefined;

    const sectionId = nodeType === 'section' ? _id : null;
    const authorId = nodeType === 'author' ? _id : null;

    const bannerConfig = groupBannerConfig(props);

    const idsArticlesFromOtherCollection = getIdsArticlesFromOtherCollections(
        renderables,
        collectionsInPage
    );

    const idsArticlesToExclude = idsArticlesFromOtherCollection.concat(
        articlesInCollection.map(art => art._id)
    );

    return (
        <GrillaNotas
            authorId={authorId}
            tagId={tagId}
            sectionId={sectionId}
            distributorId={distributorId}
            size={outputType === 'amp' ? 30 : cantidad_notas}
            page={1}
            typeArticle={tipo_acumulado}
            bannerConfig={bannerConfig}
            outputType={outputType}
            idsArticlesToExclude={idsArticlesToExclude}
            articlesInCollection={articlesInCollection}
        />
    );
}

GrillaNotasFeature.label = 'LN-Acumulado-Grilla-Notas';

GrillaNotasFeature.propTypes = {
    customFields: PropTypes.shape({
        ...buildCustomFieldsForBanners()
    }).isRequired
};

export default GrillaNotasFeature;
