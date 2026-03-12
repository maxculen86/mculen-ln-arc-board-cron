import React from 'react';
import { render } from '@testing-library/react';
import MetaTitle from '../../../../../components/private/common/metaTitle';

describe('LN - Common - MetaTitle', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        nodeType: 'section',
        title: 'El Gobierno evalúa postular a una diplomática de carrera para la embajada en el Vaticano'
    };

    it('MetaTitle nota snapshot', () => {
        render(<MetaTitle {...props} />);

        const metaTitle = document.head.querySelector('meta[name="title"]');
        expect(metaTitle).toMatchSnapshot();
    });

    it('should return null for arcSite value different from la-nacion-ar', () => {
        const customProps = { ...props, arcSite: 'dummy-arc-site' };
        render(<MetaTitle {...customProps} />);

        const metaTitle = document.head.querySelector('meta[name="title"]');
        expect(metaTitle).toBeNull();
    });

    it('should return title when requestUri is "mis-notas"', () => {
        const customProps = {
            ...props,
            requestUri: '/mis-notas'
        };
        render(<MetaTitle {...customProps} />);

        const metaTitle = document.head.querySelector('meta[name="title"]');
        expect(metaTitle).toBeInTheDocument();
        expect(metaTitle.getAttribute('content')).toBe(customProps.title);
    });

    it('should return the correct content for acusWithMeta', () => {
        const customProps = {
            ...props,
            section: 'dummy-section',
            title: 'Últimas noticias - LA NACION'
        };
        render(<MetaTitle {...customProps} />);

        const metaTitle = document.head.querySelector('meta[name="title"]');
        expect(metaTitle).toBeInTheDocument();
        expect(metaTitle.getAttribute('content')).toBe(
            'Últimas noticias - LA NACION'
        );
    });
});
