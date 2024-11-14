import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SITE_FOODIT } from 'fusion:environment';
import BuildComments from '../../../../../../components/features/foodit-global/common/MetaCommentsViafoura/foodit';

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit.lanacion.com.ar'
}));

describe('Components - Features - Foodit-global - Common - MetaCommentsViafoura', () => {
    const layoutsName = {
        FooditFichaReceta: 'Foodit-ficha-receta',
        FooditFichaNota: 'Foodit-ficha-nota'
    };

    it('renders empty fragment when layout does not allow comments', () => {
        render(
            <BuildComments
                layout="some-other-layout"
                allowComments={true}
                layoutsName={layoutsName}
            />
        );

        const metaElements = document.querySelectorAll('meta');
        expect(metaElements.length).toBe(0);
    });

    it('renders empty fragment when allowComments is false', () => {
        render(
            <BuildComments
                layout="Foodit-ficha-receta"
                allowComments={false}
                layoutsName={layoutsName}
            />
        );

        const metaElements = document.querySelectorAll('meta');
        expect(metaElements.length).toBe(0);
    });

    it('renders meta tags when layout allows comments and allowComments is true', () => {
        const props = {
            _id: '123',
            canonicalUrl: '/some-url',
            mobile: 'Mobile Title',
            basic: 'Basic Title',
            layout: 'Foodit-ficha-receta',
            allowComments: true,
            layoutsName
        };

        render(<BuildComments {...props} />);

        const containerIdMeta = document.querySelector(
            'meta[name="vf:container_id"]'
        );
        const langMeta = document.querySelector('meta[name="vf:lang"]');
        const urlMeta = document.querySelector('meta[name="vf:url"]');
        const titleMeta = document.querySelector('meta[name="vf:title"]');

        expect(containerIdMeta).not.toBeNull();
        expect(containerIdMeta.getAttribute('content')).toBe(props._id);

        expect(langMeta).not.toBeNull();
        expect(langMeta.getAttribute('content')).toBe('es');

        expect(urlMeta).not.toBeNull();
        expect(urlMeta.getAttribute('content')).toBe(
            `${SITE_FOODIT}${props.canonicalUrl}`
        );

        expect(titleMeta).not.toBeNull();
        expect(titleMeta.getAttribute('content')).toBe(
            props.mobile || props.basic
        );
    });
});
