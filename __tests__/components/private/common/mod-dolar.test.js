import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModDolar from '../../../../components/private/common/mod-dolar';
import SOURCE_RESPONSE from '../../../../__mocks__/data/apiDolar/sourceFullResponse.json';

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

describe('Private - Common - ModDolar =>', () => {
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

    it('Should match snapshot showing correct data for all 8 type of dolars', () => {
        const { container } = render(
            <ModDolar {...SOURCE_RESPONSE} oddOrEven="--even" />
        );
        expect(container).toMatchSnapshot();
    });
});
