import { Contentlab } from '@ln/contenidos-ui-contentlab';
import { Bngrid } from '@ln/contenidos-ui-bngrid';
import { Cajahashtag } from '@ln/contenidos-ui-cajahashtag';
import { Cajaafondo } from '@ln/contenidos-ui-cajaafondo';
import getComponent from '../../../../components/chains/utils/getComponent';

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

    it('should return Cajaafondo component', () => {
        const Component = getComponent(undefined, 'bnFondo');

        expect(Component).toBeTruthy();
        expect(Component).toEqual(Cajaafondo);
    });

    it('should return Bngrid component', () => {
        const Component = getComponent(undefined, undefined);

        expect(Component).toBeTruthy();
        expect(Component).toEqual(Bngrid);
    });
});
