import React from 'react';
import { mount, render } from 'enzyme';

import ModSponsor from '../../../../components/private/common/mod-sponsor';
import formatDistributorName from '../../../../components/private/LN/common/utils/formatDistributorName';

jest.mock('../../../../components/private/common/com-logo', () => 'com-logo');

import Context from 'fusion:context';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    }
}));

describe('ModSponsor', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' },
        deployment: () => {},
        contextPath: ''
    }));
    it('Matches Snapshot', () => {
        const props = {
            type: '',
            sponsor: 'jardin',
            textName: null,
            link: '/revista-jardin',
            logoName: 'jardin'
        };
        const component = render(<ModSponsor {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Sets Logo', () => {
        const props = {
            type: '',
            sponsor: 'jardin',
            textName: '',
            link: '/revista-jardin',
            logoName: 'jardin'
        };
        const component = mount(<ModSponsor {...props} />);
        expect(component.find('com-logo')).toHaveLength(1);
    });

    it('Sets Content Lab', () => {
        const props = {
            type: '--contentlab',
            sponsor: 'jardin',
            textName: 'Volkswagen',
            link: '/revista-jardin'
        };
        const component = mount(<ModSponsor {...props} />);
        expect(component.find('.com-text')).toHaveLength(1);
        expect(component.html()).toContain('Content LAB para Volkswagen');
    });

    it('Sets Sponsored Content', () => {
        const props = {
            type: '',
            sponsor: 'jardin',
            textName: null,
            link: '/revista-jardin'
        };
        const component = mount(<ModSponsor {...props} />);
        expect(component.find('.com-text')).toHaveLength(1);
        expect(component.html()).toContain('Espacio Patrocinado');
    });

    it('Sets Logo and Content Lab', () => {
        const props = {
            type: '--contentlab',
            sponsor: '',
            textName: 'Volkswagen',
            link: '/revista-jardin',
            logoName: 'jardin'
        };
        const component = mount(<ModSponsor {...props} />);
        expect(component.find('.com-text')).toHaveLength(1);
        expect(component.find('com-logo')).toHaveLength(1);
        expect(component.html()).toContain('Content LAB para Volkswagen');
    });

    it('Sets Logo and Sponsored Content', () => {
        const props = {
            type: '',
            sponsor: 'jardin',
            textName: null,
            link: '/revista-jardin',
            logoName: 'jardin'
        };
        const component = mount(<ModSponsor {...props} />);
        expect(component.find('com-logo')).toHaveLength(1);
        expect(component.find('.com-text')).toHaveLength(1);
        expect(component.html()).toContain('Espacio Patrocinado');
    });

    it('Format distributor name', () => {
        const distributorFormated1 = formatDistributorName('El País (Uruguay)');
        const distributorFormated2 = formatDistributorName('Agencia CyTA');
        const distributorFormated3 = formatDistributorName('chequeado.com');
        const distributorFormated4 = formatDistributorName('tiempo/gda');
        expect(distributorFormated1).toEqual('el-pais-uruguay');
        expect(distributorFormated2).toEqual('agencia-cyta');
        expect(distributorFormated3).toEqual('chequeado-com');
        expect(distributorFormated4).toEqual('tiempo-gda');
    });
});
