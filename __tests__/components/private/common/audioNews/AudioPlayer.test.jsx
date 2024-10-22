import React from 'react';
import { render, screen } from '@testing-library/react';
import { useWindowSize } from '@ln/hooks';
import AudioPlayer from '../../../../../components/private/common/audioNews/AudioPlayer';

jest.mock('@ln/hooks', () => ({
    useWindowSize: jest.fn()
}));

describe('components - private - common - audioNews - AudioPlayer', () => {
    const props = {
        noteId: 'CV2AWECQORF4HLDVMFFJCLQ234'
    };

    it('should render the AudioPlayer', () => {
        useWindowSize.mockReturnValue({ width: 600 });

        render(<AudioPlayer {...props} />);
        const dialog = screen.queryByRole('dialog', { hidden: true });

        expect(dialog).toBeInTheDocument();
        expect(screen.getByTitle('Cerrar')).toBeInTheDocument();
    });

    it('should render the dialog on mobile but not on desktop', () => {
        useWindowSize.mockReturnValue({ width: 600 });
        render(<AudioPlayer {...props} />);
        const dialog = screen.queryByRole('dialog', { hidden: true });
        expect(dialog).toBeInTheDocument();

        useWindowSize.mockReturnValue({ width: 1300 });
        render(<AudioPlayer {...props} />);
        expect(screen.queryByRole('dialog')).toBeNull();
    });
});
