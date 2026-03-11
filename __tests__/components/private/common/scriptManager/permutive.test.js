import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import handleCookie from '../../../../../components/private/LN/common/utils/handleCookie';
import Permutive from '../../../../../components/private/common/scriptManager/Permutive';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/handleCookie',
    () => jest.fn()
);

describe('components - private - common - scriptManager - permutive', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            contextPath: '/path',
            deployment: jest.fn(path => `https://lanacion.com.ar${path}`),
            layout: 'default',
            globalContent: {
                publish_date: '2024-10-31',
                credits: { by: [{ name: 'Author Name' }] },
                headlines: { basic: 'Sample Headline' },
                taxonomy: {
                    tags: [{ text: 'tag1' }, { text: 'tag2' }],
                    primary_section: { name: 'News' }
                }
            }
        });

        handleCookie.mockReturnValue({
            getCookie: 'cookieValue'
        });
    });

    it('renders script tags with the correct attributes', () => {
        render(<Permutive />);

        const permutiveScript =
            document.head.querySelector('#script-permutive');
        const permutiveExternalScript = document.head.querySelector(
            'script[src="https://867f8423-d142-4fd1-ae8d-1a9bbbdf2358.edge.permutive.app/867f8423-d142-4fd1-ae8d-1a9bbbdf2358-web.js"]'
        );

        expect(permutiveScript).toBeInTheDocument();
        expect(permutiveScript).toHaveAttribute('data-layout', 'default');
        expect(permutiveScript).toHaveAttribute(
            'data-article',
            JSON.stringify({
                publishedAt: '2024-10-31',
                authors: ['Author Name'],
                keywords: ['tag1', 'tag2'],
                section: 'News',
                title: 'Sample Headline'
            })
        );
        expect(permutiveScript).toHaveAttribute(
            'data-get-cookie',
            'cookieValue'
        );
        expect(permutiveScript).toHaveAttribute('async');
        expect(permutiveScript).toHaveAttribute(
            'src',
            'https://lanacion.com.ar/path/resources/js/LN/Permutive.min.js'
        );

        expect(permutiveExternalScript).toBeInTheDocument();
        expect(permutiveExternalScript).toHaveAttribute('async');
    });
});
