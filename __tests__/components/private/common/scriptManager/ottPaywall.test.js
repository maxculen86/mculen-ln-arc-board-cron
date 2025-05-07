import OTTPaywall, {
    scriptLog
} from '../../../../../components/private/common/scriptManager/ottPaywall';
import React from 'react';
import { render } from '@testing-library/react';

describe('ottPaywall', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: ''
        });
        delete window.location;
        window.location = { href: 'dominioDeInicio.com' };
    });
    it('Should render if arcSite is ott', () => {
        const { container } = render(<OTTPaywall arcSite={'ott'} />);

        expect(container).toBeInTheDocument();
    });

    it('Shouldnt render if arcSite is la-nacion-ar', () => {
        const { container } = render(<OTTPaywall arcSite={'la-nacion-ar'} />);

        expect(container).toBeEmptyDOMElement();
    });
    it('Shouldnt render if arcSite is ott and isAdmin is true', () => {
        const { container } = render(
            <OTTPaywall arcSite={'ott'} isAdmin={true} />
        );

        expect(container).toBeEmptyDOMElement();
    });
    it('When dont find cookie productoPremiumId should redirect to paywall', () => {
        eval(scriptLog);
        expect(window.location.href).toBe(
            'https://suscripciones.lanacion.com.ar/suscripcion/E/2/?callback=ZG9taW5pb0RlSW5pY2lvLmNvbQ=='
        );
    });

    it('When cookie was finded should no redirect', () => {
        document.cookie = '; ProductoPremiumId=2,3';
        eval(scriptLog);
        expect(window.location.href).toBe('dominioDeInicio.com');
    });
});
