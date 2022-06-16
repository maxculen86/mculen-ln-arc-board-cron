import React from 'react';
import Context from 'fusion:context';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import { mount, render } from 'enzyme';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import AperturaConDestacado from '../../../../../components/private/LN/nota/apertura/AperturaReceta/AperturaConDestacado';
import AperturaSinDestacado from '../../../../../components/private/LN/nota/apertura/AperturaReceta/AperturaSinDestacado';
import AperturaReceta from '../../../../../components/private/LN/nota/apertura/AperturaReceta/aperturaReceta';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
Context.useAppContext = jest.fn(() => ({
    subtype: 7
}));

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

describe('features - La Nacion - Components - Nota - AperturaReceta', () => {
    it('Debe renderizar correctamente, con destacado', () => {
        const component = mount(<AperturaReceta globalContent={nota} />);

        expect(component).toBeDefined();
        expect(component.find(AperturaSinDestacado)).toHaveLength(0);
        expect(component.find(AperturaConDestacado)).toHaveLength(1);
    });
    it('Snapshot - anexo con destacado', () => {
        const component = render(<AperturaReceta globalContent={nota} />);
        expect(component).toMatchSnapshot();
    });

    it('Sin promo_items basic debe renderizar correctamente, sin destacado', () => {
        nota.promo_items.basic = undefined;
        const component = mount(<AperturaReceta globalContent={nota} />);

        expect(component).toBeDefined();
        expect(component.find(AperturaSinDestacado)).toHaveLength(1);
        expect(component.find(AperturaConDestacado)).toHaveLength(0);
    });
    it('Snapshot - sin promo_items basic debe renderizar correctamente, sin destacado', () => {
        nota.promo_items.basic = undefined;
        const component = render(<AperturaReceta globalContent={nota} />);
        expect(component).toMatchSnapshot();
    });

    it('Sin tags, sectios ni promo_items debe retornar null', () => {
        nota.promo_items = undefined;
        nota.taxonomy.tags = [];
        nota.taxonomy.primary_section = undefined;
        nota.taxonomy.sections = [];
        const component = mount(<AperturaReceta globalContent={nota} />);

        expect(component).toBeDefined();
        expect(component.find(AperturaSinDestacado)).toHaveLength(0);
        expect(component.find(AperturaConDestacado)).toHaveLength(0);
        expect(component.html()).toBeNull();
    });
});
