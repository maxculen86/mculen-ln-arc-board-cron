import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import AmazonPublisherServices from '../../../../../components/private/common/scriptManager/amazonPublisherServices';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('components - private - common - scriptManager - amazonPublisherServices', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            contextPath: '/path',
            deployment: jest.fn(path => `https://example.com${path}`)
        });
    });

    afterEach(() => {
        document.head
            .querySelectorAll('#scriptAmazonPublisherServices')
            .forEach(s => s.remove());
    });

    it('renders the script tag with the correct src when location is "head"', () => {
        render(<AmazonPublisherServices location="head" />);

        const scriptTag = document.head.querySelector(
            '#scriptAmazonPublisherServices'
        );

        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag).toHaveAttribute(
            'src',
            'https://example.com/path/resources/js/LN/scriptAmazonPublisherServices.min.js'
        );
        expect(scriptTag).toHaveAttribute('async');
        expect(scriptTag).toHaveAttribute('type', 'text/javascript');
    });

    it('does not render the script tag when location is not "head"', () => {
        render(<AmazonPublisherServices location="body" />);

        const scriptTag = document.head.querySelector(
            '#scriptAmazonPublisherServices'
        );

        expect(scriptTag).not.toBeInTheDocument();
    });
});
