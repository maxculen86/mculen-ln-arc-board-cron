import get from '../../../private/common/utils/get';
import getSectionName from '../../../private/LN/common/utils/getSectionName';

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
