import React from 'react';
import PropTypes from 'fusion:prop-types';

const DetalleReceta = props => {
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
        <div className="cont_tags tags">
            <div className="row">
                <div className="col-2 col-tablet-1">
                    <i className="icon-time" />
                </div>
                <div className="time-number col-10 col-tablet-11">
                    <span>
                        Tiempo total:
                        <span className="num">{counterTime}</span>
                        min.
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col-2 col-tablet-1">
                    <i className="icon-portion" />
                </div>
                <div className="portion-number col-10 col-tablet-11">
                    <span>
                        Porciones:
                        <span className="num">{counterPortion}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

DetalleReceta.propTypes = {
    globalContent: PropTypes.shape({
        promo_items: PropTypes.shape({
            receta: PropTypes.shape({
                embed: PropTypes.shape({
                    config: PropTypes.shape({
                        counterPortion: PropTypes.number.isRequired,
                        counterTime: PropTypes.number.isRequired,
                        title: PropTypes.string.isRequired
                    })
                })
            })
        })
    }).isRequired
};

export default DetalleReceta;
