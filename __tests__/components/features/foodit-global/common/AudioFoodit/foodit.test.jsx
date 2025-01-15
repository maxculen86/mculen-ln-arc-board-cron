import React from 'react';
import { render, screen } from '@testing-library/react';
import { AudioFoodit } from '../../../../../../components/features/foodit-global/common/AudioFoodit/foodit';
import tortugaNinjaAudio from '../../../../../../__mocks__/data/foodit/tortugaNinjaAudio.json';
const articleAudio = tortugaNinjaAudio;

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
        expect(screen.getByText('Para la masa')).toBeInTheDocument();
        expect(
            screen.getByText(
                'En un tazón, mezcla el agua tibia, azúcar y levadura. Deja reposar por 5 minutos hasta que burbujee. Agrega la harina, aceite de oliva y sal. Amasa hasta obtener una masa suave y elástica. Cubre y deja reposar en un lugar cálido durante 1 hora.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Para la salsa')).toBeInTheDocument();
        expect(screen.getByText('Cortar los tomates')).toBeInTheDocument();
    });
});
