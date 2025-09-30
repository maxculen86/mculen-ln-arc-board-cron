import React from 'react';
import { render } from '@testing-library/react';
import MetaTitle from '../../../../../components/private/common/metaTitle';

describe('LN - Common - MetaTitle', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        nodeType: 'section',
        title:
            'El Gobierno evalúa postular a una diplomática de carrera para la embajada en el Vaticano'
    };

    it('MetaTitle nota snapshot', () => {
        const { container } = render(<MetaTitle {...props} />);
        const metaTitle = container.querySelector('meta');
        expect(metaTitle).toMatchSnapshot();
    });

    it('should return null for arcSite value different from la-nacion-ar', () => {
        const customProps = { ...props, arcSite: 'dummy-arc-site' };
        const { container } = render(<MetaTitle {...customProps} />);
        const metaTitle = container.querySelector('meta');
        expect(metaTitle).toBeNull();
    });

    it('should return title when requestUri is "mis-notas"', () => {
        const customProps = {
            ...props,
            requestUri: '/mis-notas'
        };
        const { container } = render(<MetaTitle {...customProps} />);
        const metaTitle = container.querySelector('meta');
        expect(metaTitle).toBeInTheDocument();
        expect(metaTitle.getAttribute('content')).toBe(customProps.title);
    });

    it('should return the correct content for acusWithMeta', () => {
        const customProps = {
            ...props,
            section: 'dummy-section',
            title: 'Últimas noticias - LA NACION'
        };
        const { container } = render(<MetaTitle {...customProps} />);
        const metaTitle = container.querySelector('meta');
        expect(metaTitle).toBeInTheDocument();
        expect(metaTitle.getAttribute('content')).toBe(
            'Últimas noticias - LA NACION'
        );
    });
});
