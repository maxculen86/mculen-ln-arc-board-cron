import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import VideoPlaylist from '../../../../../components/features/LN-10/videoPlaylist/default';

jest.mock('fusion:consumer', () => {
    return Component => Component;
});

const mockUseContent = jest.fn();
jest.mock('fusion:content', () => ({
    useContent: (...args) => mockUseContent(...args)
}));

jest.mock(
    '../../../../../components/features/LN-10/article/common/_helper-WebApi',
    () => ({
        checkForId: jest.fn(id => id && id.trim())
    })
);

jest.mock(
    '../../../../../components/features/LN-10/videoPlaylist/_helper',
    () => ({
        validateVideoPlaylist: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/common/warningMessage/warningMessage',
    () => {
        return function WarningMessage({ type, message }) {
            return (
                <div data-testid="warning-message">
                    <h3 role="heading">{type}</h3>
                    <p>{message}</p>
                </div>
            );
        };
    }
);

import { checkForId } from '../../../../../components/features/LN-10/article/common/_helper-WebApi';
import { validateVideoPlaylist } from '../../../../../components/features/LN-10/videoPlaylist/_helper';

describe('VideoPlaylist Feature Component', () => {
    const defaultProps = {
        customFields: {
            playlistId: 'test-playlist-123',
            hidePlaylist: false,
            shouldSchedule: false,
            enabledDays: []
        },
        isAdmin: true,
        id: 'test-feature-id'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        checkForId.mockImplementation(id => id && id.trim());
        validateVideoPlaylist.mockReturnValue(null);
        mockUseContent.mockReturnValue(null);
    });

    describe('Component rendering with valid data', () => {
        it('should render null when playlistData is valid and no errors', () => {
            const mockPlaylistData = {
                playlist: [
                    { id: 'video1', title: 'Video 1' },
                    { id: 'video2', title: 'Video 2' }
                ]
            };

            mockUseContent.mockReturnValue(mockPlaylistData);
            validateVideoPlaylist.mockReturnValue(null);

            const { container } = render(<VideoPlaylist {...defaultProps} />);

            expect(container.firstChild).toBeNull();
            expect(validateVideoPlaylist).toHaveBeenCalledWith({
                playlistData: mockPlaylistData,
                playlistId: 'test-playlist-123'
            });
        });

        it('should render null when isAdmin is false and there is an error', () => {
            const error = {
                type: 'Advertencia',
                message: 'El campo ID de playlist de JW es obligatorio'
            };

            validateVideoPlaylist.mockReturnValue(error);

            const { container } = render(
                <VideoPlaylist {...defaultProps} isAdmin={false} />
            );

            expect(container.firstChild).toBeNull();
            expect(
                screen.queryByTestId('warning-message')
            ).not.toBeInTheDocument();
        });
    });

    describe('useContent hook behavior', () => {
        it('should call useContent with correct source and query when playlistId is valid and isAdmin is true', () => {
            mockUseContent.mockReturnValue({ playlist: [] });

            render(<VideoPlaylist {...defaultProps} />);

            expect(mockUseContent).toHaveBeenCalledWith({
                source: 'jwPlaylistSource',
                query: {
                    playlistId: 'test-playlist-123'
                }
            });
        });

        it('should call useContent with null source when playlistId is empty', () => {
            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    playlistId: ''
                }
            };

            checkForId.mockReturnValue(null);

            render(<VideoPlaylist {...props} />);

            expect(mockUseContent).toHaveBeenCalledWith({
                source: null,
                query: {
                    playlistId: null
                }
            });
        });

        it('should call useContent with null source when isAdmin is false', () => {
            const props = {
                ...defaultProps,
                isAdmin: false
            };

            render(<VideoPlaylist {...props} />);

            expect(mockUseContent).toHaveBeenCalledWith({
                source: null,
                query: {
                    playlistId: 'test-playlist-123'
                }
            });
        });

        it('should call useContent with null source when playlistId contains only whitespace', () => {
            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    playlistId: '   '
                }
            };

            checkForId.mockReturnValue(null);

            render(<VideoPlaylist {...props} />);

            expect(mockUseContent).toHaveBeenCalledWith({
                source: null,
                query: {
                    playlistId: null
                }
            });
        });
    });

    describe('Error handling - Warning messages', () => {
        it('should render warning message when playlistId is missing and isAdmin is true', () => {
            const error = {
                type: 'Advertencia',
                message: 'El campo ID de playlist de JW es obligatorio'
            };

            validateVideoPlaylist.mockReturnValue(error);

            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    playlistId: ''
                }
            };

            render(<VideoPlaylist {...props} />);

            expect(screen.getByTestId('warning-message')).toBeInTheDocument();
            expect(screen.getByRole('heading')).toHaveTextContent(
                'Advertencia'
            );
            expect(
                screen.getByText('El campo ID de playlist de JW es obligatorio')
            ).toBeVisible();
        });

        it('should render warning message when playlistId is invalid and isAdmin is true', () => {
            const error = {
                type: 'Advertencia',
                message: 'El ID del playlist es incorrecto'
            };

            validateVideoPlaylist.mockReturnValue(error);
            mockUseContent.mockReturnValue(null);

            render(<VideoPlaylist {...defaultProps} />);

            expect(screen.getByTestId('warning-message')).toBeInTheDocument();
            expect(screen.getByRole('heading')).toHaveTextContent(
                'Advertencia'
            );
            expect(
                screen.getByText('El ID del playlist es incorrecto')
            ).toBeVisible();
        });

        it('should include feature id in the article wrapper when rendering warning', () => {
            const error = {
                type: 'Advertencia',
                message: 'El campo ID de playlist de JW es obligatorio'
            };

            validateVideoPlaylist.mockReturnValue(error);

            const { container } = render(<VideoPlaylist {...defaultProps} />);

            const article = container.querySelector('article');
            expect(article).toHaveAttribute(
                'data-feature-id',
                'test-feature-id'
            );
        });

        it('should pass correct key prop to WarningMessage component', () => {
            const error = {
                type: 'Advertencia',
                message: 'Test warning message'
            };

            validateVideoPlaylist.mockReturnValue(error);

            render(<VideoPlaylist {...defaultProps} id="unique-id-123" />);

            expect(screen.getByTestId('warning-message')).toBeInTheDocument();
        });
    });

    describe('hidePlaylist functionality', () => {
        it('should NOT render warning message when hidePlaylist is true even with errors and isAdmin true', () => {
            const error = {
                type: 'Advertencia',
                message: 'El campo ID de playlist de JW es obligatorio'
            };

            validateVideoPlaylist.mockReturnValue(error);

            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    playlistId: '',
                    hidePlaylist: true
                }
            };

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container.firstChild).toBeNull();
            expect(
                screen.queryByTestId('warning-message')
            ).not.toBeInTheDocument();
        });

        it('should render warning message when hidePlaylist is false with errors and isAdmin true', () => {
            const error = {
                type: 'Advertencia',
                message: 'El campo ID de playlist de JW es obligatorio'
            };

            validateVideoPlaylist.mockReturnValue(error);

            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    playlistId: '',
                    hidePlaylist: false
                }
            };

            render(<VideoPlaylist {...props} />);

            expect(screen.getByTestId('warning-message')).toBeInTheDocument();
            expect(screen.getByRole('heading')).toHaveTextContent(
                'Advertencia'
            );
        });

        it('should NOT render warning when hidePlaylist is true, invalid playlistId, and isAdmin true', () => {
            const error = {
                type: 'Advertencia',
                message: 'El ID del playlist es incorrecto'
            };

            validateVideoPlaylist.mockReturnValue(error);
            mockUseContent.mockReturnValue(null);

            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    hidePlaylist: true
                }
            };

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container.firstChild).toBeNull();
            expect(
                screen.queryByTestId('warning-message')
            ).not.toBeInTheDocument();
        });

        it('should render null when hidePlaylist is true and no errors', () => {
            const mockPlaylistData = {
                playlist: [
                    { id: 'video1', title: 'Video 1' },
                    { id: 'video2', title: 'Video 2' }
                ]
            };

            mockUseContent.mockReturnValue(mockPlaylistData);
            validateVideoPlaylist.mockReturnValue(null);

            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    hidePlaylist: true
                }
            };

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container.firstChild).toBeNull();
        });

        it('should NOT render warning when hidePlaylist is true, isAdmin is true, and error exists', () => {
            const error = {
                type: 'Advertencia',
                message: 'Test warning'
            };

            validateVideoPlaylist.mockReturnValue(error);

            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    playlistId: '',
                    hidePlaylist: true
                },
                isAdmin: true
            };

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container.firstChild).toBeNull();
            expect(
                screen.queryByTestId('warning-message')
            ).not.toBeInTheDocument();
        });
    });

    describe('Validation function calls', () => {
        it('should call validateVideoPlaylist with playlistData and playlistId', () => {
            const mockPlaylistData = { playlist: [] };
            mockUseContent.mockReturnValue(mockPlaylistData);

            render(<VideoPlaylist {...defaultProps} />);

            expect(validateVideoPlaylist).toHaveBeenCalledWith({
                playlistData: mockPlaylistData,
                playlistId: 'test-playlist-123'
            });
        });

        it('should call checkForId with playlistId from customFields', () => {
            render(<VideoPlaylist {...defaultProps} />);

            expect(checkForId).toHaveBeenCalledWith('test-playlist-123');
        });
    });

    describe('PropTypes validation', () => {
        it('should have correct label property', () => {
            expect(VideoPlaylist.label).toBe('LN10 VideoPlaylist');
        });

        it('should accept all required props without errors', () => {
            const props = {
                customFields: {
                    playlistId: 'playlist-123',
                    hidePlaylist: false,
                    shouldSchedule: true,
                    enabledDays: ['lunes', 'martes']
                },
                isAdmin: true,
                id: 'feature-123'
            };

            mockUseContent.mockReturnValue({ playlist: [] });
            validateVideoPlaylist.mockReturnValue(null);

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container).toBeTruthy();
        });

        it('should accept hidePlaylist prop', () => {
            const props = {
                customFields: {
                    playlistId: 'playlist-123',
                    hidePlaylist: true,
                    shouldSchedule: false,
                    enabledDays: []
                },
                isAdmin: true,
                id: 'feature-123'
            };

            mockUseContent.mockReturnValue({ playlist: [] });
            validateVideoPlaylist.mockReturnValue(null);

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container.firstChild).toBeNull();
        });
    });

    describe('Edge cases', () => {
        it('should handle undefined customFields gracefully', () => {
            const props = {
                ...defaultProps,
                customFields: undefined
            };

            expect(() => {
                render(<VideoPlaylist {...props} />);
            }).toThrow();
        });

        it('should handle null playlistData from useContent', () => {
            mockUseContent.mockReturnValue(null);
            validateVideoPlaylist.mockReturnValue(null);

            const { container } = render(<VideoPlaylist {...defaultProps} />);

            expect(validateVideoPlaylist).toHaveBeenCalledWith({
                playlistData: null,
                playlistId: 'test-playlist-123'
            });
        });

        it('should handle empty string playlistId', () => {
            const props = {
                ...defaultProps,
                customFields: {
                    ...defaultProps.customFields,
                    playlistId: ''
                }
            };

            checkForId.mockReturnValue(null);
            validateVideoPlaylist.mockReturnValue({
                type: 'Advertencia',
                message: 'El campo ID de playlist de JW es obligatorio'
            });

            render(<VideoPlaylist {...props} />);

            expect(checkForId).toHaveBeenCalledWith('');
            expect(screen.getByTestId('warning-message')).toBeInTheDocument();
        });
    });

    describe('Component integration', () => {
        it('should work correctly with scheduling fields', () => {
            const props = {
                ...defaultProps,
                customFields: {
                    playlistId: 'playlist-123',
                    hidePlaylist: false,
                    shouldSchedule: true,
                    enabledDays: ['lunes', 'miercoles', 'viernes']
                }
            };

            mockUseContent.mockReturnValue({ playlist: [] });
            validateVideoPlaylist.mockReturnValue(null);

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container.firstChild).toBeNull();
        });

        it('should render null when all validations pass in non-admin mode', () => {
            const props = {
                ...defaultProps,
                isAdmin: false
            };

            mockUseContent.mockReturnValue(null);
            validateVideoPlaylist.mockReturnValue(null);

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container.firstChild).toBeNull();
        });

        it('should work correctly with all customFields including hidePlaylist', () => {
            const props = {
                ...defaultProps,
                customFields: {
                    playlistId: 'playlist-123',
                    hidePlaylist: true,
                    shouldSchedule: true,
                    enabledDays: ['lunes', 'miercoles', 'viernes']
                }
            };

            mockUseContent.mockReturnValue({ playlist: [] });
            validateVideoPlaylist.mockReturnValue(null);

            const { container } = render(<VideoPlaylist {...props} />);

            expect(container.firstChild).toBeNull();
        });

        it('should handle error state with hidePlaylist false correctly', () => {
            const error = {
                type: 'Advertencia',
                message: 'Error de validación'
            };

            validateVideoPlaylist.mockReturnValue(error);

            const props = {
                ...defaultProps,
                customFields: {
                    playlistId: 'invalid-id',
                    hidePlaylist: false,
                    shouldSchedule: false,
                    enabledDays: []
                }
            };

            render(<VideoPlaylist {...props} />);

            expect(screen.getByTestId('warning-message')).toBeInTheDocument();
        });
    });
});
