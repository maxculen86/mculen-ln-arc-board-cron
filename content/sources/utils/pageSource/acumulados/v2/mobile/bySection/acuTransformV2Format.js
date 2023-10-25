const acuTransformV2Format = (transformedAcu, sectionSlug, paginationValue) => {
    const specialSectionTItle =
        sectionSlug === '/ultimas-noticias'
            ? 'Últimas noticias'
            : sectionSlug === '/suscriptores'
            ? 'Exclusivo suscriptores'
            : null;

    const title = specialSectionTItle
        ? specialSectionTItle
        : transformedAcu[0].titulo;

    const metadata = {
        paginate: paginationValue,
        title: title,
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
