import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

const TableComponent = () => {
    const mockData = {
        _id: 'X5YSH3FM5BBI5MK7TFPHFY2M2Y',
        additional_properties: {},
        header: [
            {
                _id: 'BUG5XD3X2JEFHPPTLTNOILMIQM',
                content: 'Dia',
                type: 'text'
            },
            {
                _id: 'F4E24WNQFZB23LDNDBJ6MMMC5M',
                content: 'Almuerzo',
                type: 'text'
            }
        ],
        rows: [
            [
                {
                    _id: 'MYGOMPD4ANA37IMYW4EPPOWISY',
                    content: 'Lunes',
                    type: 'text'
                },
                {
                    _id: 'RT25DDA5GRBF7MJ5RS6WY5NM4M',
                    content:
                        'Esto es un título de una receta <a/> con una cuantas líneas que ocupar',
                    type: 'text'
                }
            ],
            [
                {
                    _id: 'TXBQM7HW2JCDZD6MKPW5NFZ5KA',
                    content: 'Martes',
                    type: 'text'
                },
                {
                    _id: 'EQXC5XSRVJFKFAACKDWDIHIK4U',
                    content:
                        'Esto es un título de una receta con una cuantas líneas que ocupar',
                    type: 'text'
                }
            ],
            [
                {
                    _id: 'UYIOJNJW2EJCDZD6MQRS5MMFQ7',
                    content: 'Miércoles',
                    type: 'text'
                },
                {
                    _id: 'FQHIX5MLVYJFKFAACKDWDPGK7E',
                    content:
                        'Esto es un título de una receta con una cuantas líneas que ocupar',
                    type: 'text'
                }
            ],
            [
                {
                    _id: 'WEUJM2HFGEMXVDK6LQRS6NM45E',
                    content: 'Jueves',
                    type: 'text'
                },
                {
                    _id: 'HUYIV5WKDYJZKAACKDWTRGMP2U',
                    content:
                        'Esto es un título de una receta con una cuantas líneas que ocupar',
                    type: 'text'
                }
            ],
            [
                {
                    _id: 'OPIMK7HFDEXV6LK9RWS6XM21E',
                    content: 'Viernes',
                    type: 'text'
                },
                {
                    _id: 'JGITV2HYJFKNA9CKTWDSGMH2Z',
                    content:
                        'Esto es un título de una receta con una cuantas líneas que ocupar',
                    type: 'text'
                }
            ]
        ],
        type: 'table'
    };

    return (
        <div className="foodit-scrollbar overflow-x-auto">
            <table>
                <thead>
                    <tr className="flex border border-bottom border-light-300">
                        {mockData.header?.map(({ _id, content }) => (
                            <th
                                className="flex ai-center gap-8 px-16 py-12 min-w-116 prumo prumo-semibold"
                                key={_id}
                            >
                                {content}
                                <Icon size={16}>
                                    <IconSprite name="arrow-down" />
                                </Icon>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="roboto roboto-regular text-light-700">
                    {mockData.rows?.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="flex ai-center w-100 border border-bottom border-thin border-light-100"
                        >
                            {row.map(({ _id, content }) => (
                                <td
                                    className="flex ai-center py-12 px-16 white-space-nowrap white-space-normal_md min-w-116 h-72"
                                    key={_id}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: content
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
