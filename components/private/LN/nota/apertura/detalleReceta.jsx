import React, { Fragment } from 'react';
import PropTypes from 'fusion:prop-types';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import classNames from 'classnames';

const DetalleReceta = props => {
    const {
        receta: {
            subtype,
            embed: {
                config: { counterTime, counterPortion, cookTime, prepTime }
            }
        }
    } = props;

    const DetailsTag = ({ icon, children, className }) => {
        const classes = classNames('inline-flex ai-center gap-8', className);
        return (
            <div className={classes}>
                <Icon size={24}>
                    <IconSprite name={icon} fill="#272727" />
                </Icon>
                <span>{children}</span>
            </div>
        );
    };

    return (
        <Fragment>
            {subtype === 'custom-detalle-receta' ? (
                <section className="flex flex-column gap-8 pb-20 mb-20 border border-bottom border-thin border-neutral-light-200">
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
                        <DetailsTag icon="timer" className="mb-16">
                            <strong>Tiempo total:</strong> {counterTime} min.
                        </DetailsTag>
                    )}
                    {counterPortion && (
                        <DetailsTag icon="group">
                            <strong>Porciones:</strong> {counterPortion}
                        </DetailsTag>
                    )}
                </section>
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
