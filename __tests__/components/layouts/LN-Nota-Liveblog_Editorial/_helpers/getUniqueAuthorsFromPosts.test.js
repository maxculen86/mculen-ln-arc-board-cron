import {
    getUniqueAuthorsFromPosts,
    scrollToFirstPostOf
} from '../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/getUniqueAuthorsFromPosts';
import get from '../../../../../components/private/common/utils/get';
import isCustomLiveblog from '../../../../../components/private/common/utils/isCustomLiveblog';

jest.mock('../../../../../components/private/common/utils/get');
jest.mock('../../../../../components/private/common/utils/isCustomLiveblog');

describe('components - layouts - LN-Nota-Liveblog_Editorial - _helper - getUniqueAuthorsFromPosts', () => {
    describe(' getUniqueAuthorsFromPosts', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return an empty array if there are no posts', () => {
            expect(getUniqueAuthorsFromPosts([])).toEqual([]);
        });

        it('should ignore posts that are not custom liveblog posts', () => {
            isCustomLiveblog.mockReturnValue(false);

            const posts = [
                {
                    embed: {
                        config: {
                            authors: [
                                {
                                    id: '1',
                                    name: 'Juan',
                                    firstName: 'Juan',
                                    lastName: 'Perez'
                                }
                            ]
                        }
                    }
                }
            ];
            expect(getUniqueAuthorsFromPosts(posts)).toEqual([]);
        });

        it('should return unique authors of valid posts', () => {
            isCustomLiveblog.mockReturnValue(true);
            get.mockImplementation(
                (post, path, fallback) =>
                    post?.embed?.config?.authors || fallback
            );

            const posts = [
                {
                    embed: {
                        config: {
                            authors: [
                                {
                                    id: '1',
                                    name: 'Juan Pérez',
                                    firstName: 'Juan',
                                    lastName: 'Pérez'
                                },
                                {
                                    id: '2',
                                    name: 'Ana Pérez',
                                    firstName: 'Ana',
                                    lastName: 'Pérez'
                                }
                            ]
                        }
                    }
                },
                { embed: { config: { authors: [{ id: '1', name: 'Juan' }] } } }
            ];

            expect(getUniqueAuthorsFromPosts(posts)).toEqual([
                {
                    id: '1',
                    name: 'Juan Pérez',
                    firstName: 'Juan',
                    lastName: 'Pérez',
                    image: { alt: 'Juan Pérez' }
                },
                {
                    id: '2',
                    name: 'Ana Pérez',
                    firstName: 'Ana',
                    lastName: 'Pérez',
                    image: { alt: 'Ana Pérez' }
                }
            ]);
        });

        it("should use name as id if it doesn't exist", () => {
            isCustomLiveblog.mockReturnValue(true);
            get.mockReturnValue([
                {
                    name: 'Carlos Pérez',
                    firstName: 'Carlos',
                    lastName: 'Pérez'
                }
            ]);

            const posts = [
                {
                    embed: {
                        config: {
                            authors: [
                                {
                                    name: 'Carlos Pérez',
                                    firstName: 'Carlos',
                                    lastName: 'Pérez'
                                }
                            ]
                        }
                    }
                }
            ];

            expect(getUniqueAuthorsFromPosts(posts)).toEqual([
                {
                    id: 'Carlos Pérez',
                    name: 'Carlos Pérez',
                    firstName: 'Carlos',
                    lastName: 'Pérez',
                    image: { alt: 'Carlos Pérez' }
                }
            ]);
        });

        it('should respect photo if it exists', () => {
            isCustomLiveblog.mockReturnValue(true);
            get.mockReturnValue([
                {
                    id: '99',
                    name: 'Lucía Pérez',
                    firstName: 'Lucía',
                    lastName: 'Pérez',
                    photo: 'custom-photo.png'
                }
            ]);

            const posts = [
                {
                    embed: {
                        config: {
                            authors: [
                                {
                                    id: '99',
                                    name: 'Lucía Pérez',
                                    firstName: 'Lucía',
                                    lastName: 'Pérez',
                                    photo: 'custom-photo.png'
                                }
                            ]
                        }
                    }
                }
            ];

            expect(getUniqueAuthorsFromPosts(posts)).toEqual([
                {
                    id: '99',
                    name: 'Lucía Pérez',
                    firstName: 'Lucía',
                    lastName: 'Pérez',
                    image: { alt: 'Lucía Pérez', src: 'custom-photo.png' }
                }
            ]);
        });
    });

    describe('scrollToFirstPostOf', () => {
        beforeEach(() => {
            document.body.innerHTML = '';
            jest.clearAllMocks();
        });

        it('calls scrollIntoView on the first matching post', () => {
            const mockScroll = jest.fn();

            const anchor = document.createElement('a');
            anchor.className = 'link ln-link';
            anchor.setAttribute('title', 'Ir a notas de José Del Rio');
            anchor.scrollIntoView = mockScroll;

            document.body.appendChild(anchor);

            scrollToFirstPostOf('José Del Rio');

            expect(mockScroll).toHaveBeenCalledWith({
                behavior: 'smooth',
                block: 'center'
            });
        });

        it('does nothing if no post matches the author name', () => {
            const mockScroll = jest.fn();

            const anchor = document.createElement('a');
            anchor.className = 'link ln-link';
            anchor.setAttribute('title', 'Ir a notas de Otro Autor');
            anchor.scrollIntoView = mockScroll;

            document.body.appendChild(anchor);

            scrollToFirstPostOf('José Del Rio');

            expect(mockScroll).not.toHaveBeenCalled();
        });

        it('does nothing if no <a> elements exist', () => {
            scrollToFirstPostOf('José Del Rio');
        });
    });
});
