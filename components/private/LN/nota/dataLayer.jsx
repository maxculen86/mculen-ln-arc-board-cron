import React from 'react';

export default props => {
    const {
        globalContent: {
            credits: { by },
            taxonomy: {
                primary_section: { path: primarySectionPath }
            }
        }
    } = props;

    console.log('---------------------Porps dataLayer nota:', props);

    const autores = by.map(v => v.name).join(', ');

    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `var dataLayer = [
        {
            metarefresh: 'N/A',
            pageType: 'nota',
            mainTag: 'N/A',
            tags: 'N/A',
            autor: '${autores}',
            seccion: '${primarySectionPath}',
            longitud: 'N/A',
            formato: 'N/A',
            genero: 'N/A',
            tematica: 'N/A',
            valor: 'comun',
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
    ];
    `
            }}
        />
    );
};
