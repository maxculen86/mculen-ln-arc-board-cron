import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListItems from '../../../common/listItems';

const listPreparacion = ({ content_elements }) => {
    const preparacionFiltered = content_elements
        ? content_elements.filter(ce => ce.subtype === 'custom-preparacion')
        : [];

    /* TODO: falta componte de cuerpo 
        Usar el siguiente bucle para validar si hay 
        elementos por renderizar y renderizar lista de preparación */
    // TODO: Revisar el html mas conveniente
    // TODO: Agregar className para los ul o ol de ser necesario
    return (
        preparacionFiltered.length !== 0 && (
            <div className="ce-preparaciones">
                <h2>Preparación</h2>
                {preparacionFiltered.map(list => (
                    <ListItems
                        list={list.embed.config.items}
                        titleList={list.embed.config.titleList}
                        listNumeric
                    />
                ))}
            </div>
        )
    );
};

listPreparacion.propTypes = {
    content_elements: PropTypes.arrayOf(
        PropTypes.shape({
            subtype: PropTypes.string
        }).isRequired
    ).isRequired
};

export default listPreparacion;
