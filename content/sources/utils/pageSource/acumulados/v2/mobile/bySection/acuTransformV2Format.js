/* eslint-disable no-param-reassign */
const SECTION_TITLES = {
    '/ultimas-noticias': 'Últimas noticias',
    '/suscriptores': 'Suscriptores'
};

const acuTransformV2Format = (transformedAcu, sectionSlug, paginationValue) => {
    const specialSectionTitle = SECTION_TITLES[sectionSlug] ?? null;

    const title = specialSectionTitle || transformedAcu[0].titulo;

    const metadata = {
        paginate: paginationValue,
        title,
        banners: transformedAcu[0].banners,
        total: transformedAcu[0].acumuladoTotal,
        category: {
            slug: sectionSlug,
            value: title
        }
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
