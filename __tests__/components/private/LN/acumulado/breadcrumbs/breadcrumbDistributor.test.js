jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock(
    '../../../../../../components/private/LN/common/breadcrumbBase',
    () =>
        function MockBreadCrumbBase({ sections, dataSection }) {
            return (
                <div data-testid="breadcrumb-base" data-section={dataSection}>
                    {sections.map(s => (
                        <span
                            key={s.path}
                            data-testid="section"
                            data-path={s.path}
                        >
                            {s.name}
                        </span>
                    ))}
                </div>
            );
        }
);

jest.mock(
    '../../../../../../components/private/LN/common/breadcrumbSchema',
    () =>
        function MockBreadCrumbSchema({ sections }) {
            return (
                <div data-testid="breadcrumb-schema">
                    {sections.map(s => (
                        <span key={s.path} data-path={s.path} />
                    ))}
                </div>
            );
        }
);

import React from 'react';
import { render } from '@testing-library/react';
import BreadcrumbDistributor from '../../../../../../components/private/LN/acumulado/breadcrumb/breadcrumbDistributor';

describe('BreadcrumbDistributor', () => {
    const REQUEST_URI = '/distribuidores/test-distribuidor/';
    const NAME = 'Test Distribuidor';

    it('uses SITE_LANACION as the root section path', () => {
        const { getAllByTestId } = render(
            <BreadcrumbDistributor name={NAME} requestUri={REQUEST_URI} />
        );
        const sections = getAllByTestId('section');
        expect(sections[0]).toHaveAttribute(
            'data-path',
            'https://www.lanacion.com.ar'
        );
    });

    it('uses requestUri as the distributor section path', () => {
        const { getAllByTestId } = render(
            <BreadcrumbDistributor name={NAME} requestUri={REQUEST_URI} />
        );
        const sections = getAllByTestId('section');
        expect(sections[1]).toHaveAttribute('data-path', REQUEST_URI);
        expect(sections[1]).toHaveTextContent(NAME);
    });

    it('falls back to "/" when SITE_LANACION is undefined', () => {
        jest.resetModules();
        jest.doMock('fusion:environment', () => ({ SITE_LANACION: undefined }));

        const BreadcrumbDistributorFallback =
            require('../../../../../../components/private/LN/acumulado/breadcrumb/breadcrumbDistributor').default;

        const { getAllByTestId } = render(
            <BreadcrumbDistributorFallback
                name={NAME}
                requestUri={REQUEST_URI}
            />
        );
        const sections = getAllByTestId('section');
        expect(sections[0]).toHaveAttribute('data-path', '/');
    });

    it('passes sections to BreadCrumbSchema without host prop', () => {
        const { getByTestId } = render(
            <BreadcrumbDistributor name={NAME} requestUri={REQUEST_URI} />
        );
        expect(getByTestId('breadcrumb-schema')).toBeTruthy();
    });

    it('renders both BreadCrumbBase and BreadCrumbSchema', () => {
        const { getByTestId } = render(
            <BreadcrumbDistributor name={NAME} requestUri={REQUEST_URI} />
        );
        expect(getByTestId('breadcrumb-base')).toBeTruthy();
        expect(getByTestId('breadcrumb-schema')).toBeTruthy();
    });
});
