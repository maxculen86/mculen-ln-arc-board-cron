import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComText from './com-text';
import ComIco from './com-icon';
import '../../../resources/dist/css/ln/modules/mod-tooltip.css';

const ModTooltip = props => {
    return (
        <div className="mod-tooltip">
            <ComText size="--sixxs">
                Lana soñaba con volar a la luna. Todas las tardes se tumbaba en
                su cama y se imaginaba cómo sería su viaje a bordo de su propia
                nave espacial.
            </ComText>
            <ComIco iconName="close" size="--threexs" />
        </div>
    );
};

export default ModTooltip;
