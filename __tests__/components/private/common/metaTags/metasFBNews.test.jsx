import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MetasFBNews from '../../../../../components/private/common/metaTags/metasFBNews';

describe('LN - Common - MetasFBNews', () => {
    it('should renders nothing if nodeType is not "nota"', () => {
        const { container } = render(
            <MetasFBNews nodeType="acumulado" sections={[]} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should renders nothing if sections are empty', () => {
        const { container } = render(
            <MetasFBNews nodeType="nota" sections={[]} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should renders meta tag with content "true" if sections include "/opinion"', () => {
        const sections = [{ _id: '/opinion' }];

        render(<MetasFBNews nodeType="nota" sections={sections} />);

        const metaTag = document.querySelector(
            'meta[property="article:opinion"]'
        );

        expect(metaTag).toBeInTheDocument();
        expect(metaTag).toHaveAttribute('content', 'true');
    });

    it('should renders meta tag with content "false" if sections do not include "/opinion"', () => {
        const sections = [{ _id: '/propiedades' }];

        render(<MetasFBNews nodeType="nota" sections={sections} />);

        const metaTag = document.querySelector(
            'meta[property="article:opinion"]'
        );

        expect(metaTag).toHaveAttribute('content', 'false');
    });
});
