import React from 'react';
const MeteringAMP = ({ canonicalUrl = '', contentCode = 'comun' }) => {
    return (
        <amp-iframe
            id="metering-iframe"
            width="1"
            height="1"
            layout="fixed"
            sandbox="allow-scripts allow-same-origin"
            frameborder="0"
            src={`https://arc-widgets.lanacion.com.ar/widgets/meteringamp/${contentCode}/?outputType=widgets&_website=la-nacion-ar&id=${canonicalUrl}`}
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
