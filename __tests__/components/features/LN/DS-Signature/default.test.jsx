import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DsSignature from '../../../../../components/features/LN/DS-Signature/default';

jest.mock('fusion:context', () => ({
    __esModule: true,
    default: jest.fn(comp => comp),
    useAppContext: jest.fn()
}));

jest.mock('fusion:prop-types', () => {
    const tag = jest.fn(() => validator);
    const validator = Object.assign(jest.fn(), { isRequired: jest.fn(), tag });
    return {
        shape: jest.fn(() => validator),
        oneOf: jest.fn(() => validator)
    };
});

jest.mock(
    '../../../../../components/features/LN/DS-Signature/hooks/useSignatureRules',
    () => ({ useSignatureRules: jest.fn() })
);

jest.mock(
    '../../../../../components/features/LN/DS-Signature/utils/socialHelpers',
    () => ({ buildSocialItems: jest.fn(() => []) })
);

jest.mock(
    '../../../../../components/features/LN/DS-Signature/components/Distributor',
    () => jest.fn(() => <div data-testid="distributor" />)
);

jest.mock(
    '../../../../../components/features/LN/DS-Signature/components/AuthorsAndSocialLinks',
    () => jest.fn(() => <div data-testid="authors-and-social-links" />)
);

jest.mock(
    '../../../../../components/features/LN/DS-Signature/components/BiographyAccordion',
    () => jest.fn(() => <div data-testid="biography-accordion" />)
);

jest.mock('../../../../../components/features/ui/ln/divider/default', () =>
    jest.fn(() => <hr data-testid="divider" />)
);

jest.mock('../../../../../components/private/common/utils/firmaHelper', () => ({
    place: { Top: 'Top', Bottom: 'Bottom' }
}));

const { useAppContext } = require('fusion:context');
const {
    useSignatureRules
} = require('../../../../../components/features/LN/DS-Signature/hooks/useSignatureRules');
const {
    buildSocialItems
} = require('../../../../../components/features/LN/DS-Signature/utils/socialHelpers');
const Distributor = require('../../../../../components/features/LN/DS-Signature/components/Distributor');
const AuthorsAndSocialLinks = require('../../../../../components/features/LN/DS-Signature/components/AuthorsAndSocialLinks');
const BiographyAccordion = require('../../../../../components/features/LN/DS-Signature/components/BiographyAccordion');

const defaultData = {
    distributor: { name: 'REUTERS', mode: 'default', subcategory: [] },
    authorsBlob: {
        author: { name: 'Juan Pérez' },
        authorsText: 'Juan Pérez',
        hasMultipleAuthors: false
    },
    photo: 'https://example.com/photo.jpg',
    role: 'Periodista',
    position: 'Bottom',
    longBio: 'Texto de la bio',
    socialLinks: []
};

describe('components - features - LN - DS-Signature - DsSignature', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        useAppContext.mockReturnValue({
            layout: 'NotaOpinion',
            siteProperties: {
                layoutsName: { NotaOpinion: 'NotaOpinion' }
            }
        });

        useSignatureRules.mockReturnValue({
            flags: {
                shouldShowDistributor: true,
                shouldShowAuthors: true,
                shouldRender: true
            },
            data: defaultData
        });

        buildSocialItems.mockReturnValue([]);
    });

    it('returns null when shouldRender is false', () => {
        useSignatureRules.mockReturnValue({
            flags: {
                shouldShowDistributor: false,
                shouldShowAuthors: false,
                shouldRender: false
            },
            data: defaultData
        });
        const { container } = render(
            <DsSignature customFields={{}} globalContent={{}} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders Distributor, AuthorsAndSocialLinks and Dividers when shouldRender is true', () => {
        render(<DsSignature customFields={{}} globalContent={{}} />);
        expect(screen.getByTestId('distributor')).toBeInTheDocument();
        expect(
            screen.getByTestId('authors-and-social-links')
        ).toBeInTheDocument();
        expect(screen.getAllByTestId('divider')).toHaveLength(2);
    });

    it('passes shouldShowDistributor to Distributor', () => {
        render(<DsSignature customFields={{}} globalContent={{}} />);
        expect(Distributor).toHaveBeenCalledWith(
            expect.objectContaining({ shouldShowDistributor: true }),
            {}
        );
    });

    it('passes shouldShowAuthors to AuthorsAndSocialLinks', () => {
        render(<DsSignature customFields={{}} globalContent={{}} />);
        expect(AuthorsAndSocialLinks).toHaveBeenCalledWith(
            expect.objectContaining({ shouldShowAuthors: true }),
            {}
        );
    });

    it('passes shouldShowBiography=true to BiographyAccordion when opinion layout + bottom + single author', () => {
        render(<DsSignature customFields={{}} globalContent={{}} />);
        expect(BiographyAccordion).toHaveBeenCalledWith(
            expect.objectContaining({
                text: 'Texto de la bio',
                shouldShowBiography: true
            }),
            {}
        );
    });

    it('passes shouldShowBiography=false when not opinion layout', () => {
        useAppContext.mockReturnValue({
            layout: 'OtroLayout',
            siteProperties: {
                layoutsName: { NotaOpinion: 'NotaOpinion' }
            }
        });
        render(<DsSignature customFields={{}} globalContent={{}} />);
        expect(BiographyAccordion).toHaveBeenCalledWith(
            expect.objectContaining({ shouldShowBiography: false }),
            {}
        );
    });

    it('passes shouldShowBiography=false when position is Top', () => {
        useSignatureRules.mockReturnValue({
            flags: {
                shouldShowDistributor: true,
                shouldShowAuthors: true,
                shouldRender: true
            },
            data: { ...defaultData, position: 'Top' }
        });
        render(<DsSignature customFields={{}} globalContent={{}} />);
        expect(BiographyAccordion).toHaveBeenCalledWith(
            expect.objectContaining({ shouldShowBiography: false }),
            {}
        );
    });

    it('passes shouldShowBiography=false when hasMultipleAuthors is true', () => {
        useSignatureRules.mockReturnValue({
            flags: {
                shouldShowDistributor: true,
                shouldShowAuthors: true,
                shouldRender: true
            },
            data: {
                ...defaultData,
                authorsBlob: {
                    ...defaultData.authorsBlob,
                    hasMultipleAuthors: true
                }
            }
        });
        render(<DsSignature customFields={{}} globalContent={{}} />);
        expect(BiographyAccordion).toHaveBeenCalledWith(
            expect.objectContaining({ shouldShowBiography: false }),
            {}
        );
    });

    it('passes distributor data to Distributor component', () => {
        render(<DsSignature customFields={{}} globalContent={{}} />);
        expect(Distributor).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'REUTERS',
                mode: 'default',
                subcategory: []
            }),
            {}
        );
    });

    it('sets data-tw attribute when position is not Top', () => {
        const { container } = render(
            <DsSignature customFields={{}} globalContent={{}} />
        );
        expect(container.firstChild).toHaveAttribute('data-tw');
    });

    it('does not set data-tw attribute when position is Top', () => {
        useSignatureRules.mockReturnValue({
            flags: {
                shouldShowDistributor: true,
                shouldShowAuthors: true,
                shouldRender: true
            },
            data: { ...defaultData, position: 'Top' }
        });
        const { container } = render(
            <DsSignature customFields={{}} globalContent={{}} />
        );
        expect(container.firstChild).not.toHaveAttribute('data-tw');
    });
});
