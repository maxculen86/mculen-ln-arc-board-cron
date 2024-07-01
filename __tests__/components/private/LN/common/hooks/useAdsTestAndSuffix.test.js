import React, { useEffect, useState } from 'react';
import Context from 'fusion:context';
import useAdsTestAndSuffix from '../../../../../../components/private/common/hooks/useAdsTestAndSuffix';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

describe('hook - useAdsTestAndSuffix', () => {
    afterEach(() => {
        setSuffix.mockClear();
    });
    const setSuffix = jest.fn().mockImplementation(x => x);
    React.useState = jest.fn().mockReturnValue([false, setSuffix]);
    React.useEffect = jest.fn().mockImplementation(f => f());

    it('Should return the correct suffix when the device is mobile ', () => {
        useAdsTestAndSuffix('mobile', 'default');
        expect(setSuffix).toHaveBeenCalledWith('_mob');
    });

    it('Should return the correct suffix when the device is tablet ', () => {
        useAdsTestAndSuffix('tablet', 'default');
        expect(setSuffix).toHaveBeenCalledWith('_tab');
    });

    it('Should return the correct suffix when the device is desktop ', () => {
        useAdsTestAndSuffix('desktop', 'default');
        expect(setSuffix).toHaveBeenCalledWith('_dsk');
    });
});
