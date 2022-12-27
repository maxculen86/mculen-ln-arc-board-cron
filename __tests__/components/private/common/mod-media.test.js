import React from 'react';
import ModMedia from '../../../../components/private/common/mod-media';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Components - Private - Common - Mod-media', () => {
    it('should test section props and children', () => {
        const props = {
            idMedia: 'DWELPULDUFAKJD4TTDC2KIOF2A',
            children: ['testimg'],
            withZoom: false,
            itsGallery: false,
            active: false,
            zoom: false,
            outputType: 'default',
            scriptZoom: 'testscript'
        };
        const { container } = render(<ModMedia {...props} />);
        const element = container.getElementsByTagName('section')[0];
        expect(screen.findByText('testimg')).toBeDefined();
        expect(screen.findByText('testscript')).toBeDefined();
        expect(element).toHaveAttribute('id', 'DWELPULDUFAKJD4TTDC2KIOF2A');
        expect(element).toHaveAttribute('role', 'button');
        expect(element).toHaveAttribute('class', 'mod-media   ');
    });
    it('should check zoom and classCondition classes', () => {
        const props = {
            withZoom: '--zoom',
            active: true,
            zoom: true,
            classCondition: '--special'
        };
        const { container } = render(<ModMedia {...props} />);
        const element = container.getElementsByTagName('section')[0];
        expect(element).toHaveAttribute(
            'class',
            'mod-media --zoom --active --special'
        );
    });
    it('should check gallery zoom class', () => {
        const { container } = render(<ModMedia itsGallery={true} />);
        const element = container.getElementsByTagName('section')[0];
        expect(element).toHaveAttribute('class', 'mod-media --zoom  ');
    });
    it('should test html attr default', () => {
        const { container } = render(
            <ModMedia
                idMedia="DWELPULDUFAKJD4TTDC2KIOF2A"
                html={'<p>test</p>'}
            />
        );
        const element = container.getElementsByTagName('div')[0];
        expect(
            container.getElementsByClassName('com-embed --html')
        ).toBeDefined();
        expect(element).toHaveAttribute(
            'id',
            'anexo-DWELPULDUFAKJD4TTDC2KIOF2A'
        );
    });
});
