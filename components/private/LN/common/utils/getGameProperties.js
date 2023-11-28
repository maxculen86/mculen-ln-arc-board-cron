import getAssetsPath from '../../../common/utils/getAssetsPath';

const getGameProperties = (
    sectionTitle,
    sectionId = '',
    contextPath,
    deployment
) => {
    if (!sectionId || sectionId.trim() === '') {
        return false;
    }

    const gameTitle = sectionId.toLowerCase().replace('/juegos/', '');

    if (contextPath && deployment) {
        const gameLogo = getAssetsPath(contextPath)(deployment)(
            `games/${gameTitle}.svg`
        );

        return {
            title: sectionTitle,
            logo: { src: gameLogo },
            game: `${gameTitle}`
        };
    }
};

export default getGameProperties;
