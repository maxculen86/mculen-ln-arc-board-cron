const acuTransformV2Format = (transformedAcu, paginationValue) => {
    const metadata = {
        paginate: paginationValue,
        title: transformedAcu[0].titulo,
        banners: transformedAcu[0].banners,
        total: transformedAcu[0].acumuladoTotal,
        topic: {
            id: transformedAcu[0].tema.id,
            slug: transformedAcu[0].tema.slug,
            value: transformedAcu[0].tema.valor,
            typeId: transformedAcu[0].tema.tipoId,
            formatId: transformedAcu[0].tema.formatoId,
            typeDescription: transformedAcu[0].tema.tipoDescripcion
        }
    };

    delete transformedAcu[0].paginar;
    delete transformedAcu[0].titulo;
    delete transformedAcu[0].banners;
    delete transformedAcu[0].acumuladoTotal;
    delete transformedAcu[0].tema;

    return {
        metadata,
        items: [...transformedAcu]
    };
};

export default acuTransformV2Format;
