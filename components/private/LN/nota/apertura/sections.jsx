import React from 'react';
import TaxonomyComponent from '../../common/taxonomyImportantList';
import PropTypes from 'fusion:prop-types';

const sections = ({ taxonomy, destacado }) => {
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

    var listSections = '';
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
    primary: PropTypes.object,
    listSections: PropTypes.array,
    listSectionsDespues: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            path: PropTypes.string
        })
    ),
    destacado: PropTypes.boolean
};

//Proptypes para esperar taxonomy.
//Tambien deberia recibir como propiedad: si uitiliza la primary_section o que seccion. (por ahora solo primary), y cuantas se saltea desde la raiz

export default sections;
