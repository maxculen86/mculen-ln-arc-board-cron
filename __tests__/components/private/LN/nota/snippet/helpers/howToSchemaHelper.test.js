import { getSchemaImages } from '../../../../../../../components/private/LN/nota/snippet/helpers/howToSchemaHelper';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    RESIZER_URL_PUBLIC: 'https://sandbox-resizer.glanacion.com',
    API_ENV: 'sandbox',
    IS_STAGING: 'false'
}));

jest.mock('fusion:properties', () => () => ({
    host: 'https://www.lanacion.com.ar'
}));

const mainImage = {
    type: 'image',
    url: 'https://sandbox-resizer.glanacion.com/resizer/v2/trucos-infalibles-para-que-la-ropa-H24GG3QQW5HDRGOCO3J47SSIHI.jpg?auth=7a24f315ff0594117de65452390274be7b51170a66ac5b275eef1352935cb7f8&width=880&height=586&quality=70&smart=true',
    resized_urls: [
        {
            resizedUrl:
                'https://sandbox-resizer.glanacion.com/resizer/v2/trucos-infalibles-para-que-la-ropa-H24GG3QQW5HDRGOCO3J47SSIHI.jpg?auth=7a24f315ff0594117de65452390274be7b51170a66ac5b275eef1352935cb7f8&width=880&height=586&quality=70&smart=true',
            option: {
                width: 880,
                height: 586
            }
        }
    ]
};

describe('howToSchemaHelper', () => {
    describe('getSchemaImages', () => {
        it('returns three image variants with the site domain applied', () => {
            const schemaImages = getSchemaImages({
                promoItems: { basic: mainImage }
            });

            expect(schemaImages).toHaveLength(3);

            const firstImageUrl = new URL(schemaImages[0].url);
            const secondImageUrl = new URL(schemaImages[1].url);
            const thirdImageUrl = new URL(schemaImages[2].url);

            expect(schemaImages[0]).toMatchObject({
                '@type': 'ImageObject',
                width: 1200,
                height: 675
            });
            expect(schemaImages[1]).toMatchObject({
                '@type': 'ImageObject',
                width: 1200,
                height: 900
            });
            expect(schemaImages[2]).toMatchObject({
                '@type': 'ImageObject',
                width: 1200,
                height: 1200
            });

            [firstImageUrl, secondImageUrl, thirdImageUrl].forEach(
                parsedUrl => {
                    expect(parsedUrl.origin).toBe(
                        'https://www.lanacion.com.ar'
                    );
                    expect(parsedUrl.hostname).not.toContain(
                        'sandbox-resizer.glanacion.com'
                    );
                    expect(parsedUrl.pathname).toBe(
                        '/resizer/v2/trucos-infalibles-para-que-la-ropa-H24GG3QQW5HDRGOCO3J47SSIHI.jpg'
                    );
                    expect(parsedUrl.searchParams.get('auth')).toBeTruthy();
                }
            );
            expect(firstImageUrl.searchParams.get('width')).toBe('1200');
            expect(firstImageUrl.searchParams.get('height')).toBe('675');
            expect(secondImageUrl.searchParams.get('width')).toBe('1200');
            expect(secondImageUrl.searchParams.get('height')).toBe('900');
            expect(thirdImageUrl.searchParams.get('width')).toBe('1200');
            expect(thirdImageUrl.searchParams.get('height')).toBe('1200');
        });

        it('returns placeholder variants when promoItems has no basic image', () => {
            const schemaImages = getSchemaImages({ promoItems: {} });

            expect(Array.isArray(schemaImages)).toBe(true);
            expect(schemaImages.every(item => !item.url)).toBe(true);
        });

        it('does not rewrite the domain when basic is not an image', () => {
            const schemaImages = getSchemaImages({
                promoItems: {
                    basic: { type: 'video', url: 'https://any.example.com/v' }
                }
            });

            expect(Array.isArray(schemaImages)).toBe(true);
            expect(
                schemaImages.every(
                    item => !item.url?.includes('sandbox-resizer.glanacion.com')
                )
            ).toBe(true);
        });
    });
});
