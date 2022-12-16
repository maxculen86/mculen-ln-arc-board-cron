import get from '../../../private/common/utils/get';
import getSectionName from '../../../private/LN/common/utils/getSectionName';
import siteConfig from '../../../../properties/sites/la-nacion-ar';

export const RANKING = 'Ranking';

export const getRankingProps = (layout, featureId, globalContent) => {
    const { layoutsName = {} } = siteConfig;
    const isHome =
        layout === layoutsName.Home || layout === layoutsName.HomeLN10;
    const isInverse = featureId === 'inverse-home';
    const isAcuTag = get(globalContent, 'node_type', '') === 'tags';

    const key =
        (!isHome && !isInverse && !isAcuTag && 'acu') ||
        (isHome && isInverse && 'inverseHome') ||
        'home';

    const rankingType = {
        home: () => ({
            title: 'Más leídas',
            sectionName: RANKING,
            sectionId: getSectionId(globalContent),
            isHome,
            notesQuantity: 1,
            classCondition: 'com-ranking',
            rankingLayout: RANKING
        }),
        inverseHome: () => ({
            title: 'Te puede interesar',
            sectionName: 'RankingInverso',
            sectionId: 'inverse-home',
            isHome,
            isInverse,
            classCondition: '',
            rankingLayout: RANKING
        }),
        acu: () => ({
            sectionName: RANKING,
            sectionId: getSectionId(globalContent),
            isHome,
            notesQuantity: 1,
            classCondition: 'com-ranking'
        })
    };

    return rankingType[key] ? rankingType[key]() : rankingType.home();
};

export const getSectionId = globalContent => {
    const rankingType = getRankingType(globalContent);

    if (rankingType === 'home') return '';

    const sectionIdPath = {
        nota: 'taxonomy.primary_section._id',
        acumulado: '_id'
    };

    const [, section = '', subsection = ''] = get(
        globalContent,
        sectionIdPath[rankingType] || '',
        ''
    ).split('/');

    return `${section || ''}`.concat(`/${subsection || ''}`).replace(/\/$/, '');
};

export const getSectionParentId = (sectionId = '') => {
    const [section = ''] = sectionId.includes('/') ? sectionId.split('/') : [];
    return `${section || ''}`.replace(/\/$/, '');
};

export const getRankingType = ({ node_type: nodeType, type } = {}) => {
    const layoutType = getSectionName({
        nodeType,
        type
    });

    return (
        (layoutType === 'acumulado' && nodeType !== 'section' && 'home') ||
        layoutType
    );
};

export const hasArticles = data => !!get(data, 'articles', []).length;
