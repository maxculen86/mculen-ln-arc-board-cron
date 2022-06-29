import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { useContent as getContent } from 'fusion:content';
import StaticValidation from '../../../private/common/staticValidation';
import CajaTema from '../../../private/LN/common/cajaTema';
import { getRankingProps, getSectionParentId, hasArticles } from './_helper';
import { getPlaceholder } from '../../../private/LN/common/utils/cajaTemasPlaceholder';

import '../../../../resources/dist/css/ln/components/ranking.css';
import { productClickFromClient } from '../../../private/common/utils/viewability';

const getDataContent = (sectionId, sectionParentId, website) => {
    const getRankingData = section =>
        getContent({
            source: 'rankingArticlesSource',
            query: {
                sectionId: section,
                imageConfig: 'boxArticles',
                website
            }
        });

    const data = getRankingData(sectionId);

    if (!sectionId || !sectionParentId) return data || {};

    return (hasArticles(data) && data) || getRankingData(sectionParentId);
};

const getComponentForHome = (component, size = 4, isInverse, hidePlaceholder) =>
    component ||
    (!hidePlaceholder &&
        getPlaceholder(isInverse ? 'grilla6' : `ranking${size}`)) || <></>;

const getComponentForSection = (component, featureId) =>
    (component && (
        <StaticValidation id={featureId}>{component}</StaticValidation>
    )) || <></>;

const RankingFeature = ({ id: featureId }) => {
    const {
        outputType,
        website,
        arcSite,
        layout,
        globalContent
    } = useAppContext();

    const {
        title,
        sectionName,
        sectionId,
        isHome,
        isInverse,
        notesQuantity,
        classCondition,
        rankingLayout
    } = getRankingProps(layout, featureId, globalContent);

    const sectionParentId = getSectionParentId(sectionId);
    const { _id, name, articles, size } =
        getDataContent(sectionId, sectionParentId, website || arcSite) || {};

    const customTitle = name ? `Más leídas de ${name}` : 'Más leídas';
    const hidePlaceholder = _id && !articles && isInverse;

    const component = articles && articles.length && (
        <CajaTema
            title={title || customTitle}
            notesQuantity={notesQuantity}
            sectionName={sectionName}
            articles={articles}
            position="toi"
            dataSection={sectionId}
            outputType={outputType}
            classCondition={classCondition}
            titleSize="--xs"
            withVolanta
            layout={rankingLayout}
            isHome={isHome}
            handleClick={productClickFromClient}
        />
    );

    return isHome
        ? getComponentForHome(component, size, isInverse, hidePlaceholder)
        : getComponentForSection(component, featureId);
};

RankingFeature.label = 'LN-Common-Ranking';

RankingFeature.propTypes = {
    id: PropTypes.string.isRequired,
    outputType: PropTypes.string,
    website: PropTypes.string,
    arcSite: PropTypes.string,
    layout: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        node_type: PropTypes.string,
        type: PropTypes.string,
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                _id: PropTypes.string
            })
        })
    }).isRequired
};

RankingFeature.defaultProps = {
    outputType: 'default',
    arcSite: 'la-nacion-ar'
};

export default RankingFeature;
