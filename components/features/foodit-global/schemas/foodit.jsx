import React from 'react';

import { AcuSchema } from './Acu';
import { HomeSchema } from './Home';
import { OrganizationSchema } from './Organization';
import { ChefSchema } from './Chef';
import { RecipeSchema } from './Recipe';
import { StorytellingSchema } from './Note';
import { AcuChefSchema } from './AcuChef';
import { RecetarioSchema } from './Recetario';
import { ListaComprasSchema } from './ListaCompras';
import { MenuSemanalSchema } from './MenuSemanal';

const schemas = {
    'Foodit-home': HomeSchema,
    'Foodit-chef': ChefSchema,
    'Foodit-ficha-receta': RecipeSchema,
    'Foodit-recipe-paywall': RecipeSchema,
    'Foodit-ficha-nota': StorytellingSchema,
    'Foodit-acumulado': AcuSchema,
    'Foodit-acumulado-chef': AcuChefSchema,
    'Foodit-recetario': RecetarioSchema,
    'Foodit-compras': ListaComprasSchema,
    'Foodit-menu-semanal': MenuSemanalSchema
};

function FooditSchemas(props) {
    const { layout } = props;

    const Snippet = schemas[layout];

    if (!Snippet) return null;

    return (
        <>
            {layout === 'Foodit-home' && <OrganizationSchema {...props} />}
            <Snippet {...props} />
        </>
    );
}

export default FooditSchemas;
