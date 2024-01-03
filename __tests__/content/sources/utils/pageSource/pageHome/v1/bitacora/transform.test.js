import 'regenerator-runtime/runtime';
import transform from '../../../../../../../../content/sources/utils/pageSource/pageHome/v1/bitacora/transform';
describe('Transform bitacora v1 test', () => {
    test('Test transformacion bitacora', async () => {
        let result = await transform(
            {
                information: {
                    layoutPage: ''
                },
                content_elements: []
            },
            'http://172.17.0.1/api/mobile/v1/bitacora/10/?_website=la-nacion-ar&outputType=json'
        );
        expect(result).not.toBeNull();
    });
});
