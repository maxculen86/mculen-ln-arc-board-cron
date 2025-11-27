import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

const cardRegistry = new Map();

export const validateCardCategory = ({
    title = '',
    image = '',
    url = '',
    query = '',
    groups = [],
    itemGroups = [],
    imageUrl
}) => {
    const rules = [
        {
            validation: !title,
            message: 'Se requiere un titulo'
        },
        {
            validation: !image,
            message: 'Se requiere el id de una imagen'
        },
        {
            validation: groups.length !== itemGroups.length,
            message:
                'Los grupos y los valores deben tener la misma cantidad ya que estan relacionadas'
        },
        {
            validation: !url && !query,
            message: `Se requiere una url o un termino de busqueda`
        },
        {
            validation: !imageUrl,
            message: 'No se encontro imagen'
        }
    ];

    return pageBuilderValidator(rules);
};

export const groupsParser = (groups = []) => {
    const groupsText = {
        'ingrediente principal': 'main_ingredients',
        seccion: 'section',
        'tipo de coccion': 'cookingtypes',
        ocasion: 'occasions',
        region: 'regions',
        subtipo: 'subtype',
        estado: 'content_code',
        video: 'video_jw'
    };

    return groups.map((group = '') => groupsText[group.toLowerCase()] || '');
};

export const itemGroupsParser = ({ groups = [], itemGroups = [] } = {}) => {
    const indexSubtype = groups.indexOf('subtype');
    const indexVideo = groups.indexOf('video_jw');

    const itemGroupsText = {
        receta: '7',
        nota: '4',
        si: 'video_jw'
    };

    return itemGroups.map((itemGroup = '', index = 0) => {
        if (indexSubtype === index || indexVideo === index) {
            return itemGroupsText[itemGroup.toLowerCase()] || '';
        }
        return itemGroup;
    });
};
export const resolveUrl = ({
    query,
    titleAcu = '',
    groups,
    itemGroups,
    featureId = ''
} = {}) => {
    const transformTitleToPath = titleAcu
        .replace(/\s/g, '-')
        .trim()
        .toLowerCase();
    const baseUrl = `/tema/${transformTitleToPath}-${featureId.toLowerCase()}/?query=${encodeURIComponent(query)}`;

    const queryParams = [];

    if (titleAcu) {
        queryParams.push(`title=${encodeURIComponent(titleAcu)}`);
    }
    if (groups) {
        queryParams.push(`groups=${encodeURIComponent(groups)}`);
    }
    if (itemGroups) {
        queryParams.push(`itemGroups=${encodeURIComponent(itemGroups)}`);
    }

    const queryString = queryParams.join('&');
    return `${baseUrl}&${queryString}`;
};

export const registerCardIndex = featureId => {
    if (!cardRegistry.has(featureId)) {
        const currentIndex = cardRegistry.size;
        cardRegistry.set(featureId, currentIndex);
    }
    return cardRegistry.get(featureId);
};
