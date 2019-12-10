import React from 'react';
import PropTypes from 'fusion:prop-types';

//Importo componente HARCODEADOS
import Colecciones from '../cuerpo/coleciones';
import CartaLectores from '../cuerpo/cartaLectores';
import Edicion from '../cuerpo/edicion';

// TODO: tests
const Tercera = () => {
    const resp = [];

    resp.push(<Colecciones />);
    resp.push(<CartaLectores />);
    resp.push(<Edicion />);

    return resp;
};

Tercera.propTypes = {
    globalContent: PropTypes.shape({
        content_elements: PropTypes.node.isRequired
    }).isRequired
};

export default Tercera;
