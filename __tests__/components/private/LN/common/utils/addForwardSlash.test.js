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
        const paragraphWithLinkThatDoesNotBelongToLN =
            'Se prepara el <a href="https://www.google.com"';
        const paragraphWithTwoLinksThatDontNotBelongToLN = `Se prepara el <a href="https://www.google.com" target="_blank">almíbar</a>. Link 2do: 
            <a href="https://www.google.com/feriados" target="_blank">almíbar</a>`;
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

            it('Should return the paragraph with the url exactly the same when it does not belong to LN', () => {
                expect(
                    addForwardSlashInParagraphsLinks(
                        paragraphWithLinkThatDoesNotBelongToLN
                    )
                ).toBe(paragraphWithLinkThatDoesNotBelongToLN);
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
            it('Should return the paragraph with the urls exactly the same when they don´t belong to LN', () => {
                expect(
                    addForwardSlashInParagraphsLinks(
                        paragraphWithTwoLinksThatDontNotBelongToLN
                    )
                ).toBe(paragraphWithTwoLinksThatDontNotBelongToLN);
            });

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
        const LinkThatDoesNotBelongToLN = 'https://www.google.com/feriados';

        it('Should return the url exactly the same when it doesn´t belong to LN', () => {
            expect(
                addForwardSlashInInterstitialLink(LinkThatDoesNotBelongToLN)
            ).toBe(LinkThatDoesNotBelongToLN);
        });

        it('Should return the url exactly the same', () => {
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
