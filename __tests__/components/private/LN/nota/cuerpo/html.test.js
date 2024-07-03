import React from 'react';
import { render, screen } from '@testing-library/react';
import Html from '../../../../../../components/private/LN/nota/cuerpo/html';

describe('components - private - LN - nota - cuerpo - <Html />', () => {
    let props = {
        data: {
            content: '',
            _id: 'AHYEKXSUEQIUXZD'
        }
    };

    const setContent = content => {
        return {
            ...props,
            data: {
                ...props.data,
                content
            }
        };
    };

    it('should test if html is defined in document', () => {
        const { container } = render(<Html {...props} />);
        expect(container).toBeDefined();
    });

    it('should test it sample an html block correctly', () => {
        const __html = '<div>sample html block</div>';
        const { container } = render(<Html {...setContent(__html)} />);
        expect(container.innerHTML).not.toBeNull();
    });

    it('should test inner html returns empty when theres no html block', () => {
        const { container } = render(<Html {...props} />);
        expect(container.innerHTML).toBe('');
    });

    it('should test props validation for component', () => {
        const _props = {
            data: {
                content: '<p>Test Content</p>',
                _id: 'AHYEKXSUEQIUXZD'
            }
        };
        render(<Html {..._props} />);

        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByText('Test Content').parentNode).toHaveAttribute(
            'id',
            'anexo-AHYEKXSUEQIUXZD'
        );
        expect(screen.getByText('Test Content').parentNode).toHaveClass(
            'com-embed --html'
        );
    });

    it('should test node and attributes of html libre', () => {
        const __html =
            '<link rel="stylesheet" href="http://widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css"><div class="empty" style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;">sample html block</div>';
        const { container } = render(<Html {...setContent(__html)} />);
        const link = container.querySelector('link[rel="stylesheet"]');
        const div = container.querySelector('div.empty');

        expect(link).toBeDefined();
        expect(link).toHaveAttribute(
            'href',
            'http://widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css'
        );

        expect(div).toBeDefined();
        expect(div).toHaveStyle(
            'padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;'
        );
        expect(div).toHaveTextContent('sample html block');
    });

    it('should test node and attributes of html pym', () => {
        const __html =
            '<iframe class="pym" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/20/03/coronavirus-argentina/#/barras"> </iframe>';
        const { container } = render(<Html {...setContent(__html)} />);
        const iframe = container.querySelector('iframe');

        expect(iframe).toBeDefined();
        expect(iframe).toHaveAttribute(
            'src',
            'https://especialess3.lanacion.com.ar/20/03/coronavirus-argentina/?initialWidth=0&childId=anexo-AHYEKXSUEQIUXZD-0&parentTitle=&parentUrl=http%3A%2F%2Flocalhost%2F#/barras'
        );
        expect(iframe).toHaveAttribute('frameborder', '0');
        expect(iframe).toHaveAttribute('width', '100%');
        expect(iframe).toHaveAttribute('scrolling', 'no');
    });

    it('renders snapshot - HTML', () => {
        const __html =
            '<div class="empty" style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;">sample html block</div>';
        const { container } = render(<Html {...setContent(__html)} />);
        expect(container).toMatchSnapshot();
    });

    it('renders snapshot - iframe without "pym"', () => {
        const __html =
            '<iframe frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/20/03/coronavirus-argentina/#/barras"> </iframe>';
        const { container } = render(<Html {...setContent(__html)} />);
        expect(container).toMatchSnapshot();
    });

    it('renders snapshot - iframe with "pym"', () => {
        const __html =
            '<iframe class="pym" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/20/03/coronavirus-argentina/#/barras"> </iframe>';
        const { container } = render(<Html {...setContent(__html)} />);
        expect(container).toMatchSnapshot();
    });

    it('renders snapshot  - iframe with pym inside html block', () => {
        const __html =
            '<div class="test">    <h3 class="title">iframe dentro de un div</h3>    <iframe class="pym" frameborder="0" width="100%" height="800" scrolling="no" src="https://especialess3.lanacion.com.ar/tableau/tableau.html?id=coronavirus_tests_argentina_porcentajes&altoTV=460&altoD=460&altoM=410"> </iframe></div>';
        const { container } = render(<Html {...setContent(__html)} />);
        expect(container).toMatchSnapshot();
    });
});
