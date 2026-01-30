import React from 'react';
import SchemaPageview from '../../../../../../../components/features/LN-10-global/common/schemas/schemaPageView/default';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('SchemaPageview', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a schema with pagetype "accumulated" and metarefresh set to "N/A"', () => {
        const globalContent = { _id: 'nota-1' };
        const layout = 'LN-acumulado';

        render(
            <SchemaPageview globalContent={globalContent} layout={layout} />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
            pagetype: 'acumulado',
            metarefresh: 'N/A'
        });
    });

    it('render a schema with pagetype "note" and the fields: value, subtype, note_id and isListenable in true', () => {
        const globalContent = {
            _id: 'nota-2',
            subtype: '1',
            isListenable: true,
            content_restrictions: { content_code: 'cerrada' }
        };

        render(
            <SchemaPageview
                globalContent={globalContent}
                layout="LN-nota-noticia"
            />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
            pagetype: 'nota',
            valor: 'cerrada',
            subtype: '1',
            nota_id: 'nota-2',
            isListenable: 'si',
            lectura: '0',
            palabras: 100
        });
    });

    it('render a schema with pagetype "note" and the fields: value, subtype, note_id and isListenable in false', () => {
        const globalContent = {
            _id: 'nota-3',
            subtype: '1',
            isListenable: false,
            content_restrictions: { content_code: 'abierta' }
        };

        render(
            <SchemaPageview
                globalContent={globalContent}
                layout="LN-nota-noticia"
            />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
            pagetype: 'nota',
            valor: 'abierta',
            subtype: '1',
            nota_id: 'nota-3',
            isListenable: 'no',
            lectura: '0',
            palabras: 100
        });
    });

    it('render generic schema when pagetype is "home"', () => {
        const globalContent = {};

        render(
            <SchemaPageview
                globalContent={globalContent}
                layout="LN10-Home_Main"
            />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
            pagetype: 'home'
        });
    });

    it('render generic schema when pagetype is "Deportes"', () => {
        const globalContent = {
            _id: '/deportes'
        };

        render(
            <SchemaPageview
                globalContent={globalContent}
                layout="LN-acumulado"
            />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
            pagetype: 'Deportes'
        });
    });

    it('Should return all properties as N/A in recipes', () => {
        const globalContent = {};

        render(
            <SchemaPageview
                globalContent={globalContent}
                layout="LN-nota-receta"
            />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
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
        });
    });

    it('It should not render when the layout is not in the list of layouts with pageviews to record.', () => {
        const globalContent = {};

        render(
            <SchemaPageview
                globalContent={globalContent}
                layout="LN-buscador"
            />
        );

        const scriptTag = document.getElementById('pageview');
        expect(scriptTag).toBeNull();
    });

    it('render a schema with pagetype "nota" when layout is "LN-Nota-Opinion"', () => {
        const globalContent = {
            _id: 'nota-opinion-1',
            subtype: '3',
            isListenable: false,
            content_restrictions: { content_code: 'comun' }
        };

        render(
            <SchemaPageview
                globalContent={globalContent}
                layout="LN-Nota-Opinion"
            />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
            pagetype: 'nota',
            valor: 'comun',
            subtype: '3',
            nota_id: 'nota-opinion-1',
            isListenable: 'no',
            lectura: '0',
            palabras: 100
        });
    });
});
