import React from 'react';
import { mount } from 'enzyme';
import useViewportSize from '../../../../../components/private/common/hooks/useViewportSize';

describe('Private - Common - Hooks - useViewportSize', () => {
    it('Should return desktop', () => {
        expect(useViewportSize()).toEqual('desktop');
    });
});
