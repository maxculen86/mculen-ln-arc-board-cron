import React from 'react';
import { render, screen } from '@testing-library/react';
import Consumer from 'fusion:consumer';
import '@testing-library/jest-dom/extend-expect';
import Container from '../../../../../../components/private/OTT/programa/programImage/container';

jest.mock(
    '../../../../../../components/private/OTT/programa/programImage/component',
    () => 'mocked-component'
);

describe('private - OTT - programa - programImage', () => {
    const child = <h1>Soy un child</h1>;

    it('Testeo que la url sea la misma en el componente que el container', () => {
        const { getByTestId } = render(
            <Container imageId="OTTprogramImage" data-testid="mocked-component">
                {child}
            </Container>
        );
        const component = getByTestId('mocked-component');
        expect(component).toHaveAttribute(
            'imgsrc',
            'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/7XBWH35QWZHSVGDQUVATJ6DC34.jpg'
        );
    });
});
