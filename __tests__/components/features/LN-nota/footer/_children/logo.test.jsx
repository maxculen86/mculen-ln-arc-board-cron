import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import Logo from '../../../../../../components/features/LN-nota/footer/_children/logo';
import { getSectionLogo } from '../../../../../../components/private/common/utils/sectionUtils';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../components/private/common/utils/sectionUtils',
    () => ({
        getSectionLogo: jest.fn()
    })
);

jest.mock('@ln/contenidos-ui-link', () => ({
    Link: ({ href, children }) => <a href={href}>{children}</a>
}));

jest.mock('@ln/common-ui-adaptableimage', () => ({
    Adaptableimage: ({ src, alt }) => <img src={src} alt={alt} />
}));

describe('components - feature - LN-nota - footer - _children - Logo', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the autos logo correctly when data is provided', () => {
        useAppContext.mockReturnValue({
            deployment: logoName => `http://arc.lanacion.com.ar${logoName}`,
            contextPath: '/pf',
            globalContent: {
                distributor: { name: 'Xinhua' },
                taxonomy: { sections: [{}] }
            }
        });

        const logoData = {
            path: '/autos/',
            logoName: 'autos'
        };

        const { getByAltText, getByRole } = render(
            <Logo logoData={logoData} />
        );

        expect(getByRole('link')).toHaveAttribute('href', '/autos/');
        expect(getByAltText('autos')).toHaveAttribute(
            'src',
            'http://arc.lanacion.com.ar/pf/resources/images/autos.svg'
        );
    });

    it('returns null if there is no valid logo', () => {
        useAppContext.mockReturnValue({
            deployment: logoName => `http://arc.lanacion.com.ar${logoName}`,
            contextPath: '/pf'
        });

        const { container } = render(<Logo logoData={null} />);

        expect(container.firstChild).toBeNull();
    });

    it('does not render when logoName is "canchallena"', () => {
        useAppContext.mockReturnValue({
            deployment: logoName => `http://arc.lanacion.com.ar${logoName}`,
            contextPath: '/pf'
        });

        const logoData = {
            path: '/sports',
            logoName: 'canchallena'
        };

        const { container } = render(<Logo logoData={logoData} />);

        expect(container.firstChild).toBeNull();
    });
});
