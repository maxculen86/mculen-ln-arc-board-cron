import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SummarySwitch from '../../../../../../../components/features/LN/common/audioPlayer/components/summarySwitch';
import { audioPlayerStore } from '../../../../../../../components/features/LN/common/audioPlayer/store/audioPlayerStore';
import { addEventToDataLayerV2 } from '../../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        globalContent: { _id: 'note-123' },
        globalContentConfig: {}
    }))
}));

jest.mock(
    '../../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../../../components/features/LN/common/audioPlayer/getAudioEvents',
    () => jest.fn(() => ({ audio_id: '123' }))
);

jest.mock(
    '../../../../../../../components/features/LN/common/switchToggle/default',
    () =>
        jest.fn(({ selected, onChange, ...props }) => (
            <button
                type="button"
                role="switch"
                aria-checked={selected}
                onClick={onChange}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
            />
        ))
);

describe('Components - features - LN - common - audioPlayer - components - SummarySwitch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        act(() => {
            audioPlayerStore.open('note-123');
            // Caso base: la nota tiene resumen (switch habilitado).
            audioPlayerStore.setSummaryAvailable(true);
        });
    });

    afterEach(() => {
        act(() => {
            audioPlayerStore.close();
        });
    });

    it('renders toggle switch and label', () => {
        render(<SummarySwitch />);
        expect(screen.getByRole('switch')).toBeInTheDocument();
        expect(screen.getByText('Escuchar resumen')).toBeInTheDocument();
    });

    it('shows IA disclaimer when isSummary is active', () => {
        audioPlayerStore.setSummary(true);
        render(<SummarySwitch />);
        expect(screen.getByText('Voz realizada con IA')).toBeInTheDocument();
    });

    it('toggle is unchecked by default', () => {
        render(<SummarySwitch />);
        expect(screen.getByRole('switch')).toHaveAttribute(
            'aria-checked',
            'false'
        );
    });

    it('clicking toggle sets isSummary true and fires datalayer event', () => {
        render(<SummarySwitch />);
        fireEvent.click(screen.getByRole('switch'));
        expect(audioPlayerStore.getSnapshot().isSummary).toBe(true);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith(
            expect.objectContaining({ event: 'page_listened' })
        );
    });

    it('clicking toggle again sets isSummary false and fires datalayer event', () => {
        audioPlayerStore.setSummary(true);
        render(<SummarySwitch />);
        fireEvent.click(screen.getByRole('switch'));
        expect(audioPlayerStore.getSnapshot().isSummary).toBe(false);
        expect(addEventToDataLayerV2).toHaveBeenCalled();
    });

    it('is disabled while summary availability is unknown', () => {
        act(() => {
            audioPlayerStore.setSummaryAvailable(null);
        });
        render(<SummarySwitch />);
        expect(screen.getByRole('switch')).toBeDisabled();
    });

    it('is disabled with a hint when the note has no summary', () => {
        act(() => {
            audioPlayerStore.setSummaryAvailable(false);
        });
        render(<SummarySwitch />);
        const toggle = screen.getByRole('switch');
        expect(toggle).toBeDisabled();
        expect(toggle).toHaveAttribute(
            'title',
            'Esta nota no tiene resumen disponible'
        );
    });

    it('stays unchecked when the saved preference is summary but the note has none', () => {
        act(() => {
            audioPlayerStore.setSummary(true);
            audioPlayerStore.setSummaryAvailable(false);
        });
        render(<SummarySwitch />);
        expect(screen.getByRole('switch')).toHaveAttribute(
            'aria-checked',
            'false'
        );
    });
});
