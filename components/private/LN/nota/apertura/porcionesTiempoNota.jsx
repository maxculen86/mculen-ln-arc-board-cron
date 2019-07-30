import React, { Fragment } from 'react';
import PropTypes from 'fusion:prop-types';
// import './index.css'

const mintTiempo = 'min.';

const PorcionesTiempoNota = props => {
    const {
        globalContent: {
            promo_items: {
                receta: {
                    embed: {
                        config: { counterTime, counterPortion }
                    }
                }
            }
        }
    } = props;
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="input-group" style={{ width: '100%' }}>
                        <p style={{ width: '70%' }}>
                            {/* <img
                                style={{ width: '8%' }}
                                src={imageTime}
                                alt="Logo"
                            /> */}{' '}
                            Tiempo total: {counterTime} {mintTiempo}
                        </p>
                    </div>
                    <div className="input-group" style={{ width: '100%' }}>
                        <p style={{ width: '70%' }}>
                            {/* <img
                                style={{ width: '8%' }}
                                src={imagePorcion}
                                alt="Logo"
                            /> */}{' '}
                            Porciones: {counterPortion}
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

PorcionesTiempoNota.propTypes = {
    globalContent: PropTypes.shape({
        promo_items: PropTypes.shape({
            receta: PropTypes.shape({
                embed: PropTypes.shape({
                    config: PropTypes.shape({
                        counterPortion: PropTypes.string.isRequired,
                        counterTime: PropTypes.string.isRequired,
                        title: PropTypes.string.isRequired
                    })
                })
            })
        })
    }).isRequired
};

export default PorcionesTiempoNota;
