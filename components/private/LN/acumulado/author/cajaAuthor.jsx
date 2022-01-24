import React from 'react';
import { useContent } from 'fusion:content';

import '../../../../../resources/dist/css/ln/components/author.css';
import '../../../../../resources/dist/css/ln/modules/caja-autoracu.css';
import '../../../../../resources/dist/css/ln/components/title.css';

import Author from './component/author';

const CajaAutor = props => {
    if (props.customFields && props.customFields.author) {
        const content = useContent({
            source: 'authorSourceColumnist',
            query: { _id: props.customFields.author }
        });

        if (content) {
            return <Author authors={content} />;
        }
        return null;
    }
    return null;
};

export default CajaAutor;
