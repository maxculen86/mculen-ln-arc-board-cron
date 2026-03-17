import React from 'react';
import Context from 'fusion:context';
import { render, screen, waitFor } from '@testing-library/react';
import footerEventLogResult from '../../../../../__mocks__/data/LN10_Footer/footerEventLogResult.json';
import Footer from '../../../../../components/private/LN10/footer';
import { setEventsFooter } from '../../../../../components/private/common/utils/eventsHelper';

jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://www.lanacion.com.ar',
        SITIO_SEGURO_REGISTRACION: 'https://suscripciones.lanacion.com.ar'
    };
});

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});
jest.mock('../../../../../components/private/common/utils/dateAndTimeUtil');
jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = { outputType: 'amp' };
        return props.children(mockAvailableProps);
    }
}));
const deployment = (deploymentValue = 'lanacion.com.ar') => deploymentValue;
describe('Tests - Footer - LN10', () => {
    Context.useAppContext = jest.fn(() => ({
        contextPath: '/pf',
        deployment
    }));
    global.window.dataLayer = [];

    let component;
    beforeEach(() => {
        component = render(<Footer />);
    });

    test('should first', () => {
        expect(screen.getAllByRole('link')).toHaveLength(41);
    });

    test('should match snapshot of footer.', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer');
        expect(footer).toMatchSnapshot();
    });

    test('should register in dataLayer the click events of each link', async () => {
        setEventsFooter();
        const links = screen.getAllByRole('link');
        links.forEach(link => link.click());

        await waitFor(() => {
            expect(window.dataLayer).toEqual(footerEventLogResult);
        });
    });
});
