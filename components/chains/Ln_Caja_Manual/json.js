/* eslint-disable react/prop-types */

import Consumer from 'fusion:consumer';

const CajaManual = props => {
    const { customFields, children } = props;

    try {
        const sources = children.reduce((result, article) => {
            if (article) {
                return result.concat(article);
            }
            return result;
        }, []);

        if (!sources.length) {
            return null;
        }

        return {
            information: customFields,
            articles: sources
        };
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default Consumer(CajaManual);
