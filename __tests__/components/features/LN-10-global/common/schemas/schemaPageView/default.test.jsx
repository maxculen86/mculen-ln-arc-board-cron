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
            subtype: 'opinion',
            isListenable: true,
            content_restrictions: { content_code: 'cerrada' }
        };

        render(
            <SchemaPageview globalContent={globalContent} layout="LN-nota" />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
            pagetype: 'nota',
            valor: 'cerrada',
            subtype: 'opinion',
            nota_id: 'nota-2',
            isListenable: 'si'
        });
    });

    it('render a schema with pagetype "note" and the fields: value, subtype, note_id and isListenable in false', () => {
        const globalContent = {
            _id: 'nota-3',
            subtype: 'noticia',
            isListenable: false,
            content_restrictions: { content_code: 'abierta' }
        };

        render(
            <SchemaPageview globalContent={globalContent} layout="LN-nota" />
        );

        const scriptTag = document.getElementById('pageview');
        const json = JSON.parse(scriptTag.innerHTML);

        expect(json).toEqual({
            pagetype: 'nota',
            valor: 'abierta',
            subtype: 'noticia',
            nota_id: 'nota-3',
            isListenable: 'no'
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
});
