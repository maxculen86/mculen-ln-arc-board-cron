import {
    buildPrimaryImageOfPage,
    buildMainEntityFromTags,
    getSchemaImages
} from '../../../../../../../components/private/LN/nota/snippet/helpers/newsArticleSchemaHelper';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com',
    API_ENV: 'sandbox',
    IS_STAGING: 'false',
    ARC_STATIC: 'https://arc-static.glanacion.com'
}));

jest.mock('fusion:properties', () => () => ({
    host: 'https://www.lanacion.com.ar'
}));

const PLACEHOLDER =
    'https://www.lanacion.com.ar/pf/resources/images/placeholderLN-1200x800.jpg';

const MAIN_IMAGE_CAPTION =
    'El 28 de septiembre de 2004, Rafael Juniors Solich asesinó a tres compañeros en una escuela de Carmen de Patagones';
const BODY_IMAGE_CAPTION =
    'Un alumno ingresó armado a un colegio de Santa Fe y mató a un compañero';

const mainImage = {
    type: 'image',
    url: 'https://sandbox-resizer.glanacion.com/resizer/v2/el-28-de-septiembre-de-2004-rafael-juniors-solich-3YRGESSOH5A5TBN5HGJBCFH42M.png?auth=822e93af946ad74abe52eb6f306bb3d63ad3c455f8eaabaa4a14b14f67a9d3d7&width=880&height=586&quality=70&smart=true',
    resized_urls: [
        {
            resizedUrl:
                'https://sandbox-resizer.glanacion.com/resizer/v2/el-28-de-septiembre-de-2004-rafael-juniors-solich-3YRGESSOH5A5TBN5HGJBCFH42M.png?auth=822e93af946ad74abe52eb6f306bb3d63ad3c455f8eaabaa4a14b14f67a9d3d7&width=880&height=586&quality=70&smart=true',
            option: {
                width: 880,
                height: 586
            }
        }
    ]
};

const bodyImage = {
    type: 'image',
    url: 'https://sandbox-resizer.glanacion.com/resizer/v2/un-alumno-ingreso-armado-a-un-colegio-de-santa-fe-EILA5UAAWFGPFHPQID4T42RSF4.jpg?auth=9e502bc440814e8ea6270c5065a0773a95513c44263675b901b3b9af24bc894d&width=768&quality=70&smart=false',
    resized_urls: [
        {
            resizedUrl:
                'https://sandbox-resizer.glanacion.com/resizer/v2/un-alumno-ingreso-armado-a-un-colegio-de-santa-fe-EILA5UAAWFGPFHPQID4T42RSF4.jpg?auth=9e502bc440814e8ea6270c5065a0773a95513c44263675b901b3b9af24bc894d&width=768&height=432&quality=70&smart=true',
            option: {
                width: 768,
                height: 432
            }
        }
    ]
};

