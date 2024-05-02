import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Html from '../../../../../../components/features/private-global/body/html/foodit';

describe('BodyComponents - Foodit - Html', () => {
    const defaultProps = {
        data: {
            content: '',
            _id: 'AHYEKXSUEQIUXZD'
        }
    };

    const renderHtml = (content = '') => {
        return render(<Html data={{ ...defaultProps.data, content }} />);
    };

    it('<Html/> should be defined', () => {
        const { container } = renderHtml();
        expect(container).toBeDefined();
    });

    it('Should innerHTML', () => {
        const { container } = renderHtml('<div>sample html block</div>');
        expect(container.innerHTML).toMatch('sample html block');
    });

    it('Should innerHTML', () => {
        const { container } = renderHtml();
        expect(container.innerHTML).toBe('');
    });

    it('Should innerHTML without props', () => {
        const { container } = render(<Html />);
        expect(container.innerHTML).toBe('');
    });

    it('Should have html properties', () => {
        const __html =
            '<link rel="stylesheet" href="http://widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css"><div class="empty" style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;">sample html block</div>';
        renderHtml(__html);
        expect(screen.getByText('sample html block')).toBeInTheDocument();
        const linkElement = document.querySelector('link[rel="stylesheet"]');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute(
            'href',
            'http://widget.cloud.opta.net/v3/css/v3.football.opta-widgets.css'
        );
    });

    it('Should match snapshots - HTML', () => {
        const { asFragment } = renderHtml(
            '<div class="empty" style="padding: 20px;background-color:#333;color:white;text-align:center;font-size:2em;">sample html block</div>'
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
