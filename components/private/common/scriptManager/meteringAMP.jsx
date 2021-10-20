import React from 'react';
import { ARC_WIDGETS } from 'fusion:environment';
const MeteringAMP = ({ canonicalUrl = '', contentCode = 'comun' }) => {
    return (
        <amp-iframe
            id="metering-iframe"
            width="1"
            height="1"
            layout="fixed"
            sandbox="allow-scripts allow-same-origin"
            frameborder="0"
            src={`${ARC_WIDGETS}meteringamp/${contentCode}/?outputType=widgets&_website=la-nacion-ar&id=${canonicalUrl}`}
        >
            <amp-img
                layout="fill"
                src="https://bucket1.glanacion.com/anexos/fotos/04/2782004h225.jpg"
                placeholder
            />
        </amp-iframe>
    );
};

export default MeteringAMP;
