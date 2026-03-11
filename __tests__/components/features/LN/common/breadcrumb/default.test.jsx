import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '../../../../../../components/features/LN/common/breadcrumb/default';
import buildBreadcrumbSections from '../../../../../../components/features/LN/common/breadcrumb/helpers/buildBreadcrumbSections';
import { BreadcrumbBase } from '../../../../../../components/features/LN/common/breadcrumb/BreadcrumbBase';
import BreadcrumbSchema from '../../../../../../components/features/LN/common/breadcrumb/BreadcrumbSchema';

jest.mock('fusion:static', () => ({ children }) => <>{children}</>);
jest.mock(
    '../../../../../../components/features/LN/common/breadcrumb/BreadcrumbBase',
    () => ({
        BreadcrumbBase: jest.fn(() => null)
    })
);
jest.mock(
    '../../../../../../components/features/LN/common/breadcrumb/BreadcrumbSchema',
    () => jest.fn(() => null)
);
jest.mock(
    '../../../../../../components/features/LN/common/breadcrumb/helpers/buildBreadcrumbSections'
);

describe('Breadcrumb', () => {
    const sectionsMock = [{ name: 'Home', path: '/' }];
    const builtSectionsMock = [
        { name: 'LA NACION', path: '/' },
        { name: 'Opinion', path: '/opinion' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        buildBreadcrumbSections.mockReturnValue(builtSectionsMock);
    });

    it('should build breadcrumb sections with correct arguments', () => {
        render(
            <Breadcrumb
                globalContent={{
                    taxonomy: {
                        primary_section: { name: 'Opinion', path: '/opinion' },
                        sections: sectionsMock
                    }
                }}
                siteProperties={{
                    title: 'La Nacion',
                    host: 'https://www.lanacion.com.ar'
                }}
            />
        );

        expect(buildBreadcrumbSections).toHaveBeenCalledWith({
            sections: sectionsMock,
            primarySection: { name: 'Opinion', path: '/opinion' },
            siteTitle: 'La Nacion'
        });
    });

    it('should render BreadcrumbBase with correct props', () => {
        render(
            <Breadcrumb
                globalContent={{
                    taxonomy: {
                        primary_section: { name: 'Opinion', path: '/opinion' },
                        sections: sectionsMock
                    }
                }}
                siteProperties={{
                    title: 'La Nacion',
                    host: 'https://www.lanacion.com.ar'
                }}
                data-testid="breadcrumb"
            />
        );

        expect(BreadcrumbBase).toHaveBeenCalledWith(
            expect.objectContaining({
                sections: builtSectionsMock,
                lastLinked: true,
                host: 'https://www.lanacion.com.ar',
                'data-testid': 'breadcrumb'
            }),
            undefined
        );
    });

    it('should render BreadcrumbSchema with built sections', () => {
        render(
            <Breadcrumb
                globalContent={{
                    taxonomy: {
                        primary_section: { name: 'Opinion', path: '/opinion' },
                        sections: sectionsMock
                    }
                }}
                siteProperties={{
                    title: 'La Nacion',
                    host: 'https://www.lanacion.com.ar'
                }}
            />
        );

        expect(BreadcrumbSchema).toHaveBeenCalledWith(
            expect.objectContaining({
                sections: builtSectionsMock,
                host: 'https://www.lanacion.com.ar'
            }),
            undefined
        );
    });
});
