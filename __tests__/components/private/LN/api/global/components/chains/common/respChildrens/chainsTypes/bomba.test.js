import { respChildrens } from '../../../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/chainsTypes/bomba';
import * as _helpers from '../../../../../../../../../../../components/private/LN/api/global/components/common/utils/_helpers';
import * as _helpers_WebApi from '../../../../../../../../../../../components/chains/utils/common/_helpers-WebApi';
describe('respChildrens bomba', () => {
    it('return null if validateChildren sApi from children in props is false', () => {
        const props = {
            children: { parameter: 'a' },
            customFields: { layout: 'layaoutTemplate' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(false);
        const result = respChildrens(props);
        expect(result).toBeNull();
    });
    it('if validateChildrens Api of children in props is true, I call setSlicedChildren with the corresponding array', () => {
        const props = {
            children: { parameter: 'a' },
            customFields: { layout: 'layaoutTemplate' }
        };
        jest.spyOn(_helpers, 'validateChildrensApi').mockReturnValue(true);
        const array = [1, 2, 3, 4];
        const setSlicedChildren = jest
            .spyOn(_helpers_WebApi, 'setSlicedChildren')
            .mockReturnValue(array);
        const calledObject = {
            children: props.children,
            config: { layout: props.customFields.layout }
        };
        const result = respChildrens(props);
        expect(result).toBe(array);
        expect(setSlicedChildren).toBeCalledWith(calledObject);
    });
});
