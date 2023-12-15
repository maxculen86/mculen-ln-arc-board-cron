import React from 'react';
import PropTypes from 'prop-types';
import { Timer, Resto } from '@ln/foodit-ui-assets';
import Ingredients from './ingredientsBox/ingredients';
import ExternalLinks from './ingredientsBox/externalLinks';
import Nutritional from './ingredientsBox/nutritional';
import Tags from './ingredientsBox/tags';
import SummaryBox from './summaryBox/foodit';

export const PowerupsReceta = ({ article = {} }) => {
    // const { content_elements = [] } = article;
    // revisar como obtener los powerups segun el nuevo content source para foodit
    // const { powerUp = [] } = content_elements.find(
    //     element => element && element.subtype === 'power-up-receta'
    // );

    // TODO: hacer dinamica las constante mockeadas
    const ingredientsMock = {
        items: [
            '2 pechugas de pollo',
            '1 zucchini',
            'Mostaza',
            'Crema de leche (optativo)',
            'Pimentón ahumado',
            'Sal & pimienta',
            'Papel aluminio o manteca'
        ],
        titleList: 'Para el bajon'
    };
    const nutritionalMock = {
        items: ['list item 1', 'list item 2', 'list item 3'],
        titleList: 'Nutricional'
    };
    const externalLinksMock = {
        items: [
            {
                text: 'Guia de equivalencias',
                url: '#'
            },
            {
                text: 'Sustituto de ingredientes',
                url: '#'
            }
        ]
    };
    const tagsMock = {
        items: [
            {
                text: 'Fácil',
                url: '#'
            },
            {
                text: 'Económica',
                url: '#'
            }
        ]
    };
    const summaryBoxMock = [
        { icon: <Timer />, time: '{x} min.', text: 'Tiempo de cocción' },
        { icon: <Resto />, time: '{x} min.', text: 'Tiempo de Preparación' },
        { icon: <Timer />, time: '{x} min.', text: 'Tiempo total' }
    ];

    return (
        <>
            <div>
                <SummaryBox items={summaryBoxMock} />
            </div>
            <div className="bg-background-positive flex flex-column gap-16 p-16 p-24_md p-32_lg">
                <Ingredients {...ingredientsMock} />
                <hr />
                <ExternalLinks {...externalLinksMock} />
                <hr />
                <Nutritional {...nutritionalMock} />
                <hr />
                <Tags {...tagsMock} />
            </div>
        </>
    );
};

PowerupsReceta.propTypes = {
    article: PropTypes.object
};

export default PowerupsReceta;
