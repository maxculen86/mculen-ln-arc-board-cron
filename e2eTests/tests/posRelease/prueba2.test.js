describe('Test imagen en nota', () => {
    let frame;
    beforeAll(async () => {
        frame = await e2e.goto({
            path:
                '/sociedad/polemica-en-la-quema-de-munecos-de-la-plata-nid22102020/'
        });
    });

    test('Imagen existe?', async () => {
        const selector =
            'section.cuerpo__nota div.row div.col-deskxl-10.offset-deskxl-1.col-desksm-11 div div section figure picture';
        // await page.waitForSelector(selector);
        const image = await frame.$(selector);
        expect((await image.$$('source')).length).toBe(5);
        expect((await image.$$('img')).length).toBe(1);
    });
});
