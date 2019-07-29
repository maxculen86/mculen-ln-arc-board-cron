import React from 'react';
import { render } from 'enzyme';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import ListItemsIngredientes from '../../../../../components/private/LN/nota/apertura/ListItems';
import ListItemsPreparacion from '../../../../../components/private/LN/nota/apertura/ListItems';

const content_elements = nota.content_elements;

const listIngredientes = content_elements.filter(
    ce => ce.subtype === 'custom-ingrediente'
)[0];
const listPreparacion = content_elements.filter(
    ce => ce.subtype === 'custom-preparacion'
)[0];

describe('features - LaNacion - Nota - ListItemsIngredientes', () => {
    const component = render(
        <ListItemsIngredientes
            list={listIngredientes.embed.config.items}
            titleList={listIngredientes.embed.config.titleList}
        />
    );
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});

describe('features - LaNacion - Nota - ListItemsPreparacion', () => {
    const component = render(
        <ListItemsPreparacion
            list={listPreparacion.embed.config.items}
            titlelistPreparacion={listPreparacion.embed.config.titleList}
            listNumeric="true"
        />
    );
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
});
