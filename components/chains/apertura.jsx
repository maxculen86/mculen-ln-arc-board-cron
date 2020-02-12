import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import Nota from '../features/LN-home/notaChain';
/*
    Reutilizo collection
*/
const CollectionsNotes = props => {
    // console.log('CollectionsNotes', props);
    // const { idCollection : id } = props;
    // collectionsNotes from useContent
    const content = useContent({
        source: 'collectionsV2Source',
        query: { id: props.idCollection }
    });
    if (content) {
        const arr = [];
        content.content_elements.map(item => {
            arr.push({
                idnota: item._id,
                headlines: item.headlines ? item.headlines : '',
                subheadlines: item.subheadlines ? item.subheadlines.basic : ''
            });
        });
        return <Nota customFields={arr} />;
        console.log(content);
    }
    return null;
    // iterar collectionsNotes
    // armar array de Nota con cada nota de la collection
};

const hasIdCollection = idCollection => {
    let flag = false;
    if (typeof idCollection === 'string' && idCollection != '') {
        flag = true;
    }
    return flag;
};

const Apertura = props => {
    const {
        children,
        customFields: { idCollection }
    } = props;

    if (hasIdCollection(idCollection)) {
        return <CollectionsNotes idCollection={idCollection} />;
    }

    return <section>{children}</section>;
};

Apertura.propTypes = {
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({
            label: 'ID de la collection',
            description: 'Ingrese aquí el ID de la collection'
        })
    })
};

export default Consumer(Apertura);
