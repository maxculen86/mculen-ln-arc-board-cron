import React from 'react';
import { render } from '@testing-library/react';
import ScriptHtmlLibre from '../../../../../components/private/common/scriptManager/scriptHtmlLibre';

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

describe('ScriptHtmlLibre', () => {
    it('should render the script tag when type is "story" and promo_items.basic contains raw_html with pym class', () => {
        const props = {
            globalContent: {
                type: 'story',
                promo_items: {
                    basic: {
                        type: 'raw_html',
                        content: '<div class="pym"></div>'
                    }
                },
                content_elements: []
            }
        };

        const { container } = render(<ScriptHtmlLibre {...props} />);
        expect(container.querySelector('script')).toBeInTheDocument();
        expect(container.querySelector('script').src).toBe(
            'https://cdnjs.cloudflare.com/ajax/libs/pym/1.2.0/pym.v1.min.js'
        );
    });

    it('should render the script tag when type is "story" and content_elements contains raw_html with pym class', () => {
        const props = {
            globalContent: {
                type: 'story',
                promo_items: {},
                content_elements: [
                    {
                        type: 'raw_html',
                        content: '<div class="pym"></div>'
                    }
                ]
            }
        };

        const { container } = render(<ScriptHtmlLibre {...props} />);
        expect(container.querySelector('script')).toBeInTheDocument();
        expect(container.querySelector('script').src).toBe(
            'https://cdnjs.cloudflare.com/ajax/libs/pym/1.2.0/pym.v1.min.js'
        );
    });

    it('should not render the script tag when type is not "story"', () => {
        const props = {
            globalContent: {
                type: 'article',
                promo_items: {
                    basic: {
                        type: 'raw_html',
                        content: '<div class="pym"></div>'
                    }
                },
                content_elements: []
            }
        };

        const { container } = render(<ScriptHtmlLibre {...props} />);
        expect(container.querySelector('script')).not.toBeInTheDocument();
    });

    it('should not render the script tag if globalContent is empty', () => {
        const props = {};

        const { container } = render(<ScriptHtmlLibre {...props} />);
        expect(container.querySelector('script')).not.toBeInTheDocument();
    });
});
