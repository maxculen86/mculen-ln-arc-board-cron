const acuTransformV2Format = (transformedAcu, sectionData, paginationValue) => {
    const metadata = {
        paginate: paginationValue,
        title: transformedAcu[0].titulo,
        banners: transformedAcu[0].banners,
        total: transformedAcu[0].acumuladoTotal,
        category: {
            slug: sectionData ? sectionData.slug : null,
            value: transformedAcu[0].titulo
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
