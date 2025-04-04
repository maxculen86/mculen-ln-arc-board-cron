import React from 'react';
import { render, screen } from '@testing-library/react';
import { AudioFoodit } from '../../../../../../components/features/foodit-global/common/AudioFoodit/foodit';
import tacosAlPastorAudio from '../../../../../../__mocks__/data/foodit/tacosAlPastorAudio.json';
const articleAudio = tacosAlPastorAudio;

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

Element.prototype.scrollIntoView = jest.fn();

describe('AudioFoodit', () => {
    it('render null isScriptLoaded is false (not load audio componente beyondword)', () => {
        React.useState
            .mockReturnValueOnce([false, jest.fn()]) // For isScriptLoaded
            .mockReturnValueOnce([false, jest.fn()]) // For contentAvailable
            .mockReturnValueOnce([0, jest.fn()]); // For segmentIndex

        const { container } = render(
            <AudioFoodit article={{}} setIsAudioPlaying={() => {}} />
        );
        expect(container.firstChild).toBeNull();
    });
    it('render skeleton when isScriptLoaded is true', () => {
        React.useState
            .mockReturnValueOnce([true, jest.fn()]) // For isScriptLoaded
            .mockReturnValueOnce([false, jest.fn()]) // For contentAvailable
            .mockReturnValueOnce([0, jest.fn()]); // For segmentIndex

        const { container } = render(
            <AudioFoodit article={{}} setIsAudioPlaying={() => {}} />
        );
        const skeleton = container.querySelector('.skeleton-loader');
        expect(skeleton).toBeInTheDocument();
    });

    it('render audio component when isScriptLoaded and contentAvailable are true', () => {
        React.useState
            .mockReturnValueOnce([true, jest.fn()]) // For isScriptLoaded
            .mockReturnValueOnce([true, jest.fn()]) // For contentAvailable
            .mockReturnValueOnce([0, jest.fn()]); // For segmentIndex

        render(
            <AudioFoodit article={articleAudio} setIsAudioPlaying={jest.fn()} />
        );

        expect(screen.getByText('Marinado de la Carne')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Limpiar y cortar la pierna de cerdo en cortes delgados'
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText('Hidratar los chiles guajillo y anchos.')
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Preparar la marinada mezclando los chiles, ajo, piña, vinagre, achiote, comino, sal y pimienta.'
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Cubrir la carne con la marinada y refrigerar por 4-6 horas.'
            )
        ).toBeInTheDocument();
    });
});
