import React from 'react';
import { render } from '@testing-library/react';
import getSectionName from '../../../../../components/private/LN/common/utils/getSectionName';
import PostBid from '../../../../../components/private/common/scriptManager/postbid';

jest.mock('../../../../../components/private/LN/common/utils/getSectionName', () => jest.fn());

describe('PostBid Component', () => {
    const mockGlobalContent = {
        type: 'someType',
        node_type: 'someNodeType',
    };

    beforeEach(() => {
        process.env.IS_DEV = 'true';
        process.env.IS_SANDBOX = 'true';
    });

    afterEach(() => {
        delete process.env.IS_DEV;
        delete process.env.IS_SANDBOX;
    });

    test('renders script tags when section name is nota', () => {
        getSectionName.mockReturnValue('nota');
        const { container } = render(<PostBid globalContent={mockGlobalContent} />);

        const scriptTags = container.querySelectorAll('script');
        expect(scriptTags.length).toBe(2);

        const [srcScript, inlineScript] = scriptTags;
        expect(srcScript).toHaveAttribute('src', 'https://micro.rubiconproject.com/prebid/dynamic/20148.js');
        expect(srcScript).toHaveAttribute('async');

        expect(inlineScript.innerHTML).toContain('var pbjs = pbjs || {};');
        expect(inlineScript.innerHTML).toContain('pbjs.que = pbjs.que || [];');
    });

    test('does not render script tags when section name is not nota or acumulado', () => {
        getSectionName.mockReturnValue('other');
        const { container } = render(<PostBid globalContent={mockGlobalContent} />);

        expect(container.querySelector('script')).toBeNull();
    });
});