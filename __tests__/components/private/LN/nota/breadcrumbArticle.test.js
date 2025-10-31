import React from 'react';
import { render, screen } from '@testing-library/react';

import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import siteProps from '../../../../../__mocks__/data/properties/lnSiteProps';

import Breadcrumb from '../../../../../components/private/LN/nota/breadcrumb/breadcrumbArticle';

jest.mock('fusion:content', () => ({
    useContent: () => ({
        _id: '/',
        _website: 'la-nacion-ar',
        name: 'LA NACION',
        site: {
            site_url: null
        },
        children: [
            {
                _id: '/recetas',
                site: {
                    site_url: null
                },
                children: [
                    {
                        _id: '/recetas/carnes',
                        site: {
                            site_url: null
                        }
                    }
                ]
            }
        ]
    })
}));

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        arcSite: 'la-nacion-ar'
    }))
}));

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

describe('components - private - LN - nota - breadcrumbArticle', () => {
    it('should render snapshots', () => {
        const { container } = render(
            <Breadcrumb globalContent={nota} siteProperties={siteProps} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should test Breadcrumb Test variant 2 levels', () => {
        nota.taxonomy.sections = nota.taxonomy.sections.filter(
            x =>
                ![
                    '/recetas/recetas-con-ingredientes/pollo',
                    '/recetas/recetas-con-ingredientes'
                ].includes(x._id)
        );
        nota.taxonomy.primary_section = nota.taxonomy.sections.find(
            x => x._id === '/recetas'
        );

        render(<Breadcrumb globalContent={nota} siteProperties={siteProps} />);

        expect(screen.getAllByRole('link')).toHaveLength(2);
    });

    it('should test Breadcrumb Test variant 1 level', () => {
        nota.taxonomy.sections = undefined;
        nota.taxonomy.primary_section = undefined;

        render(<Breadcrumb globalContent={nota} siteProperties={siteProps} />);

        expect(screen.getAllByRole('link')).toHaveLength(1);
    });

    it('should test when section is not defined on recursive execution.', () => {
        const note = {
            ...nota,
            taxonomy: {
                primary_section: {
                    _id: '/seguridad',
                    parent_id: '/seguridad',
                    path: '/seguridad',
                    name: 'Seguridad'
                },
                sections: [
                    {
                        _id: '/deportes',
                        path: '/deportes',
                        parent_id: '/deportes'
                    }
                ]
            }
        };

        render(<Breadcrumb globalContent={note} siteProperties={siteProps} />);

        expect(screen.getAllByRole('link')).toHaveLength(2);
    });

    it('should test when the section is defined in recursive execution', () => {
        const note = {
            ...nota,
            taxonomy: {
                primary_section: {
                    _id: '/seguridad',
                    parent_id: '/seguridad',
                    path: '/seguridad',
                    name: 'Seguridad'
                },
                sections: [
                    {
                        _id: '/seguridad',
                        path: '/seguridad-deportes',
                        name: 'Seguridad en deportes',
                        parent_id: '/deportes'
                    }
                ]
            }
        };

        render(<Breadcrumb globalContent={note} siteProperties={siteProps} />);

        expect(screen.getAllByRole('link')).toHaveLength(3);
    });
});
