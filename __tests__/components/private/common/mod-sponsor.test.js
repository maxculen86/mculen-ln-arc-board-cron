import React from 'react';
import { mount, render } from 'enzyme';

import ModSponsor from '../../../../components/private/common/mod-sponsor';
import formatDistributorName from '../../../../components/private/LN/common/utils/formatDistributorName';

describe('ModSponsor', () => {
    it('Matches Snapshot', () => {
        const props = {
            type: '',
            sponsor: 'jardin',
            textName: null,
            link: '/revista-jardin'
        };
        const component = render(<ModSponsor {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Sets Logo', () => {
        const props = {
            type: '',
            sponsor: 'jardin',
            textName: '',
            link: '/revista-jardin'
        };
        const component = mount(<ModSponsor {...props} />);
        expect(component.find('.com-logo')).toHaveLength(1);
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

    it('Format distributor name', () => {
        const distributorFormated1 = formatDistributorName('El País (Uruguay)');
        const distributorFormated2 = formatDistributorName('Agencia CyTA');
        const distributorFormated3 = formatDistributorName('chequeado.com');
        expect(distributorFormated1).toEqual('el-pais-uruguay');
        expect(distributorFormated2).toEqual('agencia-cyta');
        expect(distributorFormated3).toEqual('chequeado-com');
    });
});
