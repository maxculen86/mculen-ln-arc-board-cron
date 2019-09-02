/* eslint-disable react/no-danger */
import React from 'react';

// Cuando surgan los dataLayers de los otros templates, intentar usar este y que quede completo para todos. Si no se puede, crear carpeta.
// En las props tenemos el globalContent!
const dataLayer = props => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `var dataLayer = [
        {
            metarefresh: 'N/A',
            pageType: 'N/A',
            mainTag: 'N/A',
            tags: 'N/A',
            autor: 'N/A',
            seccion: 'Recetas',
            longitud: 'N/A',
            formato: 'N/A',
            genero: 'N/A',
            tematica: 'N/A',
            valor: 'N/A',
            age: 'N/A',
            gender: 'N/A',
            marital: 'N/A',
            country: 'N/A',
            city: 'N/A',
            education: 'N/A',
            career: 'N/A',
            industry: 'N/A',
            income: 'N/A',
            interest: 'N/A'
        }
    ];    `
            }}
        />
    );
};

export default dataLayer;
