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

    const detailsData = {
        cook: {
            title: 'Tiempo de cocción:',
            time: cookTime,
            icon: 'fire'
        },
        prep: {
            title: 'Tiempo de preparación:',
            time: prepTime,
            icon: 'knife'
        },
        total: {
            title: 'Tiempo total:',
            time: counterTime,
            icon: 'timer'
        },
        portions: {
            title: 'Porciones:',
            time: counterPortion,
            icon: 'group'
        }
    };

    const DetailsTag = ({ detailsData }) => {
        return (
            <div className="row">
                <div className="col-2 col-tablet-1">
                    <Icon name="group" />
                </div>
                <div className="time-number col-10 col-tablet-11">
                    <span>
                        {detailsData.title}
                        <span className="num">{detailsData.time}</span>
                        min.
                    </span>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            {subtype === 'custom-detalle-receta' ? (
                <div className="cont_tags tags">
                    {cookTime && <DetailsTag detailsData={detailsData.cook} />}
                    {prepTime && <DetailsTag detailsData={detailsData.prep} />}
                    {counterTime && (
                        <DetailsTag detailsData={detailsData.total} />
                    )}
                    {counterPortion && (
                        <DetailsTag detailsData={detailsData.portions} />
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
