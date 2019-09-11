import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListItems from '../../../common/listItems';

const listIngredientes = ({ content_elements }) => {
    const ingredientesFiltered = content_elements
        ? content_elements.filter(ce => ce.subtype === 'custom-ingrediente')
        : [];

    /* TODO: falta componte de cuerpo 
        Usar el siguiente bucle para validar si hay 
        elementos por renderizar y renderizar lista de preparación */
    // TODO: Revisar el html mas conveniente
    // TODO: Agregar className para los ul o ol de ser necesario
    return (
        ingredientesFiltered.length !== 0 && (
            <div className="ce-ingredientes col-tablet-3 hlp-marginBottom-mobile-40">
                <h4 class="com-title-section-s hlp-marginBottom-20">
                    Ingredientes
                </h4>
                {ingredientesFiltered.map(list => (
                    <ListItems
                        list={list.embed.config.items}
                        titleList={list.embed.config.titleList}
                    />
                ))}
            </div>
        )
    );
};

listIngredientes.propTypes = {
    content_elements: PropTypes.arrayOf(
        PropTypes.shape({
            subtype: PropTypes.string
        }).isRequired
    ).isRequired
};

export default listIngredientes;
