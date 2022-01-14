import React from 'react';
import ModNavigation from '../../../../components/private/common/mod-navigation';
import { render } from 'enzyme';

describe('Mod-navigation test', () => {
    it('Match snapshot', () => {
        const navigation = render(<ModNavigation />);
        expect(navigation).toMatchSnapshot;
    });
});
