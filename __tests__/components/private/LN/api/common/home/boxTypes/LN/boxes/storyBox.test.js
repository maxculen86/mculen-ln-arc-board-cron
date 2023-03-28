import { storyBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN/boxes/storyBox';
import * as element from '../../../../../../../../../../__mocks__/data/LN10_storyTypes/storyBox.json';
import { boxInfoComplete } from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/boxes/boxInfoComplete';
import { cardRegular } from '../../../../../../../../../../components/private/LN/api/common/article/cardRegular/index';

describe('storyBox LN9', () => {
    it('test ok', () => {
        const paramsFromPage = {
            rootPath:
                'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json'
        };
        const result = storyBox(
            element,
            boxInfoComplete,
            cardRegular,
            paramsFromPage
        );
    });
});
