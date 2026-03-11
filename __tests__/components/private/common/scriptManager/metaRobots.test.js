import React from 'react';
import { render } from '@testing-library/react';
import MetaRobots from '../../../../../components/private/common/scriptManager/MetaRobots';

describe('components - private - common - scriptManager - metaRobots', () => {
    it('renders a meta tag with name="robots" and content="noindex, nofollow"', () => {
        render(<MetaRobots />);

        const metaTag = document.head.querySelector('meta[name="robots"]');

        expect(metaTag).toBeInTheDocument();
        expect(metaTag).toHaveAttribute('content', 'noindex, nofollow');
    });
});
