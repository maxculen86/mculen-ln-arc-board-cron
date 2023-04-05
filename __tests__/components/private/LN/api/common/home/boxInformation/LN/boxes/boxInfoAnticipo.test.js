import boxInfoAnticipo from '../../../../../../../../../../components/private/LN/api/common/home/boxInformation/LN/boxes/boxInfoAnticipo';
describe('boxInfoAnticipo', () => {
    it('should return an object with the "text" field', () => {
        const information = {
            title: 'Lorem ipsum'
        };
        const section = 'test-section';
        const typeSection = 'test-type';
        const result = boxInfoAnticipo(information, section, typeSection);
        expect(result).toHaveProperty('text');
    });
});
