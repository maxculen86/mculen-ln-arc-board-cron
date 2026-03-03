import React from 'react';
import { render, screen } from '@testing-library/react';
import WithoutSignature from '../../../../../components/features/LN-nota/signature/withoutSignature';

describe('components - feature - LN-nota - signature - withoutSignature', () => {
    const audioButton = <button>Escuchar Nota</button>;
    it('should return the audioButton when is provided and showWithoutSignature is true', () => {
        render(
            <WithoutSignature
                audioButton={audioButton}
                showListenButton={true}
                showWithoutSignature={true}
            />
        );

        expect(screen.getByText('Escuchar Nota')).toBeInTheDocument();
    });

    it('should not render anything if audioButton is null and showWithoutSignature is true', () => {
        const { container } = render(
            <WithoutSignature audioButton={null} showWithoutSignature={true} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should not render anything if audioButton is undefined and showWithoutSignature is true', () => {
        const { container } = render(
            <WithoutSignature showWithoutSignature={true} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should not render anything if showWithoutSignature is false', () => {
        const { container } = render(
            <WithoutSignature
                audioButton={audioButton}
                showWithoutSignature={false}
            />
        );

        expect(container.firstChild).toBeNull();
    });
});
