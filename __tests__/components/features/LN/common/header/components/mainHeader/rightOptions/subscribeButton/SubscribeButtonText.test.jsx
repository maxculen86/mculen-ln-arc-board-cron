import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubscribeButtonText from '../../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/subscribeButton/SubscribeButtonText';
import { useHeaderContext } from '../../../../../../../../../../components/features/LN/common/header/context';
import { HEADER_VARIANTS } from '../../../../../../../../../../components/features/LN/common/header/constants';

jest.mock(
    '../../../../../../../../../../components/features/LN/common/header/context',
    () => ({
        useHeaderContext: jest.fn()
    })
);

describe('SubscribeButtonText', () => {
    const termicaValues = {
        button_text: 'suscribite por <s>$9800</s> $990',
        sticky_button_text: 'suscribite $990'
    };

    const renderText = props =>
        render(
            <SubscribeButtonText
                termicaValues={termicaValues}
                isActiveTermicaSubscribe
                {...props}
            />
        );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when it is the home page', () => {
        it('should render button_text when the header is not sticky', () => {
            useHeaderContext.mockReturnValue({
                position: HEADER_VARIANTS.POSITION.DEFAULT,
                isHome: true
            });

            const { container } = renderText();

            // dangerouslySetInnerHTML: no hay rol semantico, se consulta por id
            expect(container.querySelector('#button-text')).toHaveTextContent(
                'suscribite por $9800 $990'
            );
        });

        it('should render sticky_button_text when the header is sticky', () => {
            useHeaderContext.mockReturnValue({
                position: HEADER_VARIANTS.POSITION.STICKY,
                isHome: true
            });

            const { container } = renderText();

            expect(
                container.querySelector('#sticky-button-text')
            ).toHaveTextContent('suscribite $990');
        });
    });

    describe('when it is not the home page', () => {
        it('should render the promo (sticky_button_text) instead of the fallback', () => {
            useHeaderContext.mockReturnValue({
                position: HEADER_VARIANTS.POSITION.DEFAULT,
                isHome: false
            });

            const { container } = renderText();

            expect(
                container.querySelector('#sticky-button-text')
            ).toHaveTextContent('suscribite $990');
        });
    });

    describe('when the termica is inactive or the texts are missing', () => {
        it('should render the "suscribite" fallback when the termica is inactive', () => {
            useHeaderContext.mockReturnValue({
                position: HEADER_VARIANTS.POSITION.DEFAULT,
                isHome: true
            });

            renderText({ isActiveTermicaSubscribe: false });

            expect(screen.getByText('suscribite')).toBeInTheDocument();
        });

        it('should render the fallback when sticky_button_text is missing', () => {
            useHeaderContext.mockReturnValue({
                position: HEADER_VARIANTS.POSITION.DEFAULT,
                isHome: false
            });

            renderText({
                termicaValues: {
                    button_text: 'solo default',
                    sticky_button_text: ''
                }
            });

            expect(screen.getByText('suscribite')).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('should match snapshot with the promo on home', () => {
            useHeaderContext.mockReturnValue({
                position: HEADER_VARIANTS.POSITION.DEFAULT,
                isHome: true
            });

            const { asFragment } = renderText();

            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot with the fallback', () => {
            useHeaderContext.mockReturnValue({
                position: HEADER_VARIANTS.POSITION.DEFAULT,
                isHome: true
            });

            const { asFragment } = renderText({
                isActiveTermicaSubscribe: false
            });

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
