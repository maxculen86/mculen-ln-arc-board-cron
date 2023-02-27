import { Contentlab } from '@ln/contenidos-ui-contentlab';
import { Bngrid } from '@ln/contenidos-ui-bngrid';
import getComponent from '../../../../components/chains/utils/getComponent';
import { Cajahashtag } from '@ln/contenidos-ui-cajahashtag';

describe('Components - Utils - getComponent', () => {
    it('should return ContentLab component', () => {
        const Component = getComponent(undefined, 'cajaContent1');

        expect(Component).toBeTruthy();
        expect(Component).toEqual(Contentlab);
    });
    it('should return ContentLab component', () => {
        const Component = getComponent('Hashtag');

        expect(Component).toBeTruthy();
        expect(Component).toEqual(Cajahashtag);
    });

    it('should return Bngrid component', () => {
        const Component = getComponent(undefined, undefined);

        expect(Component).toBeTruthy();
        expect(Component).toEqual(Bngrid);
    });
});
