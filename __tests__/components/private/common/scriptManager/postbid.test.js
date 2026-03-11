import React from 'react';
import { render } from '@testing-library/react';
import getSectionName from '../../../../../components/private/LN/common/utils/getSectionName';
import PostBid from '../../../../../components/private/common/scriptManager/postbid';

jest.mock(
    '../../../../../components/private/LN/common/utils/getSectionName',
    () => jest.fn()
);

describe('PostBid Component', () => {
    const mockGlobalContent = {
        type: 'someType',
        node_type: 'someNodeType'
    };

    beforeEach(() => {
        process.env.IS_DEV = 'true';
        process.env.IS_SANDBOX = 'true';
    });

    afterEach(() => {
        delete process.env.IS_DEV;
        delete process.env.IS_SANDBOX;

        document.head
            .querySelectorAll('script[src*="rubiconproject"]')
            .forEach(s => s.remove());
    });

    test('renders script tags when section name is nota', () => {
        getSectionName.mockReturnValue('nota');
        const { container } = render(
            <PostBid globalContent={mockGlobalContent} />
        );

        const srcScript = document.head.querySelector(
            'script[src*="rubiconproject"]'
        );

        const inlineScripts = Array.from(
            container.querySelectorAll('script:not([src])')
        ).filter(s => s.innerHTML.includes('pbjs'));

        expect(srcScript).toBeInTheDocument();
        expect(srcScript).toHaveAttribute(
            'src',
            'https://micro.rubiconproject.com/prebid/dynamic/20148.js'
        );
        expect(srcScript).toHaveAttribute('async');

        expect(inlineScripts.length).toBeGreaterThanOrEqual(1);
        const inlineScript = inlineScripts.find(s =>
            s.innerHTML.includes('var pbjs = pbjs || {}')
        );
        expect(inlineScript.innerHTML).toContain('var pbjs = pbjs || {};');
        expect(inlineScript.innerHTML).toContain('pbjs.que = pbjs.que || [];');
    });

    test('does not render script tags when section name is not nota or acumulado', () => {
        getSectionName.mockReturnValue('other');
        render(<PostBid globalContent={mockGlobalContent} />);

        const rubiconScript = document.head.querySelector(
            'script[src*="rubiconproject"]'
        );
        expect(rubiconScript).toBeNull();
    });
});
