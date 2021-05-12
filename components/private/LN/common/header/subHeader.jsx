import React from 'react';
import { useContent } from 'fusion:content';

import '../../../../../resources/dist/css/ln/modules/mod-subheader.css';

import ComWeather from '../../../common/com-weather';
import ComDolar from '../../../common/com-dolar';
import ComLink from '../../../common/com-link';
import ComLogo from '../../../common/com-logo';

const ModSubheader = props => {
    const { data: dolar } = useContent({ source: 'dolarSource' }) || {};
    const { weather } = useContent({ source: 'weatherSource' }) || {};

    const [dolarBna = {}, dolarBlue = {}] = dolar || [];
    const { icon_name, temperatura, nombre } = weather || {};

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
                        title="Recibí Newsletters"
                    />

                    <ComLink
                        classCondition="com-club"
                        link="https://club.lanacion.com.ar/"
                        size="--fourxs"
                        title="Club LA NACION"
                    >
                        <ComLogo logoName="club" size="--xs" />
                        Descubrí tus beneficos
                    </ComLink>
                </nav>
            </div>
        </section>
    );
};

export default ModSubheader;
