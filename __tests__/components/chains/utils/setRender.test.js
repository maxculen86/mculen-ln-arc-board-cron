import React from 'react';
import '@testing-library/jest-dom';

import setRender from '../../../../components/chains/utils/setRender';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

describe('Components - Chains - Utils - setRender', () => {
    it('should returns warning component if isAdmin and error are true', () => {
        const options = {
            isAdmin: true,
            error: {
                type: 'generic',
                message: 'Mocked error'
            }
        };

        const {
            props: { children: section }
        } = setRender(options);

        expect(section.props).toEqual(options.error);
    });

    it('should returns empty if hideBox is true', () => {
        const options = { hideBox: true };
        const component = setRender(options);

        expect(component).toEqual(
            <section>
                <React.Fragment />
            </section>
        );
    });

    it('should returns okay with default extra option', () => {
        const options = {
            isAdmin: true,
            extraOptions: {
                default: jest.fn()
            }
        };

        const component = setRender(options);

        expect(component).toEqual(
            <section>{options.extraOptions.default}</section>
        );
    });

    it('should returns okay with multiple extra options', () => {
        const options = {
            extraOptions: {
                firstExtraOption: jest.fn(),
                secondExtraOption: jest.fn(),
                default: jest.fn()
            }
        };

        const component = setRender(options);

        expect(component).toEqual(
            <section>{options.extraOptions.firstExtraOption}</section>
        );
    });

    it('should returns without section with withSection is false', () => {
        const options = {
            withSection: false,
            extraOptions: {
                firstExtraOption: jest.fn(),
                secondExtraOption: jest.fn(),
                default: jest.fn()
            }
        };

        const component = setRender(options);
        expect(component).toEqual(options.extraOptions.firstExtraOption);
    });
});
