import Consumer from 'fusion:consumer';
import React from 'react';
import { render } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import siteProps from '../../../../../__mocks__/data/properties/lnSiteProps';

import Breadcrumb from '../../../../../components/private/LN/nota/breadcrumb/breadcrumbArticle';

describe('features - LaNacion - Nota - ', () => {
    it('Test de snapshot Breadcrumb', () => {
        const component = render(
            <Breadcrumb globalContent={nota} siteProperties={siteProps} />
        );
        expect(component).toMatchSnapshot();
    });

    it('Test de Breadcrumb variante 2 niveles', () => {
        // /recetas/recetas-con-ingredientes/pollo
        // /recetas/recetas-con-ingredientes

        nota.taxonomy.sections = nota.taxonomy.sections.filter(
            x =>
                ![
                    '/recetas/recetas-con-ingredientes/pollo',
                    '/recetas/recetas-con-ingredientes'
                ].includes(x._id)
        );
        nota.taxonomy.primary_section = nota.taxonomy.sections.find(
            x => x._id === '/recetas'
        );

        const component = render(
            <Breadcrumb globalContent={nota} siteProperties={siteProps} />
        );

        expect(component.find('a').length).toBe(2);
    });

    it('Test de Breadcrumb variante 1 nivel', () => {
        // /recetas/recetas-con-ingredientes/pollo
        // /recetas/recetas-con-ingredientes

        nota.taxonomy.sections = undefined;
        nota.taxonomy.primary_section = undefined;

        const component = render(
            <Breadcrumb globalContent={nota} siteProperties={siteProps} />
        );

        expect(component.find('a').length).toBe(1);
    });
});
