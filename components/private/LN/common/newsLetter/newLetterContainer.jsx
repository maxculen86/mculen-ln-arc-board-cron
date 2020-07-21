import React from 'react';
import PropTypes from 'fusion:prop-types';
import withNewsLetterData from '../hocs/withNewsLetterData';
// import NewsLetterComponent from './newsLetterComponent';
import ModNewsletter from '../../../common/mod-newsletter';
import AmpContainer from '../../../common/ampContainer';
// TODO: debe utilizar consumer. Pensar como hacer para que sea reutilizable por otra secciones donde primarySecion no exista.
// Otro container por encima que resuelva eso o una logica.
const newLetter = props => {
    const {
        service: { titulo },
        logueado,
        subscriptionsCallBack
    } = props;
    return (
        <>
            {/* <NewsLetterComponent
                logueado={logueado}
                titulo={titulo}
                subscriptionsCallBack={subscriptionsCallBack}
            /> */}
            <AmpContainer isForAmp={false}>
                <ModNewsletter
                    logueado={logueado}
                    titulo={titulo}
                    subscriptionsCallBack={subscriptionsCallBack}
                />
            </AmpContainer>
        </>
    );
};

newLetter.propTypes = {
    logueado: PropTypes.bool,
    service: PropTypes.shape({
        titulo: PropTypes.string
    }).isRequired,
    subscriptionsCallBack: PropTypes.func
};

// newLetter.defaultProps = {
//     logueado: false,
//     subscriptionsCallBack: null
// };

export default withNewsLetterData(newLetter);
