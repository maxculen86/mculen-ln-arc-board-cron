import React from 'react';
import Text from '../../../common/text';

const Copyright = () => {
    const year = new Date().getFullYear();
    const copyrightText = `Copyright ${year} SA LA NACION | Todos los derechos reservados`;
    return (
        <Text tag="p" size="--threexs">
            {copyrightText}
        </Text>
    );
};

export default Copyright;
