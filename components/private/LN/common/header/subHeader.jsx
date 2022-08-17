import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/modules/mod-subheader.css';

import ComWeather from '../../../common/com-weather';
import ComDolar from '../../../common/com-dolar';
import ComLink from '../../../common/com-link';
import Club from '../../../common/icons/system/Club';

const ModSubheader = props => {
    const { dollar = [], weather = {} } = props;
    const [dolarBna = {}, dolarBlue = {}] = dollar;
    const {
        dataService: { locations = [] }
    } = weather;

    const { current_temp: temperatura = '', weather: weatherInfo = {} } =
        locations.find(e => {
            const { location_id: locationId } = e;

            return locationId === 'ciudad-de-buenos-aires';
        }) || {};

    return (
        <section className="mod-subheader">
            <div className="lay">
                <nav className="row">
                    <ComDolar
                        precioCompraBna={dolarBna.compra}
                        precioVentaBna={dolarBna.venta}
                        precioCompraBlue={dolarBlue.compra}
                        precioVentaBlue={dolarBlue.venta}
                        size="--fourxs"
                    />

                    <ComWeather
                        iconName={weatherInfo.id || ''}
                        size="--fourxs"
                        temperature={temperatura}
                        weatherPlace="Capital Federal"
                    />

                    <ComLink
                        classCondition="--newsletter"
                        dataEvent="LinkClick"
                        dataSection="MenuLN"
                        link="https://newsletter.lanacion.com.ar/#/"
                        size="--fourxs"
                        textname="Recibí Newsletters"
                        title="Recibí Newsletters"
                    />

                    <ComLink
                        classCondition="com-club"
                        dataEvent="LinkClick"
                        dataSection="MenuLN"
                        link="https://club.lanacion.com.ar/"
                        size="--fourxs"
                        title="Ir a Club LA NACION"
                    >
                        <Club className="club" />
                        Descubrí tus beneficios
                    </ComLink>
                </nav>
            </div>
        </section>
    );
};

ModSubheader.propTypes = {
    dollar: PropTypes.arrayOf(PropTypes.object).isRequired,
    weather: PropTypes.shape({
        icon_name: PropTypes.string.isRequired,
        temperatura: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired
    }).isRequired
};

export default ModSubheader;
