import Consumer from 'fusion:consumer';
//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../../components/private/OTT/common/activePrograms/component',
    () => 'mock-component'
);

jest.mock(
    '../../../../../../components/private/common/hocs/withNavigation',
    compo =>
        function(compo) {
            class Hoc extends compo {
                constructor(props) {
                    super(props);
                }
            }
            return Hoc;
        }
);

import React from 'react';
import { mount } from 'enzyme';
import ActiveProgramsContainer from '../../../../../../components/private/OTT/common/activePrograms/container';
import testHelper from '../../../../../utils/testHelper';

describe('OTT - layout - activePrograms - container - sin navigations', () => {
    const container = mount(<ActiveProgramsContainer navigations={[]} />);
    const component = container.find('mock-component');

    it('Testeo que no pase items', () => {
        testHelper.expectProp(component, 'items', []);
    });
});

describe('OTT - layout - activePrograms - container - con navigations', () => {
    const navigations = [
        {
            OTT_Program: {
                small_image_program_id: 'con small  image program id'
            },
            site: { site_url: 'con site url 1' },
            name: 'nombre 1'
        },
        {
            node_type: 'section',
            site: null,
            name: 'nombre 2'
        },
        {
            OTT_Program: {
                small_image_program_id: 'con small  image program id'
            },
            site: null,
            name: 'nombre 3'
        },
        {
            site: { site_url: 'con site url 4' },
            name: 'nombre 4'
        }
    ];
    const container = mount(
        <ActiveProgramsContainer navigations={navigations} />
    );

    const component = container.find('mock-component');

    it('Testeo los items que pasa al mock-component', () => {
        testHelper.expectProp(component, 'items', [
            {
                description: navigations[0].name,
                alt: navigations[0].name,
                href: navigations[0].site.site_url,
                imgId: navigations[0].OTT_Program.small_image_program_id
            },
            {
                description: navigations[1].name,
                alt: navigations[1].name,
                href: '/',
                imgId: ''
            },
            {
                description: navigations[2].name,
                alt: navigations[2].name,
                href: '/',
                imgId: navigations[2].OTT_Program.small_image_program_id
            },
            {
                description: navigations[3].name,
                alt: navigations[3].name,
                href: navigations[3].site.site_url,
                imgId: ''
            }
        ]);
    });
});

// describe('OTT - layout - activePrograms - container - con navigations - update items', () => {
//     const navigations = [
//         {
//             OTT_Program: { small_image_program_id: 'con small  image program id' },
//             site: { site_url: 'con site url 1' },
//             name: 'nombre 1'
//         },
//         {
//             node_type: 'section',
//             site: null,
//             name: 'nombre 2'
//         },
//         {
//             OTT_Program: { small_image_program_id: 'con small  image program id' },
//             site: null,
//             name: 'nombre 3'
//         },
//         {
//             site: { site_url: 'con site url 4' },
//             name: 'nombre 4'
//         }
//     ];
//     const container = mount(<ActiveProgramsContainer navigations={navigations} />);
//     const component = container.find('mock-component');
//     const newNavigations = [
//         {
//             node_type: 'section nuevo',
//             site: null,
//             name: 'nombre 1 nuevo'
//         },
//         {
//             OTT_Program: { small_image_program_id: 'con small  image program id nuevo' },
//             site: null,
//             name: 'nombre 2 nuevo'
//         }
//     ];

//     container.setProps({items: newNavigations })
//     const modifiedComponent = container.find('mock-component');
//     it('Testeo los items que pasa al mock-component', () => {
//         testHelper.expectProp(modifiedComponent, 'items', [
//             {
//                 description: navigations[0].name,
//                 alt: navigations[0].name,
//                 href: '/',
//                 imgId: ''
//             },
//             {
//                 description: navigations[1].name,
//                 alt: navigations[1].name,
//                 href: '/',
//                 //imgId: navigations[1].OTT_Program.small_image_program_id
//             }
//         ]);
//     });
// });
