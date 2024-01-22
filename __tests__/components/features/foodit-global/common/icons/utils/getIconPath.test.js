import { getIconPath } from '../../../../../../../components/features/private-global/common/iconSprite/utils/getIconPath';

const contextPath = '/pf';
const deployment = deploymentValue => deploymentValue;
const arcSite = 'foodit';

describe('Components - Features - foodit-global - Common - icons - utils - getIconPath', () => {
    it('should return an empty string if no contextPath or deployment provided', () => {
        const result = getIconPath();
        expect(result).toEqual('');
    });

    it('should match path default', () => {
        const fileName = 'foodit-sprite-default.svg';
        const expected = `/pf/resources/images/${fileName}`;
        const result = getIconPath({ contextPath, deployment, arcSite });
        expect(result).toEqual(expected);
    });

    it('should match path critical', () => {
        const fileName = 'foodit-sprite-critical.svg';
        const expected = `/pf/resources/images/${fileName}`;
        const result = getIconPath({
            contextPath,
            deployment,
            arcSite,
            critical: true
        });
        expect(result).toEqual(expected);
    });
});
