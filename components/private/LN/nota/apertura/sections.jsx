import React from 'react';
import PropTypes from 'fusion:prop-types';
import TaxonomyComponent from '../../common/taxonomyImportantList';

const sections = props => {
    const { taxonomy, destacado } = props;
    /* Si llegan las secciones: 
    
    /recetas
        /ingredientes
                    /pollo
                    /carne

        /acompañamiento/
                        lechuga

    
                        
        tendria que dibujar: ingredientes, pollo, carne, acompañamiento, lechuga

        Si queres en primera instancia que simplemente agarre el primarySection y permita indicarle que nivel NO dibujar (recetas en este caso)
    */

    const primary = taxonomy.primary_section;

    let listSections = '';
    if (primary) {
        listSections = taxonomy.sections.filter(x =>
            x.additional_properties.original.ancestors.default.includes(
                primary.additional_properties.original.ancestors.default[0]
            )
        );
    }

    console.log('Despues: ', listSections);
    const listSectionsDespues = listSections.map(x => {
        return {
            path: x.path,
            text: x.name
        };
    });
    const list = [];

    return (
        <TaxonomyComponent list={listSectionsDespues} destacado={destacado} />
    );
};

sections.propTypes = {
    taxonomy: PropTypes.object.isRequired,
    destacado: PropTypes.boolean.isRequired
};
// Proptypes para esperar taxonomy.
// Tambien deberia recibir como propiedad: si uitiliza la primary_section o que seccion. (por ahora solo primary), y cuantas se saltea desde la raiz

export default sections;
