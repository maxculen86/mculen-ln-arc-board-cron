import videoPlayerSnippet from '../../../../../components/private/common/scriptManager/snippetVideo';
import snippetVideoProps from '../../../../../__mocks__/data/scriptManager/snippetVideoProps.json';

describe('Private - Common - scriptManager - videoPlayerSnippet =>', () => {
    describe('With wrong parameters', () => {
        it('Should return null', () => {
            expect(videoPlayerSnippet({})).toBeNull();
        });
    });
    describe('With proper parameters', () => {
        const { props: { data } = {} } = videoPlayerSnippet(snippetVideoProps);
        it('Should return correct video schema', () => {
            expect(data).toStrictEqual({
                '@context': 'https://schema.org',
                '@type': 'VideoObject',
                description:
                    'Mira el programa +Realidad en su edición del 4 mayo 2022',
                duration: 'T40M19S',
                embedUrl:
                    'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/20220505/6273c21251a9cd0d74f6ed92/t_22b22fe5873e4145bf65cdf2b4612a20_name__Realidad___4_mayo_2022/file_640x360-600.mp4',
                name: '+Realidad - 4 mayo 2022',
                thumbnailUrl: [
                    'https://d3us6z9haan6vf.cloudfront.net/05-05-2022/t_49cb179900164addba1ec6b2be297d21_name_file_1280x720_2000_v3_1_.jpg'
                ],
                uploadDate: '2022-05-05 12:24:50'
            });
        });
    });
    describe('With video headline empty string', () => {
        snippetVideoProps.mediaData.headlines.basic = '  ';
        const { props: { data } = {} } = videoPlayerSnippet(snippetVideoProps);
        it('Should use image caption as schema description', () => {
            expect(data.description).toStrictEqual('MockCaption');
        });
    });
    describe('Without tituloNota, epigrafe nor createdDate', () => {
        snippetVideoProps.tituloNota = undefined;
        snippetVideoProps.mediaData.headlines.basic = undefined;
        snippetVideoProps.mediaData.created_date = undefined;
        snippetVideoProps.mediaData.promo_items.basic.caption = undefined;
        const { props: { data } = {} } = videoPlayerSnippet(snippetVideoProps);

        it('Should not break and fallback missing data', () => {
            expect(data.name).toStrictEqual('LA NACION - Noticia');
            expect(data.uploadDate).toStrictEqual('');
            expect(data.description).toStrictEqual(
                'Mira el programa +Realidad en su edición del 4 mayo 2022'
            );
        });

        it('Should use parrafo content as description when LN video', () => {
            snippetVideoProps.parrafo = {
                content: 'MockParagraph'
            };
            const { props: { data: newData } = {} } = videoPlayerSnippet(
                snippetVideoProps
            );
            expect(newData.description).toStrictEqual('MockParagraph');
        });
    });
});
