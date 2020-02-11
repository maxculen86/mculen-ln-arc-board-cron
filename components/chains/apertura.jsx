import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Nota from '../features/LN-home/notaChain';

/*
    Reutilizo collection
*/
const CollectionsNotes = props => {
    // collectionsNotes from useContent
    // iterar collectionsNotes
    // armar array de Nota con cada nota de la collection
};

const Apertura = props => {
    const {
        children,
        customFields: { idCollection }
    } = props;

    if (hasIdCollection) {
        // TODO: pasar id
        return <CollectionsNotes idCollection={idCollection} />;
    }

    console.log(children);
    return <section>{children}</section>;
};

Apertura.propTypes = {
    customFields: PropTypes.shape({
        cantidadNotas: PropTypes.number.tag({ label: 'Cantidad de Notas' })
    })
};

export default Consumer(Apertura);
