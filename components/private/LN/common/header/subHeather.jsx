import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/modules/mod-subheather.css';

import ComWeather from '../../../common/com-weather';
import ComDolar from '../../../common/com-dolar';
import ComLink from '../../../common/com-link';
import ComLogo from '../../../common/com-logo';

const ModsubHeather = ({ dolar, weather }) => {
    const [dolarBna = {}, dolarBlue = {}] = dolar || [];
    const { icon_name, temperatura, nombre } = weather || {};

    return (
        <nav>
            <div className="mod-subheather">
                <ComDolar
                    precioCompraBna={dolarBna.compra}
                    precioVentaBna={dolarBna.venta}
                    precioCompraBlue={dolarBlue.compra}
                    precioVentaBlue={dolarBlue.venta}
                    size="--fourxs"
                />

                <ComWeather
                    iconName={icon_name}
                    size="--fourxs"
                    temperature={temperatura}
                    weatherPlace={nombre}
                />

                <ComLink
                    classCondition="--newsletter"
                    link="https://newsletter.lanacion.com.ar/#/"
                    size="--fourxs"
                    textname="Recibí Newsletters"
                />

                <ComLink
                    classCondition="com-club"
                    link="https://club.lanacion.com.ar/"
                    size="--fourxs"
                >
                    <ComLogo logoName="club" size="--xs" />
                    Descubrí tus beneficos
                </ComLink>
            </div>
        </nav>
    );
};

ModsubHeather.propTypes = {
    dolar: PropTypes.object,
    weather: PropTypes.object
};

export default ModsubHeather;
