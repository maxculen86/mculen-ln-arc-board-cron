import React, { Fragment } from 'react';
import PropTypes from 'fusion:prop-types';
import Icon from '../../../common/icon';

const DetalleReceta = props => {
    const {
        receta: {
            subtype,
            embed: {
                config: { counterTime, counterPortion, cookTime, prepTime }
            }
        }
    } = props;

    const DetailsTag = ({ icon, children }) => {
        return (
            <div className="row tag">
                <div className="col-2 col-tablet-1">
                    <Icon name={icon} />
                </div>
                <div className="time-number col-10 col-tablet-11">
                    <span>{children}</span>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            {subtype === 'custom-detalle-receta' ? (
                <div className="cont_tags tags">
                    {cookTime && (
                        <DetailsTag icon="fire">
                            <span className="--font-bold">
                                Tiempo de cocción:
                            </span>{' '}
                            {cookTime} min.
                        </DetailsTag>
                    )}
                    {prepTime && (
                        <DetailsTag icon="knife">
                            <span className="--font-bold">
                                Tiempo de preparación:
                            </span>{' '}
                            {prepTime} min.
                        </DetailsTag>
                    )}
                    {counterTime && (
                        <DetailsTag icon="timer">
                            <span className="--font-bold">Tiempo total:</span>{' '}
                            {counterTime} min.
                        </DetailsTag>
                    )}
                    {counterPortion && (
                        <DetailsTag icon="group">
                            <span className="--font-bold">Porciones:</span>{' '}
                            {counterPortion}
                        </DetailsTag>
                    )}
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
