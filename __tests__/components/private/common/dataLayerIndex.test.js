import React from 'react';
import { mount } from 'enzyme';
import DataLayerIndex from '../../../../components/private/common/dataLayerIndex';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

describe('LN - Common - DataLayer', () => {
    const globalContent = {
        subtype: '7',
        _id: '/deportes'
    };

    Context.useAppContext = jest.fn(() => ({
        globalContent: globalContent
    }));

    it('DataLayer nota recetas snapshot', () => {
        const comp = mount(
            <DataLayerIndex
                arcSite="la-nacion-ar"
                layout="LN-nota-receta"
                globalContent={globalContent}
            />
        );
        expect(comp).toMatchSnapshot();
    });

    it('DataLayer home Deportes snapshot', () => {
        const comp = mount(
            <DataLayerIndex
                arcSite="la-nacion-ar"
                layout="LN-Home_Sports"
                globalContent={globalContent}
            />
        );
        expect(comp).toMatchSnapshot();
    });
});
