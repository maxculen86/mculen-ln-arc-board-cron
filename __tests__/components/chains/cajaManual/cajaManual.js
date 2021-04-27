jest.mock(
    '../../../components/chains/cajaManual/cajaManual',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import CajaManual from '../../../components/chains/cajaManual/cajaManual';
import { getLabel } from '../../../../components/private/LN/home/components/noteCard/noteCardHelper';

describe('Test del Chain - <CajaManual />', () => {
    const idCollection = 'KHDMT2RDBFD2BNJM3W6GSAAWXE';
    const title = 'Caja Tema';
    const notesQuantity = '3 Notas';
    const hideCaja = false;
    const layout = 'grilla3';
    const chapita = 'Chapa Custom Field';
    const propMock = {};
    const customFields = {
        hideCaja,
        layout,
        chapita
    };

    const children = [
        {
            id_nota: 'QXMSDT6FFZBAPI4IMLUZRZOOLI',
            url_nota: '/deportes/test-noticia-en-arc-nid16032021/'
        },
        {
            id_nota: 'N2E4T4NJ25HU7PJ56T7CCGGXOM',
            url_nota:
                '/lifestyle/migracion-a-estados-unidos-que-ha…iden-en-la-frontera-con-mexico-nid16032021/'
        },
        {
            id_nota: 'GVFJYOZFHZAR7G6JCFNMQDXVCA',
            url_nota:
                '/deportes/futbol/el-boliviano-que-escapo-por…vivir-a-la-caida-del-avion-del-nid05032021/'
        }
    ];
    propMock.customFields = customFields;
    propMock.children = children;
    propMock.title = title;

    const component = mount(
        <CajaManual customFields={customFields}></CajaManual>
    );

    const mock = component.find('mock-component');
    it('Montaje del componente', () => {
        expect(mock.length).toBe(1);
    });

    it('Recibe customFields', () => {
        expect(mock.props('customFields').customFields).toBeTruthy();
        expect(mock.props('customFields').customFields).toEqual(customFields);
    });

    it('Recibe de customFields el campo obligatorio hideCaja', () => {
        expect(mock.props('customFields').customFields.hideCaja).toBeFalsy();
        expect(mock.props('customFields').customFields.hideCaja).toBe(false);
    });

    it('Recibe de customFields el campo obligatorio layout', () => {
        expect(mock.props('customFields').customFields.layout).toBeTruthy();
        expect(mock.props('customFields').customFields.layout).toBe(layout);
    });

    it('Variantes de chapita de customFields y de K&L', () => {
        const article = {
            label: {
                chapita: {
                    text: 'Chapa K&L'
                }
            }
        }
        
        expect(getLabel(article, customFields, true)).toBe('Chapa Custom Field');
        const customFieldsWithoutChapa = {
            ...customFields,
            chapita: undefined
        }
        expect(getLabel(article, customFieldsWithoutChapa, true)).toBe('Chapa K&L');

        expect(getLabel({}, customFieldsWithoutChapa, true)).toBe(undefined);
        expect(getLabel(article, customFields, false)).toBe(undefined);
    });
});
