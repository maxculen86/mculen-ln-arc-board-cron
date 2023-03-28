import React from 'react';
import Context from 'fusion:context';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
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

jest.mock(
    '../../../../../components/private/LN/nota/apertura/AperturaReceta/AperturaConDestacado',
    () => 'mock-apertura-con-destacado'
);
jest.mock(
    '../../../../../components/private/LN/nota/apertura/AperturaReceta/AperturaSinDestacado',
    () => 'mock-apertura-sin-destacado'
);

describe('features - La Nacion - Components - Nota - AperturaReceta', () => {
    it('Debe renderizar correctamente, con destacado', () => {
        const { container } = render(<AperturaReceta globalContent={nota} />);

        expect(container).toBeDefined();
        expect(
            container.getElementsByTagName('mock-apertura-con-destacado')[0]
        ).toBeInTheDocument();
    });
    it('Snapshot - anexo con destacado', () => {
        const { container } = render(<AperturaReceta globalContent={nota} />);

        expect(container).toMatchSnapshot();
    });
    it('Sin promo_items basic debe renderizar correctamente, sin destacado', () => {
        nota.promo_items.basic = undefined;
        const { container } = render(<AperturaReceta globalContent={nota} />);

        expect(container).toBeDefined();
        expect(
            container.getElementsByTagName('mock-apertura-sin-destacado')[0]
        ).toBeInTheDocument();
    });
    it('Snapshot - sin promo_items basic debe renderizar correctamente, sin destacado', () => {
        nota.promo_items.basic = undefined;
        const { container } = render(<AperturaReceta globalContent={nota} />);

        expect(container).toMatchSnapshot();
    });

    it('Sin tags, sectios ni promo_items debe retornar null', () => {
        nota.promo_items = undefined;
        nota.taxonomy.tags = [];
        nota.taxonomy.primary_section = undefined;
        nota.taxonomy.sections = [];
        const { container } = render(<AperturaReceta globalContent={nota} />);

        expect(container).toBeEmptyDOMElement();
    });
});
