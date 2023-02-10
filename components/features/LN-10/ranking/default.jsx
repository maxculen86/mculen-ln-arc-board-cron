import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { Cajaranking } from '@ln/contenidos-ui-cajaranking';
import { Roof } from '@ln/contenidos-ui-roof';
import { Card } from '@ln/contenidos-ui-card';
import {
    getRankingProps,
    getSectionParentId,
    getDataContent,
    RANKING
} from './_helper';
import StaticContent from '../../../private/common/staticContent';
import '../../../../resources/dist/css/ln/components/ranking.css';
import checkHydrateOnly from '../../../private/LN/common/utils/checkHydrateOnly';
import articleBoxesTracker from '../../../private/common/utils/noteTracker/articleBoxesTracker';
import '../../../../resources/packages/css/@ln/contenidos-ui-cajaranking/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';
import getCardConfig from '../../../private/LN10/home/components/CommonCollection/_helper';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import get from '../../../private/common/utils/get';
import BuildRoof from '../../../chains/utils/_BuildRoof/default';

export const cardData = {
    mediaData: {
        alt: 'Descargar nuestra app en Google Play',
        src:
            'https://res.cloudinary.com/dhwlnxbib/image/upload/v1667575986/Challenge%20LN/ZEHEPKVIUFATZLNXPH4Z72FGV4_tomydu.webp',
        type: 'image'
    },
    hrefTitle: 'El lead mas el titulo',
    section: 'Section name',
    lead: 'Volanta nota.',
    title:
        'Title esto es un titulo de la novedad con unas cuantas lineas que ocupar',
    subhead:
        'Subhead. Lana soñaba con volar a la luna. Todas las tardes se tumbaba en su cama y se imaginaba cómo sería su viaje a bordo de su propia nave espacial.',
    href: 'https://www.lanacion.com.ar',
    marquee: 'Nombre y Apellido',
    marqueeImg:
        'https://res.cloudinary.com/dhwlnxbib/image/upload/v1667235847/Challenge%20LN/2089255_rzwvdw.png'
};

const RankingFeature = ({ id: featureId }) => {
    const {
        outputType,
        website,
        arcSite,
        layout,
        globalContent = {}
    } = useAppContext();

    const { node_type: nodeType, type } = globalContent;

    const {
        title,
        sectionName,
        sectionId,
        isHome,
        notesQuantity,
        classCondition,
        rankingLayout
    } = getRankingProps(layout, featureId, globalContent);

    const sectionParentId = getSectionParentId(sectionId);
    const hasHydrateOnly = checkHydrateOnly({ layout, nodeType });

    const { name, articles } =
        getDataContent(
            sectionId,
            sectionParentId,
            website || arcSite,
            hasHydrateOnly
        ) || {};

    const customTitle = name ? `Más leídas de ${name}` : 'Más leídas';

    useEffect(() => {
        type === 'story' &&
            articleBoxesTracker({
                boxType: 'ranking'
            });
    }, [type]);

    const rules = diagramationRules('ranking-1-2-2_grid') || [];

    const component = (
        <>
            <Roof>
                <Roof.Left text="MÁS LEÍDAS" href="/ref"></Roof.Left>
                <Roof.Right />
            </Roof>
            <Cajaranking gridType="ranking-1-2-2_grid">
                {articles &&
                    articles.map((article, index) => {
                        const {
                            marquee,
                            cardSize,
                            mediaData,
                            imagePosition
                        } = getCardConfig(rules[index], article);

                        return (
                            <Card
                                title={get(article, 'headlines.basic', '')}
                                lead={get(article, 'label.volanta.text', '')}
                                href={get(article, 'website_url', '')}
                                mediaData={mediaData}
                                marquee={marquee}
                                cardSize={cardSize}
                                imagePosition={imagePosition}
                            />
                        );
                    })}
            </Cajaranking>
        </>
    );

    const sectionRanking = component || <></>;

    return hasHydrateOnly ? (
        <StaticContent>{component}</StaticContent>
    ) : (
        sectionRanking
    );
};

RankingFeature.label = 'LN10 Ranking';

RankingFeature.propTypes = {
    id: PropTypes.string.isRequired,
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
