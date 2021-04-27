import React from 'react';
import Text from '../../../common/text';

const Copyright = props => {
    const { tag, size } = props;

    const _tag = tag || 'p';
    const _size = size || '--threexs';

    const year = new Date().getFullYear();
    const copyrightText = `Copyright ${year} SA LA NACION | Todos los derechos reservados`;

    return (
        <Text tag={_tag} size={_size}>
            {copyrightText}
        </Text>
    );
};

export default Copyright;
