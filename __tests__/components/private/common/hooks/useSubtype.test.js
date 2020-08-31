import React from 'react';
import { mount } from 'enzyme';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

import useSubtype from '../../../../../components/private/common/hooks/useSubtype';
import dataLayerScriptReceta from '../../../../../components/private/LN/nota/dataLayer/dataLayerScriptReceta';
import dataLayerScriptNota from '../../../../../components/private/LN/nota/dataLayer/dataLayerScriptNota';

describe('Private - Common - Hooks - useSubtype', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '7' }
    }));

    const { subtipo } = useSubtype();
    it('Deberia trar el subtipo Receta', () => {
        expect(subtipo.id).toEqual('7');
        const dataLayer = subtipo.execute('getDataLayer');
        expect(dataLayer).toEqual(dataLayerScriptReceta);
    });
});

describe('Private - Common - Hooks - useSubtype', () => {
    const globalContent = {
        subtype: '99',
        content_restrictions: {
            content_code: 'comun'
        }
    };
    Context.useAppContext = jest.fn(() => ({
        globalContent: globalContent
    }));

    const { subtipo } = useSubtype();
    it('Deberia trar el subtipo Generico', () => {
        expect(subtipo.id).toEqual('0');
        const dataLayer = subtipo.execute('getDataLayer', globalContent);
        expect(dataLayer).toMatchSnapshot();
    });
});
