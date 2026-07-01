import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('fusion:context', () => ({
    __esModule: true,
    default: jest.fn(comp => comp),
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/features/LN/common/wrapperBody/default',
    () => ({
        WrapperBody: jest.fn(({ children, ...props }) => (
            <div data-testid="wrapper-body" {...props}>
                {children}
            </div>
        ))
    })
);

const Authors =
    require('../../../../../components/features/LN/DS-Authors/default').default;
const { useAppContext } = require('fusion:context');

describe('DS-Authors', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const createMockGlobalContent = (overrides = {}) => ({
        credits: {
            by: [
                {
                    _id: 'author-1',
                    name: 'Juan Pérez',
                    type: 'author',
                    additional_properties: {
                        original: {
                            author_type: '',
                            bio: 'Bio del autor'
                        }
                    }
                }
            ]
        },
        subtype: '1',
        ...overrides
    });

    const setupMock = globalContent => {
        useAppContext.mockReturnValue({ globalContent });
    };

    it('renders correctly with a single author', () => {
        const mockContent = createMockGlobalContent();
        setupMock(mockContent);

        render(<Authors />);

        expect(screen.getByText('Por')).toBeInTheDocument();
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByTestId('wrapper-body')).toBeInTheDocument();
    });

    it('renders author as a link when has ID', () => {
        const mockContent = createMockGlobalContent();
        setupMock(mockContent);

        render(<Authors />);

        const link = screen.getByText('Juan Pérez').closest('a');
        expect(link).toHaveAttribute('href', '/autor/author-1/');
    });

    it('returns null when no authors', () => {
        const mockContent = createMockGlobalContent({ credits: { by: [] } });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null when credits is undefined', () => {
        const mockContent = createMockGlobalContent({ credits: undefined });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null when credits.by is undefined', () => {
        const mockContent = createMockGlobalContent({ credits: {} });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).toBeNull();
    });

    it('returns null for opinion subtype with single author having bio and not guest', () => {
        const mockContent = createMockGlobalContent({ subtype: '3' });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).toBeNull();
    });

    it('renders multiple authors with comma separators', () => {
        const mockContent = createMockGlobalContent({
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    },
                    {
                        _id: 'author-2',
                        name: 'María García',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    },
                    {
                        _id: 'author-3',
                        name: 'Pedro López',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    }
                ]
            }
        });
        setupMock(mockContent);

        render(<Authors />);

        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('María García')).toBeInTheDocument();
        expect(screen.getByText('Pedro López')).toBeInTheDocument();
    });

    it('uses "y" separator when penultimate author does not start with i/hi + consonant', () => {
        const mockContent = createMockGlobalContent({
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    },
                    {
                        _id: 'author-2',
                        name: 'María García',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    },
                    {
                        _id: 'author-3',
                        name: 'Pedro López',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    }
                ]
            }
        });
        setupMock(mockContent);

        render(<Authors />);

        const address = document.querySelector('address');
        expect(address.textContent).toContain(' y ');
    });

    it('uses "e" separator when penultimate author starts with i/hi + consonant', () => {
        const mockContent = createMockGlobalContent({
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    },
                    {
                        _id: 'author-2',
                        name: 'Hilario Gómez',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    },
                    {
                        _id: 'author-3',
                        name: 'Pedro López',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    }
                ]
            }
        });
        setupMock(mockContent);

        render(<Authors />);

        const address = document.querySelector('address');
        expect(address.textContent).toContain(' e ');
    });

    it('renders all authors with correct links', () => {
        const mockContent = createMockGlobalContent({
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    },
                    {
                        _id: 'author-2',
                        name: 'María García',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    }
                ]
            }
        });
        setupMock(mockContent);

        render(<Authors />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', '/autor/author-1/');
        expect(links[1]).toHaveAttribute('href', '/autor/author-2/');
    });

    it('filters out non-author types', () => {
        const mockContent = createMockGlobalContent({
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    },
                    {
                        _id: 'other-1',
                        name: 'Editorial',
                        type: 'other',
                        additional_properties: { original: { author_type: '' } }
                    }
                ]
            }
        });
        setupMock(mockContent);

        render(<Authors />);

        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.queryByText('Editorial')).not.toBeInTheDocument();
    });

    it('returns null when all authors are filtered by type', () => {
        const mockContent = createMockGlobalContent({
            credits: {
                by: [
                    {
                        _id: 'other-1',
                        name: 'Editorial',
                        type: 'other',
                        additional_properties: { original: { author_type: '' } }
                    }
                ]
            }
        });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).toBeNull();
    });

    it('renders guest author without link when no ID', () => {
        const mockContent = createMockGlobalContent({
            credits: {
                by: [
                    {
                        _id: '',
                        name: 'Autor Invitado',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    }
                ]
            }
        });
        setupMock(mockContent);

        const { container } = render(<Authors />);

        expect(container.textContent).toContain('Autor Invitado');
        expect(container.querySelector('a')).toBeNull();
    });

    it('renders guest author for opinion subtype', () => {
        const mockContent = createMockGlobalContent({
            subtype: '3',
            credits: {
                by: [
                    {
                        _id: '',
                        name: 'Autor Invitado',
                        type: 'author',
                        additional_properties: {
                            original: { author_type: '', bio: 'Bio' }
                        }
                    }
                ]
            }
        });
        setupMock(mockContent);

        const { container } = render(<Authors />);

        expect(container.firstChild).not.toBeNull();
        expect(container.textContent).toContain('Autor Invitado');
    });

    it('uses byline when author_type is not empty', () => {
        const mockContent = createMockGlobalContent({
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Nombre Real',
                        type: 'author',
                        additional_properties: {
                            original: {
                                author_type: 'some_type',
                                byline: 'Nombre Byline'
                            }
                        }
                    }
                ]
            }
        });
        setupMock(mockContent);

        render(<Authors />);

        expect(screen.getByText('Nombre Byline')).toBeInTheDocument();
        expect(screen.queryByText('Nombre Real')).not.toBeInTheDocument();
    });

    it('uses name when author_type is empty', () => {
        const mockContent = createMockGlobalContent();
        setupMock(mockContent);

        render(<Authors />);

        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });

    it('renders for opinion subtype with multiple authors', () => {
        const mockContent = createMockGlobalContent({
            subtype: '3',
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: {
                            original: { author_type: '', bio: 'Bio 1' }
                        }
                    },
                    {
                        _id: 'author-2',
                        name: 'María García',
                        type: 'author',
                        additional_properties: {
                            original: { author_type: '', bio: 'Bio 2' }
                        }
                    }
                ]
            }
        });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).not.toBeNull();
    });

    it('renders for opinion subtype when author has no bio', () => {
        const mockContent = createMockGlobalContent({
            subtype: '3',
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: { original: { author_type: '' } }
                    }
                ]
            }
        });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).not.toBeNull();
    });

    it('renders for non-opinion subtype', () => {
        const mockContent = createMockGlobalContent({
            subtype: '1',
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: {
                            original: { author_type: '', bio: 'Bio' }
                        }
                    }
                ]
            }
        });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).not.toBeNull();
    });

    it('renders for unknown subtype', () => {
        const mockContent = createMockGlobalContent({
            subtype: '99',
            credits: {
                by: [
                    {
                        _id: 'author-1',
                        name: 'Juan Pérez',
                        type: 'author',
                        additional_properties: {
                            original: { author_type: '', bio: 'Bio' }
                        }
                    }
                ]
            }
        });
        setupMock(mockContent);

        const { container } = render(<Authors />);
        expect(container.firstChild).not.toBeNull();
    });

    it('has correct label property', () => {
        expect(Authors.label).toBe('LN-DS-Autores');
    });

    it('passes data-tw attribute to WrapperBody', () => {
        const mockContent = createMockGlobalContent();
        setupMock(mockContent);

        const {
            WrapperBody
        } = require('../../../../../components/features/LN/common/wrapperBody/default');

        render(<Authors />);

        expect(WrapperBody).toHaveBeenCalledWith(
            expect.objectContaining({ 'data-tw': true }),
            undefined
        );
    });
});
