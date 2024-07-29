import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SOURCE_RESPONSE from '../../../../__mocks__/data/apiDolar/sourceFullResponse.json';
import ModDolar from '../../../../components/features/LN-10-global/common/cajaDolar/components/mod-dolar';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    ARC_STATIC: 'https://arc-static.glanacion.com'
}));

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        const deployment = (deploymentValue = 'lanacion.com.ar') =>
            deploymentValue;
        return props => (
            <Component {...props} deployment={deployment} contextPath="/pf" />
        );
    };
});

describe('Features - LN-10-Global  - Common - ModDolar =>', () => {
    it('With empty data list ', () => {
        const { container } = render(<ModDolar />);
        expect(container).toBeEmptyDOMElement();
    });
});

describe('With data list', () => {
    it('Should render div tag with "mod-dolar" className with 8 li tags', () => {
        const { container } = render(<ModDolar {...SOURCE_RESPONSE} />);
        const ul = container.getElementsByTagName('ul');
        const li = container.getElementsByTagName('li');
        expect(li).toHaveLength(8);
        expect(ul[0]).toBeVisible();
    });
    it('Should show all 8 titles for each type of dolar', () => {
        render(<ModDolar {...SOURCE_RESPONSE} />);
        expect(screen.getByText('Dólar oficial')).toBeVisible();
        expect(screen.getByText('Dólar blue')).toBeVisible();
        expect(screen.getByText('Dólar CCL')).toBeVisible();
        expect(screen.getByText('Dólar tarjeta')).toBeVisible();
        expect(screen.getByText('Dólar turista')).toBeVisible();
        expect(screen.getByText('Euro')).toBeVisible();
        expect(screen.getByText('Dólar MEP')).toBeVisible();
        expect(screen.getByText('Dólar mayorista')).toBeVisible();
    });
});

describe('When the _id !== "/economia/dolar-oficial-historico"', () => {
    it('Should match snapshot showing correct data for all 8 type of dolars', () => {
        const { container } = render(
            <ModDolar {...SOURCE_RESPONSE} oddOrEven="--even" />
        );
        expect(container).toMatchSnapshot();
    });

    it('Should render link: go to historical official dollar', () => {
        render(
            <ModDolar {...SOURCE_RESPONSE} _id="/economia" oddOrEven="--even" />
        );
        expect(screen.getAllByRole('link')[7]).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar/dolar-oficial-historico/'
        );
        expect(screen.getAllByRole('link')[7]).toBeVisible();
    });
});

describe('When the _id === "/economia/dolar-oficial-historico"', () => {
    it('Should match the snapshot showing the correct data for all 8 dollar types without showing the: Go to historical official dollar link', () => {
        const { container } = render(
            <ModDolar
                _id="/economia/dolar-oficial-historico"
                {...SOURCE_RESPONSE}
                oddOrEven="--even"
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('Should not render link: go to historical official dollar', () => {
        render(
            <ModDolar
                {...SOURCE_RESPONSE}
                _id="/economia/dolar-oficial-historico"
                oddOrEven="--even"
            />
        );
        const historicalOfficialDollarLink = screen.queryByRole('link', {
            name: 'Ir a dólar oficial histórico'
        });
        expect(historicalOfficialDollarLink).not.toBeInTheDocument();
    });
});
