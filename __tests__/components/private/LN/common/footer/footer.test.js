import React from 'react';
import { render } from 'enzyme';
import Footer from '../../../../../../components/private/LN/common/footer/index';

// TODO: Considerar importar el siguiente header en caso del footer sea usado con child
// para manjear header en el footer dinamico
// import Header from '../../../../../../components/private/LN/common/footer/header';

describe('Footer - LaNacion', () => {
    const component = render(<Footer />);
    it('Test de snapshot Detalle Receta', () => {
        expect(component).toMatchSnapshot();
    });
});
