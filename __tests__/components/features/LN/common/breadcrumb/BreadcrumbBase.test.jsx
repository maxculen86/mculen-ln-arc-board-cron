import React from 'react';
import { render } from '@testing-library/react';
import BreadcrumbBase from '../../../../../../components/features/LN/common/breadcrumb/BreadcrumbBase';
import renderBreadcrumbItems from '../../../../../../components/features/LN/common/breadcrumb/helpers/renderBreadcrumbItems';

jest.mock(
    '../../../../../../components/features/LN/common/breadcrumb/helpers/renderBreadcrumbItems',
    () => jest.fn(() => null)
);

// TODO: reactivate tests
xdescribe('BreadcrumbBase', () => {
    const sectionsMock = [
        { name: 'Home', path: '/' },
        { name: 'Opinion', path: '/opinion' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call renderBreadcrumbItems with basic props', () => {
        render(
            <BreadcrumbBase
                sections={sectionsMock}
                lastLinked
                host="https://www.lanacion.com.ar"
            />
        );

        expect(renderBreadcrumbItems).toHaveBeenCalledWith({
            sections: sectionsMock,
            lastLinked: true,
            extraOpts: {},
            host: 'https://www.lanacion.com.ar'
        });
    });

    it('should pass data attributes when dataSection is provided', () => {
        render(
            <BreadcrumbBase
                sections={sectionsMock}
                lastLinked={false}
                dataSection="breadcrumb"
                host="https://www.lanacion.com.ar"
            />
        );

        expect(renderBreadcrumbItems).toHaveBeenCalledWith({
            sections: sectionsMock,
            lastLinked: false,
            extraOpts: {
                'data-section': 'breadcrumb',
                'data-event': 'LinkClick'
            },
            host: 'https://www.lanacion.com.ar'
        });
    });
});
