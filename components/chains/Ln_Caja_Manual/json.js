/* eslint-disable react/prop-types */

import Consumer from 'fusion:consumer';

const CajaManual = props => {
    const { customFields, children } = props;

    try {
        const sources = children.reduce(function(result, article) {
            if (!article) {
                result.push(article);
            }
            return result;
        }, []);
        if (sources.length > 0) {
            return null;
        }
        return {
            information: customFields,
            articles: children
        };
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default Consumer(CajaManual);
