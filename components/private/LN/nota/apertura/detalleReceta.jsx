import React, { Fragment } from 'react';
import PropTypes from 'fusion:prop-types';
import Icon from '../../../common/icon';

const DetalleReceta = props => {
    const {
        receta: {
            subtype,
            embed: {
                config: { counterTime, counterPortion }
            }
        }
    } = props;

    const Time = () => {
        return (
            <div className="row">
                <div className="col-2 col-tablet-1">
                    <Icon name="timer" />
                </div>
                <div className="time-number col-10 col-tablet-11">
                    <span>
                        Tiempo total:
                        <span className="num">{counterTime}</span>
                        min.
                    </span>
                </div>
            </div>
        );
    };

    const Portion = () => {
        return (
            <div className="row">
                <div className="col-2 col-tablet-1">
                    <Icon name="group" />
                </div>
                <div className="portion-number col-10 col-tablet-11">
                    <span>
                        Porciones:
                        <span className="num">{counterPortion}</span>
                    </span>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            {subtype === 'custom-detalle-receta' ? (
                <div className="cont_tags tags">
                    {counterTime && <Time />}
                    {counterPortion && <Portion />}
                </div>
            ) : null}
        </Fragment>
    );
};

DetalleReceta.propTypes = {
    receta: PropTypes.shape({
        subtype: PropTypes.oneOf(['custom-detalle-receta']),
        embed: PropTypes.shape({
            config: PropTypes.shape({
                counterPortion: PropTypes.number.isRequired,
                counterTime: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired
            })
        })
    }).isRequired
};

export default DetalleReceta;
