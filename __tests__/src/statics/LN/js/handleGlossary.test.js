import { handleGlossary } from '../../../../../src/statics/LN/js/handleGlossary';
import { Observable } from '../../../../../src/statics/common/js/observable';

describe('src - statics - LN - js - handleGlossary', () => {
    let publishMock;

    beforeEach(() => {
        publishMock = jest.fn();
        window.LN = {
            observable: new Observable()
        };
        window.LN.observable.publish = publishMock;

        document.addEventListener('DOMContentLoaded', () => {
            window.LN.handleGlossary = handleGlossary;
        });
        document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    it('should publish the handleGlossary event with the correct parameters', () => {
        const event = new Event('click');
        const key = 'testKey';

        window.LN.handleGlossary(event, key);

        expect(publishMock).toHaveBeenCalledWith('handleGlossary', {
            show: true,
            key,
            event
        });
    });

    it('should default the key parameter to an empty string if not provided', () => {
        const event = new Event('click');

        window.LN.handleGlossary(event);

        expect(publishMock).toHaveBeenCalledWith('handleGlossary', {
            show: true,
            key: '',
            event
        });
    });
});
