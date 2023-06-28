import getTextOfContent from '../../../content/sources/utils/summarySource/getTextOfContent';
import contentElement from '../../../__mocks__/data/articles/HYNFJIBNNJE7JNL2JGT42OEZHI.json';

describe('Content Sources - Summary Source', () => {
    const textBodyExpect = contentElement[0].data;
    it('should return all text of content element', () => {
        const textBody = getTextOfContent(contentElement);
        expect(textBodyExpect).toEqual(textBody);
    });
});
