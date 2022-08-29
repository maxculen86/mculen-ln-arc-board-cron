import { setTLDistribution } from '../../../../../../components/private/LN/common/utils/timeline';

describe('Private - Common - Utils - timeline - setTLDistribution', () => {
    const globalMock = {
        children: [
            { key: 'f0fKNiPSPWOa8fK' },
            { key: 'f0fbLKekQWOa87j' },
            { key: 'f0f3dZ8rQWOa8PV' },
            { key: 'f0fjuAqyQWOa87j' },
            { key: 'f0fjM9doXQoV5c8' }
        ],
        tlFeatureId: 'f0fjM9doXQoV5c8'
    };

    const { children: globalChildren, tlFeatureId } = globalMock;
    const getExpectedIndex = (id, children) =>
        children.findIndex(child => child.key === id);

    it('works in regular case', () => {
        const { content, articles, index } = setTLDistribution(
            ...Object.values(globalMock)
        );
        const expectedIndex = getExpectedIndex(tlFeatureId, globalChildren);

        expect(content.key).toEqual(tlFeatureId);
        expect(articles).toHaveLength(4);
        expect(index).toEqual(expectedIndex);
    });

    it('returns index correctly in another position', () => {
        const props = {
            ...globalMock,
            children: [
                { key: 'f0fKNiPSPWOa8fK' },
                { key: 'f0fbLKekQWOa87j' },
                { key: 'f0fjM9doXQoV5c8' },
                { key: 'f0f3dZ8rQWOa8PV' },
                { key: 'f0fjuAqyQWOa87j' }
            ]
        };

        const { index } = setTLDistribution(...Object.values(props));
        const expectedIndex = getExpectedIndex(tlFeatureId, props.children);

        expect(index).toEqual(expectedIndex);
    });

    it('always returns four articles', () => {
        const props = {
            ...globalMock,
            children: [
                { key: 'f0fKNiPSPWOa8fK' },
                { key: 'f0fbLKekQWOa87j' },
                { key: 'f0fjM9doXQoV5c8' },
                { key: 'f0f3dZ8rQWOa8PV' },
                { key: 'f0fjuAqyQWOa87j' },
                { key: 'f0fjuAqyQWOy82j' },
                { key: 'f0fjuAqyQWOa87j' },
                { key: 'f0fbLKekQWOa87j' }
            ]
        };

        const { articles } = setTLDistribution(...Object.values(props));
        expect(articles).toHaveLength(4);
    });

    it('returns null if tlFeatureId is undefined', () => {
        const props = { ...globalMock, tlFeatureId: undefined };
        const result = setTLDistribution(...Object.values(props));

        expect(result).toBeNull();
    });
});
