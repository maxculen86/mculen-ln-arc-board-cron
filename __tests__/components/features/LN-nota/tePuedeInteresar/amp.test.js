import React from 'react';
import { render, screen } from '@testing-library/react';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import TePuedeInteresar from '../../../../../components/features/LN-nota/tePuedeInteresar/amp';
import articlesMock from '../../../../../__mocks__/data/tePuedeInteresar/liftigniterResponse.json';
import useTermica from '../../../../../components/private/common/hooks/useTermica';

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    globalContent: {},
    requestUri: ''
}));

const props = {
    customFields: { cantidadNotas: 2 },
    siteProperties: {},
    outputType: 'amp'
};

describe('TePuedeIneresarAmp', () => {
    it('Should return a empty div when the termica is disabled', () => {
        useTermica.mockImplementation(() => false);
        const { container } = render(<TePuedeInteresar {...props} />);
        expect(container).toMatchInlineSnapshot(`<div />`);
    });

    it('should render the component with AMP tags when thermal is enabled.', () => {
        useTermica.mockImplementation(() => true);
        useContent.mockImplementation(() => articlesMock);
        const { container } = render(<TePuedeInteresar {...props} />);
        const tagsAmpImage = container.querySelectorAll('amp-img');

        expect(tagsAmpImage).toBeDefined();
        expect(tagsAmpImage).toHaveLength(2);
        expect(screen.getAllByRole('article')).toHaveLength(2);
        expect(screen.getByText('Te puede interesar')).toBeDefined();
        expect(container).toMatchSnapshot();
    });

    it('It should not render the component when there are no items.', () => {
        useContent.mockImplementation(() => []);
        const { container } = render(<TePuedeInteresar {...props} />);
        expect(container).toMatchInlineSnapshot(`<div />`);
    });
});
