import React from 'react';
import RenderAnexoByConfig from '../../../../../../components/private/common/utils/anexo/renderAnexoByConfig';
import { shallow } from 'enzyme';

describe('renderAnexoByConfig would draw if anexo config have data', () => {
    const anexoConfig = [
        'https://especialeslntools.lanacion.com.ar/generic-anexo_confianza/index.html',
        'S'
    ];
    const noAnexoConfig = [];
    it('Should render the component', () => {
        const component = shallow(
            <RenderAnexoByConfig anexoConfig={anexoConfig} />
        );
        expect(component).toMatchSnapshot();
    });
    it('Shouldnt render the component', () => {
        const component = shallow(
            <RenderAnexoByConfig anexoConfig={noAnexoConfig} />
        );
        expect(component).toMatchSnapshot();
    });
});
