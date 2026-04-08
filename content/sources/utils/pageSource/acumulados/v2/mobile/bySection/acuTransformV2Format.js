/* eslint-disable no-param-reassign */
const SECTION_TITLES = {
    '/ultimas-noticias': 'Últimas noticias',
    '/suscriptores': 'Suscriptores'
};

const acuTransformV2Format = (transformedAcu, sectionSlug, paginationValue) => {
    const specialSectionTitle = SECTION_TITLES[sectionSlug] ?? null;

    const title = specialSectionTitle || transformedAcu[0].titulo;
    const isFunebre = sectionSlug == '/avisos/funebres'

    const metadata = {
        paginate: paginationValue,
        title
    };
    if (!isFunebre) {
        metadata.banners = transformedAcu[0].banners;
    }

    metadata.total = transformedAcu[0].acumuladoTotal;
    metadata.category = {
        slug: sectionSlug,
        value: title
    };

    delete transformedAcu[0].paginar;
    delete transformedAcu[0].titulo;
    delete transformedAcu[0].banners;
    delete transformedAcu[0].acumuladoTotal;

    return {
        metadata,
        items: [...transformedAcu]
    };
};

export default acuTransformV2Format;
