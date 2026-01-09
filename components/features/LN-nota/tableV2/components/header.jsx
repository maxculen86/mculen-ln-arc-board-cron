import React from 'react';
import { cellVariants } from '../styles';
import stripHtml from '../../../../private/common/utils/stripHtml';

function TableHeader({ header = [] }) {
    return (
        <thead>
            <tr>
                {header.map((head, index) => (
                    <th
                        className={cellVariants(
                            {
                                variant: 'header',
                                withBorderLeft: index !== 0,
                                withBorderRight: index !== header.length - 1
                            },
                            'vertical-align-top'
                        )}
                        // TODO: Reemplazar con ID único desde el source, ARC no lo esta mandando en ._id (si no abrir ticket)
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${head?.content}-${index}`}
                        aria-label={
                            stripHtml({ html: head?.content }) || 'Columna'
                        }
                    >
                        {head?.content}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;
