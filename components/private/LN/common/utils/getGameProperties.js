import getAssetsPath from '../../../common/utils/getAssetsPath';

const SECTION_PREFIX_MAP = {
    games: '/juegos/',
    videopodcast: '/videopodcast/'
};

function getGameProperties(
    sectionTitle,
    contextPath,
    deployment,
    sectionId = '',
    contentFolder = 'games'
) {
    if (!sectionId || sectionId.trim() === '') {
        return false;
    }

    const sectionPrefix =
        SECTION_PREFIX_MAP[contentFolder] || `/${contentFolder}/`;
    const slug = sectionId.toLowerCase().replace(sectionPrefix, '');

    if (contextPath && deployment) {
        const assetPath = `${contentFolder}/${slug}.svg`;
        const gameLogo = getAssetsPath(contextPath)(deployment)(assetPath);

        return {
            title: sectionTitle,
            logo: { src: gameLogo },
            game: slug
        };
    }

    return false;
}

export default getGameProperties;
