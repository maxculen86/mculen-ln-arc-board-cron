import React from 'react';
import ComTitle from '../../../common/com-title';
import '../../../../../resources/dist/css/ln/components/title.css';

const titleArticle = ({ headlines, prefix = '', size }) => {
    const { basic = '' } = headlines || {};
    const prefixText = prefix !== '' ? `${prefix} ` : '';

    return (
        <ComTitle
            tag="h1"
            weight="--font-extra"
            size={size || '--sixxl'}
            content={`${prefixText}${basic}`}
        />
    );
};

export default titleArticle;
