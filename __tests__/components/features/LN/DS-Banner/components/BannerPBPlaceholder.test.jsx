import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BannerPBPlaceholder from '../../../../../../components/features/LN/DS-Banner/components/BannerPBPlaceholder';

describe('components - features - LN - DS-Banner - BannerPBPlaceholder', () => {
    const baseProps = {
        slotName: 'la_nacion_mobile/Nota/sticky2_mob',
        targeting: { sitio: 'lanacion', seccion: 'nota' },
        dimensions: [[320, 50]]
    };

    it('renders admin banner metadata', () => {
        render(<BannerPBPlaceholder {...baseProps} />);

        expect(screen.getByText(/Banner/)).toBeInTheDocument();
        expect(
            screen.getByText('Slot: la_nacion_mobile/Nota/sticky2_mob')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Targeting: {"sitio":"lanacion","seccion":"nota"}')
        ).toBeInTheDocument();
    });

    it('renders missing dfp message', () => {
        render(<BannerPBPlaceholder {...baseProps} missDfpId />);

        expect(screen.getByText('FALTA DFP ID')).toBeInTheDocument();
    });

    describe('theme variants snapshots', () => {
        it('matches snapshot - light (default)', () => {
            const { container } = render(
                <BannerPBPlaceholder {...baseProps} />
            );
            expect(container).toMatchSnapshot();
        });

        it('matches snapshot - dark', () => {
            const { container } = render(
                <BannerPBPlaceholder {...baseProps} theme="dark" />
            );
            expect(container).toMatchSnapshot();
        });

        it('matches snapshot - error (missDfpId)', () => {
            const { container } = render(
                <BannerPBPlaceholder {...baseProps} missDfpId />
            );
            expect(container).toMatchSnapshot();
        });

        it('matches snapshot - error (error string)', () => {
            const { container } = render(
                <BannerPBPlaceholder {...baseProps} error="slot inválido" />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
