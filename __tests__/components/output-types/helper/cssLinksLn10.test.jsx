import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CssLinksLn10 from '../../../../components/output-types/Helper/cssLinksLn10';
import config from '../../../../properties/sites/la-nacion-ar';

describe('Components - outputType - helper - CssLinksLn10', () => {
    const CssLinks = () => (
        <link
            href="/pf/dist/components/output-types/default.css"
            id="fusion-output-type-styles"
            rel="stylesheet"
            type="text/css"
        />
    );

    const mockGlobalContent = {
        _id: '/test-section',
        taxonomy: {
            primary_section: {
                _id: '/test-section'
            }
        }
    };

    const {
        layoutsName: { HomeLN10, NotaOpinion }
    } = config;

    it('should return null when layout is HomeLN10 (excluded layout)', () => {
        const { container } = render(
            <CssLinksLn10
                CssLinks={CssLinks}
                globalContent={mockGlobalContent}
                layout={HomeLN10}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('should return null when layout is NotaOpinion (excluded layout)', () => {
        const { container } = render(
            <CssLinksLn10
                CssLinks={CssLinks}
                globalContent={mockGlobalContent}
                layout={NotaOpinion}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('should return <CssLinks> when layout is neither HomeLN10 nor NotaOpinion', () => {
        const { container } = render(
            <CssLinksLn10
                CssLinks={CssLinks}
                globalContent={mockGlobalContent}
                layout="OtherLayout"
            />
        );

        expect(container.querySelector('link')).toBeInTheDocument();
        expect(container.querySelector('link')).toHaveAttribute(
            'id',
            'fusion-output-type-styles'
        );
    });

    it('should return <CssLinks> with different globalContent and allowed layout', () => {
        const differentGlobalContent = {
            _id: '/another-section',
            taxonomy: {
                primary_section: {
                    _id: '/another-section'
                }
            }
        };

        const { container } = render(
            <CssLinksLn10
                CssLinks={CssLinks}
                globalContent={differentGlobalContent}
                layout="CustomLayout"
            />
        );

        expect(container.querySelector('link')).toBeInTheDocument();
    });
});
