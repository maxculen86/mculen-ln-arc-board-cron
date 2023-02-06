import addForwardSlash, {
    addForwardSlashInInterstitialLink,
    addForwardSlashInParagraphsLinks
} from '../../../../../../components/private/LN/common/utils/addForwardSlash';

describe('Private - LN - common - utils', () => {
    describe('Tests addForwardSlash function', () => {
        describe('With no string parameter', () => {
            it('Should return null', () => {
                expect(addForwardSlash()).toBeNull();
            });
        });

        describe('With string finished in forward slash', () => {
            it('Should return same string', () => {
                const stringMock = 'https://www.lanacion.com.ar/';
                expect(addForwardSlash(stringMock)).toStrictEqual(stringMock);
            });
        });

        describe('With string NOT finished in forward slash', () => {
            it('Should return string with added forward slash', () => {
                expect(addForwardSlash('https://www.lanacion.com.ar')).toMatch(
                    /(.*)\/$/gim
                );
                expect(
                    addForwardSlash('https://www.lanacion.com.ar')
                ).toStrictEqual('https://www.lanacion.com.ar/');
            });
        });
    });

    describe('Test addForwardSlashInParagraphsLinks function', () => {
        const paragraphWithALink =
            'Se prepara el <a href="https://www.lanacion.com.ar/feriados/2024/mayo/enero/"';
        const paragraphWithTwoLinks = `Por otro lado, se prepara el <a href="https://www.lanacion.com.ar/feriados/2024/mayo/enero" 
            target="_blank">almíbar</a>. Link 2do sin barra: 
            <a href="https://www.lanacion.com.ar/feriados/2024/mayo/febrero" target="_blank">almíbar</a>`;
        const paragraphWithTwoLinksWithoutAForwardSlash = `Por otro lado, se prepara el <a href="https://www.lanacion.com.ar/feriados/2024/mayo/enero" 
            target="_blank">almíbar</a>. Link 2do sin barra: 
            <a href="https://www.lanacion.com.ar/feriados/2024/mayo/febrero/" target="_blank">almíbar</a>`;
        const paragraphWithTwoIdenticalLinksWithoutSlashesAtTheEnd = `Se prepara el <a href="https://www.lanacion.com.ar/feriados/2024/mayo" 
            target="_blank">almíbar</a>. Link 2do 
            <a href="https://www.lanacion.com.ar/feriados/2024/mayo" target="_blank">almíbar</a>`;
        const paragraphWithTwoIdenticalLinksWithoutAForwardSlash = `Se prepara el <a href="https://www.lanacion.com.ar/feriados/2024/mayo" 
            target="_blank">almíbar</a>. Link 2do 
            <a href="https://www.lanacion.com.ar/feriados/2024/mayo/" target="_blank">almíbar</a>`;
        const result = `Por otro lado, se prepara el <a href="https://www.lanacion.com.ar/feriados/2024/mayo/enero/" 
            target="_blank">almíbar</a>. Link 2do sin barra: 
            <a href="https://www.lanacion.com.ar/feriados/2024/mayo/febrero/" target="_blank">almíbar</a>`;
        const resultIdenticalLinks = `Se prepara el <a href="https://www.lanacion.com.ar/feriados/2024/mayo/" 
            target="_blank">almíbar</a>. Link 2do 
            <a href="https://www.lanacion.com.ar/feriados/2024/mayo/" target="_blank">almíbar</a>`;

        describe('When the paragraph has only one url', () => {
            it('Should return the paragraph with the slash at the end of the url', () => {
                expect(
                    addForwardSlashInParagraphsLinks(
                        'Se prepara el <a href="https://www.lanacion.com.ar/feriados/2024/mayo/enero"'
                    )
                ).toBe(paragraphWithALink);
            });

            it('Should return the paragraph with the url exactly the same when it has a forward slash', () => {
                expect(
                    addForwardSlashInParagraphsLinks(paragraphWithALink)
                ).toBe(paragraphWithALink);
            });
        });

        describe('When the paragraph has two urls exactly the same', () => {
            it('Should return the paragraph with the urls, adding the slash at the end when they don´t have it', () => {
                expect(
                    addForwardSlashInParagraphsLinks(
                        paragraphWithTwoIdenticalLinksWithoutSlashesAtTheEnd
                    )
                ).toBe(resultIdenticalLinks);
            });

            it('Should return the paragraph exactly the same', () => {
                expect(
                    addForwardSlashInParagraphsLinks(resultIdenticalLinks)
                ).toBe(resultIdenticalLinks);
            });

            it('Should return the paragraph with the urls, adding the slash at the end only to the url that does not have it', () => {
                expect(
                    addForwardSlashInParagraphsLinks(
                        paragraphWithTwoIdenticalLinksWithoutAForwardSlash
                    )
                ).toBe(resultIdenticalLinks);
            });
        });

        describe('When the paragraph has two different urls', () => {
            it('Should return the paragraph with the urls, adding the slash at the end when they don´t have it', () => {
                expect(
                    addForwardSlashInParagraphsLinks(paragraphWithTwoLinks)
                ).toBe(result);
            });

            it('Should return the paragraph exactly the same', () => {
                expect(addForwardSlashInParagraphsLinks(result)).toBe(result);
            });

            it('Should return the paragraph with the urls, adding the slash at the end only to the url that does not have it', () => {
                expect(
                    addForwardSlashInParagraphsLinks(
                        paragraphWithTwoLinksWithoutAForwardSlash
                    )
                ).toBe(result);
            });
        });
    });

    describe('Tests addForwardSlashInInterstitialLink function', () => {
        const linkWithoutSlash =
            'https://www.lanacion.com.ar/feriados/2024/mayo/enero';
        const linkWithSlash =
            'https://www.lanacion.com.ar/feriados/2024/mayo/enero/';

        it('Should return the url exactly the same when it has slash', () => {
            expect(addForwardSlashInInterstitialLink(linkWithSlash)).toBe(
                linkWithSlash
            );
        });

        it('Should return url with added forward slash when url not finished in forward slash', () => {
            expect(addForwardSlashInInterstitialLink(linkWithoutSlash)).toBe(
                linkWithSlash
            );
        });
    });
});
