import IndexAcuV1Mobile from '../../../v1/mobile/accumulated/index';

const index = acuData => {
    const indexAcuV1Result = IndexAcuV1Mobile(acuData);

    const metadata = {
        total: indexAcuV1Result[0].acumuladoTotal,
        paginate: indexAcuV1Result[0].paginar,
        title: indexAcuV1Result[0].titulo,
        banners: indexAcuV1Result[0].banners
    };

    delete indexAcuV1Result[0].paginar;
    delete indexAcuV1Result[0].acumuladoTotal;
    delete indexAcuV1Result[0].titulo;
    delete indexAcuV1Result[0].banners;

    const response = {
        metadata,
        items: [...indexAcuV1Result]
    };
    return response;
};

export default index;
