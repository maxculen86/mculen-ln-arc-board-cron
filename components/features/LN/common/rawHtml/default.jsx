import React from 'react';
import { cx } from '@ln/ds-cva';
import HtmlPym from '../../../../private/LN/nota/cuerpo/htmlPym';
import hasIframeWithPYM from '../utils/hasIframeWithPYM';

export default function RawHtml({ htmlData, idMedia = '', className = '' }) {
    if (!htmlData || !idMedia) return null;

    if (hasIframeWithPYM(htmlData)) {
        return (
            <HtmlPym
                data={{ content: htmlData, _id: idMedia }}
                className={cx(
                    'flex items-center [&>*]:w-full justify-center min-w-0 overflow-hidden',
                    className
                )}
            />
        );
    }

    return (
        <div
            className={cx(
                'flex items-center [&>*]:w-full justify-center min-w-0 overflow-hidden',
                className
            )}
            id={`anexo-${idMedia}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: htmlData }}
        />
    );
}
