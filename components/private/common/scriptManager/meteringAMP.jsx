import PropTypes from 'prop-types';
import React from 'react';
const MeteringAMP = ({ canonicalUrl, contentCode, _id }) => {
    if (contentCode === '' || _id === '' || canonicalUrl === '') return <></>;

    return (
        <amp-iframe
            id="metering-iframe"
            width="1"
            height="1"
            layout="fixed"
            sandbox="allow-scripts allow-same-origin"
            frameborder="0"
            src={`https://arc-widgets.lanacion.com.ar/widgets/meteringamp/${contentCode}/${_id}/?id=${canonicalUrl}&outputType=widgets&_website=la-nacion-ar`}
        >
            <amp-img
                layout="fill"
                src="https://bucket1.glanacion.com/anexos/fotos/04/2782004h225.jpg"
                placeholder
            />
        </amp-iframe>
    );
};

MeteringAMP.propTypes = {
    canonicalUrl: PropTypes.string,
    contentCode: PropTypes.string,
    _id: PropTypes.string
};

MeteringAMP.defaultProps = {
    canonicalUrl: '',
    contentCode: 'comun',
    _id: ''
};
export default MeteringAMP;
