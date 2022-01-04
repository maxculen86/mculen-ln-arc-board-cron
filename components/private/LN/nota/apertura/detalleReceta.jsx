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
                            <strong>Tiempo de cocción:</strong> {cookTime} min.
                        </DetailsTag>
                    )}
                    {prepTime && (
                        <DetailsTag icon="knife">
                            <strong>Tiempo de preparación:</strong> {prepTime}{' '}
                            min.
                        </DetailsTag>
                    )}
                    {counterTime && (
                        <DetailsTag icon="timer">
                            <strong>Tiempo total:</strong> {counterTime} min.
                        </DetailsTag>
                    )}
                    {counterPortion && (
                        <DetailsTag icon="group">
                            <strong>Porciones:</strong> {counterPortion}
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
