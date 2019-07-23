import React from 'react';
import TaxonomyComponent from '../../common/taxonomyImportantList';

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
    console.log('Primary: ', primary);
    console.log('Sections: ', taxonomy.sections);

    const sections = taxonomy.sections.filter(x =>
        x.additional_properties.original.ancestors.default.includes(
            primary.additional_properties.original.ancestors.default[0]
        )
    );

    console.log('Despues: ', sections);
    const list = [];

    return <TaxonomyComponent list={list} destacado={destacado} />;
};

//Proptypes para esperar taxonomy.
//Tambien deberia recibir como propiedad: si uitiliza la primary_section o que seccion. (por ahora solo primary), y cuantas se saltea desde la raiz

export default sections;
