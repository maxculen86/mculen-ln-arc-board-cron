import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Steps } from '../../../../../../../components/features/foodit-global/common/OpeningRecipe/cookMode/components/steps';

jest.mock('@ln/ds-common-progress', () => ({
    Progress: ({ value }) => <div data-testid="progress" data-value={value} />
}));

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../../../components/features/ui/foodit/image/default',
    () =>
        ({ src, alt, className }) => (
            <img src={src} alt={alt} className={className} />
        )
);

jest.mock(
    '../../../../../../../components/features/ui/foodit/icon/default',
    () =>
        ({ name, size, className }) => (
            <span
                data-testid={`icon-${name}`}
                data-size={size}
                className={className}
            />
        )
);

jest.mock(
    '../../../../../../../components/features/ui/foodit/button/foodit',
    () =>
        ({ children, onClick, disabled, ...props }) => (
            <button onClick={onClick} disabled={disabled} {...props}>
                {children}
            </button>
        )
);

const MOCK_STEPS = [
    {
        step: 1,
        description: 'Hervir agua con sal en una olla grande a fuego alto.',
        image: 'https://images.unsplash.com/photo-1.jpg'
    },
    {
        step: 2,
        description: 'Picar la cebolla y el ajo en cubos pequeños.',
        image: 'https://images.unsplash.com/photo-2.jpg'
    },
    {
        step: 3,
        description: 'Calentar aceite de oliva en una sartén.'
    },
    {
        step: 4,
        description: 'Servir y disfrutar.'
    }
];

const TOTAL_STEPS = MOCK_STEPS.length;

function makeAudio(overrides = {}) {
    return {
        segmentIndex: 0,
        isMuted: false,
        goToNext: jest.fn(),
        goToPrev: jest.fn(),
        toggleMute: jest.fn(),
        ...overrides
    };
}

describe('Steps', () => {
    it('renders step 1 by default', () => {
        const audio = makeAudio({ segmentIndex: 0 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        expect(
            screen.getByText(
                (_, el) =>
                    el?.tagName === 'P' &&
                    el.textContent.includes(`Paso 1 de ${TOTAL_STEPS}`)
            )
        ).toBeInTheDocument();
    });

    it('shows the description of step 1', () => {
        const audio = makeAudio({ segmentIndex: 0 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        expect(screen.getByText(MOCK_STEPS[0].description)).toBeInTheDocument();
    });

    it('the "previous" button is disabled on the first step', () => {
        const audio = makeAudio({ segmentIndex: 0 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        const prevBtn = screen.getByText('anterior').closest('button');
        expect(prevBtn).toBeDisabled();
    });

    it('the "next" button is enabled on the first step', () => {
        const audio = makeAudio({ segmentIndex: 0 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        const nextBtn = screen.getByText('siguiente').closest('button');
        expect(nextBtn).not.toBeDisabled();
    });

    it('calls goToNext when clicking "next"', () => {
        const audio = makeAudio({ segmentIndex: 0 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        fireEvent.click(screen.getByText('siguiente').closest('button'));

        expect(audio.goToNext).toHaveBeenCalledTimes(1);
    });

    it('shows step 2 when segmentIndex changes to 1', () => {
        const audio = makeAudio({ segmentIndex: 1 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        expect(screen.getByText(MOCK_STEPS[1].description)).toBeInTheDocument();
        expect(
            screen.getByText(
                (_, el) =>
                    el?.tagName === 'P' &&
                    el.textContent.includes(`Paso 2 de ${TOTAL_STEPS}`)
            )
        ).toBeInTheDocument();
    });

    it('"previous" is enabled on the second step', () => {
        const audio = makeAudio({ segmentIndex: 1 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        const prevBtn = screen.getByText('anterior').closest('button');
        expect(prevBtn).not.toBeDisabled();
    });

    it('calls goToPrev when clicking "previous"', () => {
        const audio = makeAudio({ segmentIndex: 1 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        fireEvent.click(screen.getByText('anterior').closest('button'));

        expect(audio.goToPrev).toHaveBeenCalledTimes(1);
    });

    it('the "next" button is disabled on the last step', () => {
        const audio = makeAudio({ segmentIndex: TOTAL_STEPS - 1 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        const nextBtn = screen.getByText('siguiente').closest('button');
        expect(nextBtn).toBeDisabled();
    });

    it('the progress bar reflects the current step', () => {
        const audio = makeAudio({ segmentIndex: 0 });
        const { rerender } = render(<Steps steps={MOCK_STEPS} audio={audio} />);

        const progress = screen.getByTestId('progress');
        expect(progress).toHaveAttribute(
            'data-value',
            String(Math.round((1 / TOTAL_STEPS) * 100))
        );

        rerender(
            <Steps steps={MOCK_STEPS} audio={makeAudio({ segmentIndex: 1 })} />
        );

        expect(progress).toHaveAttribute(
            'data-value',
            String(Math.round((2 / TOTAL_STEPS) * 100))
        );
    });

    it('the mute button shows the sound icon', () => {
        const audio = makeAudio({ isMuted: false });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        expect(screen.getByTestId('icon-megaphone')).toBeInTheDocument();
    });

    it('the mute button shows the mute icon when isMuted is true', () => {
        const audio = makeAudio({ isMuted: true });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        expect(screen.getByTestId('icon-megaphone-off')).toBeInTheDocument();
    });

    it('calls toggleMute when clicking the mute button', () => {
        const audio = makeAudio({ isMuted: false });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        fireEvent.click(screen.getByTestId('icon-megaphone').closest('button'));

        expect(audio.toggleMute).toHaveBeenCalledTimes(1);
    });

    it('shows the image when the step has one', () => {
        const audio = makeAudio({ segmentIndex: 0 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', MOCK_STEPS[0].image);
        expect(img).toHaveAttribute('alt', 'Paso 1');
    });

    it('does not show an image when the step does not have one', () => {
        const audio = makeAudio({ segmentIndex: 2 });
        render(<Steps steps={MOCK_STEPS} audio={audio} />);

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('returns null when there are no steps', () => {
        const audio = makeAudio();
        const { container } = render(<Steps steps={[]} audio={audio} />);
        expect(container.firstChild).toBeNull();
    });

    it('falls back to no-ops when the audio prop is not passed', () => {
        render(<Steps steps={MOCK_STEPS} />);

        expect(screen.getByText(MOCK_STEPS[0].description)).toBeInTheDocument();

        const nextBtn = screen.getByText('siguiente').closest('button');
        fireEvent.click(nextBtn);

        expect(screen.getByText(MOCK_STEPS[0].description)).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Steps steps={MOCK_STEPS} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('shows the title when the step has one', () => {
        const stepsWithTitle = [
            {
                step: 1,
                title: 'Para la masa',
                description: 'Mezclar ingredientes',
                image: null
            }
        ];

        render(<Steps steps={stepsWithTitle} />);

        expect(screen.getByText('Para la masa')).toBeInTheDocument();
    });

    it('does not show the title when the step does not have one', () => {
        const stepsWithoutTitle = [
            {
                step: 1,
                title: null,
                description: 'Mezclar ingredientes',
                image: null
            }
        ];

        render(<Steps steps={stepsWithoutTitle} />);

        const titleElement = screen.queryByText((content, element) => {
            return (
                element.tagName.toLowerCase() === 'p' &&
                element.classList.contains('font-bold')
            );
        });

        expect(titleElement).not.toBeInTheDocument();
    });
});
