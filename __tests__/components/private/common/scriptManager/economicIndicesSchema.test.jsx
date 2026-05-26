import React from 'react';
import { render } from '@testing-library/react';
import EconomicIndicesSchema, {
    EconomicIndicesDetailSchema
} from '../../../../../components/private/common/scriptManager/economicIndicesSchema';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        contextPath: '/pf',
        deployment: value => `${value}?d=5634`
    }))
}));

const getOrganizationSchema = container => {
    const script = container.querySelector(
        'script[type="application/ld+json"]'
    );
    const schema = JSON.parse(script.innerHTML);

    return schema['@graph'][0];
};

describe('EconomicIndicesSchema', () => {
    const expectedLogoUrl =
        'https://www.lanacion.com.ar/pf/resources/images/logo-ln.png?d=5634';

    it('should use the official LA NACION logo in the home organization schema', () => {
        const { container } = render(<EconomicIndicesSchema />);
        const organization = getOrganizationSchema(container);

        expect(organization.logo).toEqual({
            '@type': 'ImageObject',
            url: expectedLogoUrl,
            height: 60,
            width: 600
        });
    });

    it('should use the official LA NACION logo in detail organization schemas', () => {
        const { container } = render(
            <EconomicIndicesDetailSchema
                serviceItem="merval"
                dataService={{ cotizaciones: [] }}
            />
        );
        const organization = getOrganizationSchema(container);

        expect(organization.logo.url).toBe(expectedLogoUrl);
        expect(organization.logo.url).not.toContain('placeholder');
        expect(organization.logo.height).toBe(60);
        expect(organization.logo.width).toBe(600);
    });
});
