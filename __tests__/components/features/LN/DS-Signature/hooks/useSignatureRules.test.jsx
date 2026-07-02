import { useSignatureRules } from '../../../../../../components/features/LN/DS-Signature/hooks/useSignatureRules';
import { useSignature } from '../../../../../../components/features/LN/DS-Signature/hooks/useSignature';
import { getAuthorsNameAndLink } from '../../../../../../components/private/common/utils/firmaHelper';
import { getAuthorsListText } from '../../../../../../components/features/LN/DS-Signature/utils/authorHelpers';
import isExternalDistributor from '../../../../../../components/private/common/utils/isExternalDistributor';

jest.mock(
    '../../../../../../components/features/LN/DS-Signature/hooks/useSignature',
    () => ({
        useSignature: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/firmaHelper',
    () => ({
        getAuthorsNameAndLink: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN/DS-Signature/utils/authorHelpers',
    () => ({
        getAuthorsListText: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/isExternalDistributor',
    () => jest.fn()
);

describe('components - features - LN - DS-Signature - hooks - useSignatureRules', () => {
    const creditsBy = [
        {
            _id: 'author-1',
            type: 'author',
            additional_properties: {
                original: {
                    bio: 'Bio',
                    longBio: 'Long Bio',
                    role: 'Rol desde ARC Authors'
                }
            },
            social_links: [{ site: 'email', url: 'autor@lanacion.com.ar' }]
        }
    ];

    const baseArgs = {
        customFields: { position: 'Bottom' },
        globalContent: {
            credits: { by: creditsBy },
            distributor: { name: 'lanacionar', category: '' },
            withFirmaDistributor: false,
            content_elements: []
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        isExternalDistributor.mockReturnValue(false);
        getAuthorsListText.mockReturnValue('Autor Uno');
        getAuthorsNameAndLink.mockReturnValue({
            author: { name: 'Autor Uno', link: '/autor/author-1/' }
        });
        useSignature.mockReturnValue({
            photo: 'https://cdn.example.com/photo.jpg',
            medio: 'Rol desde medio',
            authors: [{ name: 'Autor Uno', link: '/autor/author-1/' }],
            dataAuthor: {
                role: 'Rol desde ARC Authors',
                gplus: 'Google+ legacy',
                image: 'https://cdn.example.com/opinion-photo.jpg',
                longBio: 'Bio'
            }
        });
    });

    it('takes author role from Authors role field in opinion layout', () => {
        const result = useSignatureRules({
            ...baseArgs,
            isOpinionLayout: true
        });

        expect(result.data.role).toBe('Rol desde ARC Authors');
    });

    it('keeps existing non-opinion behavior using medio role', () => {
        const result = useSignatureRules({
            ...baseArgs,
            isOpinionLayout: false
        });

        expect(result.data.role).toBe('Rol desde medio');
    });

    it('does not return role when there are multiple authors', () => {
        useSignature.mockReturnValue({
            photo: null,
            medio: 'Rol desde medio',
            authors: [
                { name: 'Autor Uno', link: '/autor/author-1/' },
                { name: 'Autor Dos', link: '/autor/author-2/' }
            ],
            dataAuthor: {
                role: 'Rol desde ARC Authors'
            }
        });

        const result = useSignatureRules({
            ...baseArgs,
            isOpinionLayout: true
        });

        expect(result.data.role).toBeNull();
    });

    it('hides signature for opinion with multiple authors when customFields.position === "Bottom"', () => {
        useSignature.mockReturnValue({
            photo: null,
            medio: '',
            authors: [
                { name: 'Autor Uno', link: '/autor/uno/' },
                { name: 'Autor Dos', link: '/autor/dos/' }
            ],
            dataAuthor: {}
        });
        const result = useSignatureRules({
            ...baseArgs,
            isOpinionLayout: true,
            globalContent: {
                ...baseArgs.globalContent,
                subtype: '3',
                credits: {
                    by: [
                        {
                            _id: '',
                            type: 'author',
                            additional_properties: { original: {} }
                        },
                        {
                            _id: '',
                            type: 'author',
                            additional_properties: { original: {} }
                        }
                    ]
                }
            }
        });
        expect(result.flags.shouldRender).toBe(false);
    });

    it('hides signature for opinion with single guest author without bio when customFields.position === "Bottom"', () => {
        useSignature.mockReturnValue({
            photo: null,
            medio: '',
            authors: [{ name: 'Invitado', link: '/autor/invitado/' }],
            dataAuthor: {}
        });
        const result = useSignatureRules({
            ...baseArgs,
            isOpinionLayout: true,
            globalContent: {
                ...baseArgs.globalContent,
                subtype: '3',
                credits: {
                    by: [
                        {
                            _id: '',
                            type: 'author',
                            additional_properties: { original: {} }
                        }
                    ]
                }
            }
        });
        expect(result.flags.shouldRender).toBe(false);
    });

    it('hides signature for opinion with single standard author without bio when customFields.position === "Bottom"', () => {
        useSignature.mockReturnValue({
            photo: null,
            medio: '',
            authors: [{ name: 'Standard', link: '/autor/standard/' }],
            dataAuthor: {}
        });
        const result = useSignatureRules({
            ...baseArgs,
            isOpinionLayout: true,
            globalContent: {
                ...baseArgs.globalContent,
                subtype: '3',
                credits: {
                    by: [
                        {
                            _id: 'author-1',
                            type: 'author',
                            additional_properties: { original: {} }
                        }
                    ]
                }
            }
        });
        expect(result.flags.shouldRender).toBe(false);
    });

    it('renders signature for opinion with single standard author WITH bio', () => {
        useSignature.mockReturnValue({
            photo: null,
            medio: '',
            authors: [{ name: 'Standard', link: '/autor/standard/' }],
            dataAuthor: { bio: 'Bio del autor' }
        });
        const result = useSignatureRules({
            ...baseArgs,
            isOpinionLayout: true,
            globalContent: {
                ...baseArgs.globalContent,
                subtype: '3',
                credits: {
                    by: [
                        {
                            _id: 'author-1',
                            type: 'author',
                            additional_properties: {
                                original: { bio: 'Bio del autor' }
                            }
                        }
                    ]
                }
            }
        });
        expect(result.flags.shouldRender).toBe(true);
    });

    it('keeps rendering for non-opinion regardless of author conditions', () => {
        useSignature.mockReturnValue({
            photo: null,
            medio: '',
            authors: [
                { name: 'Autor Uno', link: '/autor/uno/' },
                { name: 'Autor Dos', link: '/autor/dos/' }
            ],
            dataAuthor: {}
        });
        const result = useSignatureRules({
            ...baseArgs,
            isOpinionLayout: false,
            globalContent: {
                ...baseArgs.globalContent,
                credits: {
                    by: [
                        {
                            _id: '',
                            type: 'author',
                            additional_properties: { original: {} }
                        },
                        {
                            _id: '',
                            type: 'author',
                            additional_properties: { original: {} }
                        }
                    ]
                }
            }
        });
        expect(result.flags.shouldRender).toBe(true);
    });
});
