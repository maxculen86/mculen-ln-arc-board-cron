import React from 'react';
import { render } from '@testing-library/react';
import BuildRoof from '../../../../../components/chains/utils/_BuildRoof/default';

// --- Mocks ---

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        contextPath: '',
        deployment: src => src
    })
}));

jest.mock('@ln/contenidos-ui-roof', () => {
    const RoofRight = jest.fn(({ buttonLogo }) => {
        if (buttonLogo?.src)
            return (
                <img
                    src={buttonLogo.src}
                    alt={buttonLogo.alt}
                    loading={buttonLogo.loading}
                />
            );
        return <div />;
    });
    const Roof = jest.fn(({ children }) => <div>{children}</div>);
    Roof.Left = jest.fn(() => <div />);
    Roof.Right = RoofRight;
    return { Roof };
});

jest.mock(
    '../../../../../components/chains/utils/_BuildRoof/_helper/validateRoof',
    () => () => null
);
jest.mock(
    '../../../../../components/chains/utils/_BuildRoof/_helper/hasDataRoof',
    () => () => true
);
jest.mock(
    '../../../../../components/chains/utils/_BuildRoof/_helper/assets',
    () => ({
        getAssetsLeft: {},
        getAssetsRight: {}
    })
);
jest.mock('../../../../../components/chains/utils/setRender', () =>
    jest.fn(({ extraOptions }) => extraOptions.default || null)
);
jest.mock(
    '../../../../../components/chains/utils/common/_helpers-WebApi',
    () => ({
        CHAIN_STYLE: { SUB_EXCLUSIVE: 'sub-exclusive', FOODIT: 'foodit' },
        VERTICALS: []
    })
);
jest.mock('../../../../../components/chains/utils/targetUrlRedirect', () => ({
    targetUrlRedirect: href => href
}));

// --- Helpers ---

const getRoofRightProps = () => {
    const { Roof } = jest.requireMock('@ln/contenidos-ui-roof');
    return Roof.Right.mock.calls[0][0];
};

// --- Tests ---

const baseProps = {
    title: 'Test Chain',
    chainStyle: 'generic',
    isAdmin: false
};

const buttonLogoWithSrc = {
    src: 'https://example.com/logo.png',
    alt: 'Test Logo'
};

beforeEach(() => {
    const { Roof } = jest.requireMock('@ln/contenidos-ui-roof');
    Roof.mockClear();
    Roof.Left.mockClear();
    Roof.Right.mockClear();
});

describe('BuildRoof — buttonLogo with loading="lazy" via @ln/contenidos-ui-roof >= 1.1.35-beta.0', () => {
    it('passes buttonLogo with loading="lazy" injected to Roof.Right when buttonLogo.src exists', () => {
        render(<BuildRoof {...baseProps} buttonLogo={buttonLogoWithSrc} />);

        const rightProps = getRoofRightProps();
        expect(rightProps.buttonLogo).toMatchObject({
            src: buttonLogoWithSrc.src,
            alt: buttonLogoWithSrc.alt,
            loading: 'lazy'
        });
    });

    it('does NOT pass buttonHTML to Roof.Right', () => {
        render(<BuildRoof {...baseProps} buttonLogo={buttonLogoWithSrc} />);

        const rightProps = getRoofRightProps();
        expect(rightProps.buttonHTML).toBeUndefined();
    });

    it('falls back to passing buttonLogo as-is when buttonLogo has no src', () => {
        const logoNoSrc = { alt: 'no src' };
        render(<BuildRoof {...baseProps} buttonLogo={logoNoSrc} />);

        const rightProps = getRoofRightProps();
        expect(rightProps.buttonHTML).toBeUndefined();
        expect(rightProps.buttonLogo).toEqual(logoNoSrc);
    });

    it('passes empty buttonLogo and no buttonHTML for foodit chainStyle', () => {
        render(
            <BuildRoof
                {...baseProps}
                chainStyle="foodit"
                buttonLogo={buttonLogoWithSrc}
            />
        );

        const rightProps = getRoofRightProps();
        expect(rightProps.buttonHTML).toBeUndefined();
        expect(rightProps.buttonLogo).toBe('');
    });

    it('preserves original buttonLogo fields alongside injected loading', () => {
        const richLogo = {
            src: 'https://example.com/logo.png',
            alt: 'Rich Logo',
            className: 'my-class'
        };
        render(<BuildRoof {...baseProps} buttonLogo={richLogo} />);

        const rightProps = getRoofRightProps();
        expect(rightProps.buttonLogo).toMatchObject({
            src: richLogo.src,
            alt: richLogo.alt,
            className: richLogo.className,
            loading: 'lazy'
        });
    });
});

describe('BuildRoof — hrefButton contract (Roof.Right renders <span> when empty) via @ln/contenidos-ui-roof >= 1.1.36-beta.0', () => {
    it('passes an empty hrefButton to Roof.Right when linkButton is not provided', () => {
        render(<BuildRoof {...baseProps} />);

        const rightProps = getRoofRightProps();
        expect(rightProps.hrefButton).toBe('');
    });

    it('propagates linkButton as hrefButton to Roof.Right when provided', () => {
        const linkButton = 'https://example.com/suscribite';
        render(<BuildRoof {...baseProps} linkButton={linkButton} />);

        const rightProps = getRoofRightProps();
        expect(rightProps.hrefButton).toBe(linkButton);
    });

    describe('snapshot: Roof.Right output mirrors the lib contract', () => {
        beforeEach(() => {
            const { Roof } = jest.requireMock('@ln/contenidos-ui-roof');
            Roof.Right.mockImplementation(({ hrefButton, textButton }) =>
                hrefButton ? (
                    <a href={hrefButton}>{textButton}</a>
                ) : (
                    <span>{textButton}</span>
                )
            );
        });

        it('renders <span> when no linkButton', () => {
            const { container } = render(
                <BuildRoof {...baseProps} buttonText="Suscribite" />
            );
            expect(container).toMatchSnapshot();
        });

        it('renders <a> when linkButton is provided', () => {
            const { container } = render(
                <BuildRoof
                    {...baseProps}
                    buttonText="Suscribite"
                    linkButton="https://example.com/suscribite"
                />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
