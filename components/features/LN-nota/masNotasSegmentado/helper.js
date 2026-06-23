export const SEGMENTATION_GROUP = 'Segmentación AB';

export const FILTERS = [
    '',
    'byLastNews',
    'byTags',
    'bySectionOrTag',
    'aperturaHome'
];

export const FILTER_LABELS = {
    '': 'Sin configurar',
    byLastNews: 'Ultimas Noticias',
    byTags: 'Por Tags',
    bySectionOrTag: 'Seccion o tag',
    aperturaHome: 'Apertura-Home'
};

export const getAdminPreviewSegment = ({
    isAdmin,
    segment,
    segmentationConfigError,
    filterTest
}) => {
    if (!isAdmin || segment || segmentationConfigError) return null;
    return filterTest ? 'test' : 'control';
};
