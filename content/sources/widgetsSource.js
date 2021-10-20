/* eslint-disable no-underscore-dangle */
import optaSource from './optaSource';

const WIDGETS = {
    opta: { fetch: optaSource.fetch },
    viafoura: {
        transform: data => {
            const { params } = data || {};
            const [_id] = params;
            return { ...data, _id };
        }
    },
    meteringamp: {
        transform: data => data
    }
};

const fetch = query => {
    const { uri = '', id = '' } = query;
    const [, widget, ...params] = uri.split('/').filter(String);
    const { fetch: fetchWidget, transform } = WIDGETS[widget] || {};
    const data = {
        uri,
        id,
        params,
        widget
    };
    return (
        (typeof fetchWidget === 'function' && fetchWidget(query)) ||
        (typeof transform === 'function' && transform(data)) ||
        data
    );
};

export default {
    fetch,
    params: {
        uri: 'text',
        id: 'text'
    },
    ttl: 300
};
