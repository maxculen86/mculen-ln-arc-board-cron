import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../common/iconSprite/IconSprite';

function TableComponent({ data = {} }) {
    const { _id, header, rows } = data;

    return (
        <div className="foodit-scrollbar overflow-x-auto">
            <table>
                <thead>
                    <tr className="flex border border-bottom border-light-300">
                        {header?.map(({ _id: headerId, content }) => (
                            <th
                                className="flex ai-center gap-8 px-16 py-12 min-w-116 prumo prumo-semibold"
                                key={headerId}
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
                    {rows?.map((row, rowIndex) => (
                        <tr
                            // eslint-disable-next-line react/no-array-index-key
                            key={`table-${_id}-${rowIndex}`}
                            className="flex ai-center w-100 border border-bottom border-thin border-light-100"
                        >
                            {row.map(({ _id: rowId, content }) => (
                                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                                <td
                                    className="flex ai-center py-12 px-16 white-space-nowrap white-space-normal_md min-w-116 h-72"
                                    key={rowId}
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
}

export default TableComponent;
