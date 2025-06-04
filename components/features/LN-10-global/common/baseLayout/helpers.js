import siteConfig from '../../../../../properties/sites/la-nacion-ar';

export const showGlossaryByLayout = (layout = '') => {
    const { layoutsName } = siteConfig;
    const allowedLayoutsForGlossary = [
        layoutsName.FotoAl100,
        layoutsName.Noticia,
        layoutsName.Infografia,
        layoutsName.StoryTelling
    ];
    return allowedLayoutsForGlossary.some(
        allowedLayout => allowedLayout === layout
    );
};