describe('newsArticleSchemaHelper', () => {
    describe('buildPrimaryImageOfPage', () => {
        it('returns null when basicImage is not an image', () => {
            expect(
                buildPrimaryImageOfPage({
                    basicImage: { type: 'video' },
                    placeholder: PLACEHOLDER
                })
            ).toBeNull();
        });

        it('builds the same normalized image data as og:image', () => {
            const primaryImageOfPage = buildPrimaryImageOfPage({
                basicImage: {
                    ...mainImage,
                    caption: MAIN_IMAGE_CAPTION
                },
                placeholder: PLACEHOLDER
            });
            const parsedUrl = new URL(primaryImageOfPage.url);

            expect(primaryImageOfPage).toMatchObject({
                '@type': 'ImageObject',
                width: 1200,
                height: 675,
                description: MAIN_IMAGE_CAPTION
            });
            expect(`${parsedUrl.origin}${parsedUrl.pathname}`).toBe(
                'https://www.lanacion.com.ar/resizer/v2/el-28-de-septiembre-de-2004-rafael-juniors-solich-3YRGESSOH5A5TBN5HGJBCFH42M.png'
            );
            expect(parsedUrl.searchParams.get('width')).toBe('1200');
            expect(parsedUrl.searchParams.get('height')).toBe('675');
            expect(parsedUrl.searchParams.get('quality')).toBe('85');
            expect(parsedUrl.searchParams.get('smart')).toBe('true');
            expect(parsedUrl.searchParams.get('auth')).toBeTruthy();
        });

        it('omits description when caption is missing', () => {
            const primaryImageOfPage = buildPrimaryImageOfPage({
                basicImage: mainImage,
                placeholder: PLACEHOLDER
            });
            const parsedUrl = new URL(primaryImageOfPage.url);

            expect(primaryImageOfPage).toMatchObject({
                '@type': 'ImageObject',
                width: 1200,
                height: 675
            });
            expect(primaryImageOfPage.description).toBeUndefined();
            expect(`${parsedUrl.origin}${parsedUrl.pathname}`).toBe(
                'https://www.lanacion.com.ar/resizer/v2/el-28-de-septiembre-de-2004-rafael-juniors-solich-3YRGESSOH5A5TBN5HGJBCFH42M.png'
            );
            expect(parsedUrl.searchParams.get('width')).toBe('1200');
            expect(parsedUrl.searchParams.get('height')).toBe('675');
            expect(parsedUrl.searchParams.get('quality')).toBe('85');
            expect(parsedUrl.searchParams.get('smart')).toBe('true');
            expect(parsedUrl.searchParams.get('auth')).toBeTruthy();
        });
    });

    describe('buildMainEntityFromTags', () => {
        it('builds an ItemList with host-based tag urls', () => {
            expect(
                buildMainEntityFromTags({
                    host: 'https://www.lanacion.com.ar',
                    tags: [
                        {
                            description: 'Carmen de Patagones',
                            slug: 'carmen-de-patagones-tid57159'
                        },
                        {
                            text: 'Educacion'
                        }
                    ]
                })
            ).toStrictEqual({
                '@type': 'ItemList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 0,
                        item: {
                            '@type': 'WebPage',
                            '@id': 'https://www.lanacion.com.ar/tema/carmen-de-patagones-tid57159/',
                            name: 'Carmen de Patagones'
                        }
                    },
                    {
                        '@type': 'ListItem',
                        position: 1,
                        item: {
                            '@type': 'WebPage',
                            name: 'Educacion'
                        }
                    }
                ]
            });
        });

        it('returns null when tags have no usable name', () => {
            expect(
                buildMainEntityFromTags({
                    host: 'https://www.lanacion.com.ar',
                    tags: [{ slug: 'sin-nombre' }]
                })
            ).toBeNull();
        });
    });

    describe('getSchemaImages', () => {
        it('returns schema images for the main image and body images with captions', () => {
            const schemaImages = getSchemaImages({
                promoItems: {
                    basic: {
                        ...mainImage,
                        caption: MAIN_IMAGE_CAPTION
                    }
                },
                contentElements: [
                    {
                        ...bodyImage,
                        caption: BODY_IMAGE_CAPTION
                    },
                    { type: 'text', content: 'Texto' }
                ],
                placeholder: PLACEHOLDER
            });
            const mainSchemaImageUrl = new URL(schemaImages[0].url);
            const bodySchemaImageUrl = new URL(schemaImages[4].url);

            expect(schemaImages).toHaveLength(6);
            expect(schemaImages[0]).toMatchObject({
                '@type': 'ImageObject',
                width: 1200,
                height: 675,
                caption: MAIN_IMAGE_CAPTION
            });
            expect(
                `${mainSchemaImageUrl.origin}${mainSchemaImageUrl.pathname}`
            ).toBe(
                'https://www.lanacion.com.ar/resizer/v2/el-28-de-septiembre-de-2004-rafael-juniors-solich-3YRGESSOH5A5TBN5HGJBCFH42M.png'
            );
            expect(mainSchemaImageUrl.searchParams.get('width')).toBe('1200');
            expect(mainSchemaImageUrl.searchParams.get('height')).toBe('675');
            expect(mainSchemaImageUrl.searchParams.get('quality')).toBe('70');
            expect(mainSchemaImageUrl.searchParams.get('smart')).toBe('true');
            expect(mainSchemaImageUrl.searchParams.get('auth')).toBeTruthy();
            expect(schemaImages[4]).toMatchObject({
                '@type': 'ImageObject',
                width: 1200,
                height: 900,
                caption: BODY_IMAGE_CAPTION
            });
            expect(
                `${bodySchemaImageUrl.origin}${bodySchemaImageUrl.pathname}`
            ).toBe(
                'https://www.lanacion.com.ar/resizer/v2/un-alumno-ingreso-armado-a-un-colegio-de-santa-fe-EILA5UAAWFGPFHPQID4T42RSF4.jpg'
            );
            expect(bodySchemaImageUrl.searchParams.get('width')).toBe('1200');
            expect(bodySchemaImageUrl.searchParams.get('height')).toBe('900');
            expect(bodySchemaImageUrl.searchParams.get('quality')).toBe('70');
            expect(bodySchemaImageUrl.searchParams.get('smart')).toBe('true');
            expect(bodySchemaImageUrl.searchParams.get('auth')).toBeTruthy();
        });

        it('deduplicates repeated schema image urls', () => {
            const sharedImage = {
                ...mainImage,
                caption: MAIN_IMAGE_CAPTION
            };

            const schemaImages = getSchemaImages({
                promoItems: {
                    basic: sharedImage
                },
                contentElements: [sharedImage],
                placeholder: PLACEHOLDER
            });

            expect(schemaImages).toHaveLength(3);
            schemaImages.forEach(image => {
                expect(image.caption).toBe(MAIN_IMAGE_CAPTION);
            });
            const firstImageUrl = new URL(schemaImages[0].url);
            const secondImageUrl = new URL(schemaImages[1].url);
            const thirdImageUrl = new URL(schemaImages[2].url);

            expect(firstImageUrl.searchParams.get('width')).toBe('1200');
            expect(firstImageUrl.searchParams.get('height')).toBe('675');
            expect(secondImageUrl.searchParams.get('width')).toBe('1200');
            expect(secondImageUrl.searchParams.get('height')).toBe('900');
            expect(thirdImageUrl.searchParams.get('width')).toBe('1200');
            expect(thirdImageUrl.searchParams.get('height')).toBe('1200');
        });

        it('uses placeholder with 1200x800 dimensions when no real image is available', () => {
            const schemaImages = getSchemaImages({
                promoItems: {},
                contentElements: [],
                placeholder: PLACEHOLDER
            });

            expect(schemaImages).toHaveLength(1);
            expect(schemaImages[0]).toMatchObject({
                '@type': 'ImageObject',
                url: PLACEHOLDER,
                width: 1200,
                height: 800
            });
        });
    });
});
