import React from 'react';
import SnippetRender from '../../../../../private/common/snippet/snippetRender';
import get from '../../../../../private/common/utils/get';
import getPageType, {
    getObjectSchema,
    layoutsListWithPageview
} from './_helper';

export default function SchemaPageview({ globalContent, layout }) {
    if (!layoutsListWithPageview.includes(layout)) {
        return null;
    }
    const pagetype = getPageType(layout, get(globalContent, '_id'));
    const schema = getObjectSchema(globalContent, pagetype);

    return <SnippetRender data={schema[pagetype]} id="pageview" />;
}
