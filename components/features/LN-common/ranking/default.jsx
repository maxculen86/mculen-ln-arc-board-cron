import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../../private/common/staticValidation';
import CajaTema from '../../../private/LN/common/cajaTema';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getSectionId, getSectionParentId, getDataContent } from './_helper';
import { getPlaceholder } from '../../../private/LN/common/utils/cajaTemasPlaceholder';

import '../../../../resources/dist/css/ln/components/ranking.css';

const getComponentForHome = (component, size = 4) =>
    component || getPlaceholder(`ranking${size}`);

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
    const { layoutsName = {} } = siteConfig;
    const isHome = layout === layoutsName.Home;
    const sectionId = getSectionId(globalContent);
    const sectionParentId = getSectionParentId(sectionId);
    const { name, articles, size } = getDataContent(
        sectionId,
        sectionParentId,
        website || arcSite
    );

    const component = articles && articles.length && (
        <CajaTema
            title={name ? `Más leídas de ${name}` : `Más leídas`}
            notesQuantity={1}
            sectionName="Ranking"
            articles={articles}
            position="toi"
            dataSection={sectionId}
            outputType={outputType}
            classCondition="com-ranking"
            titleSize="--xs"
            withVolanta
            layout={isHome ? 'Ranking' : undefined}
            isHome={isHome}
        />
    );

    return isHome
        ? getComponentForHome(component, size)
        : getComponentForSection(component, featureId);
};

RankingFeature.label = 'LN-Common-Ranking';

RankingFeature.propTypes = {
    id: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
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

export default RankingFeature;
