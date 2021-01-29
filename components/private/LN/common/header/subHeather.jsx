import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/modules/mod-subheather.css';
import ComIco from '../../../common/com-icon';
import ComWeather from '../../../common/com-weather';
import ComText from '../../../common/com-text';
import ComDolar from '../../../common/com-dolar';
import ComLink from '../../../common/com-link';
import ComLogo from '../../../common/com-logo';

const ModsubHeather = props => {
    const {} = props;
    return (
        <nav>
            <div className="mod-subheather">
                <ComDolar size="--fourxs" />
                <ComWeather size="--fourxs" iconName="sun-cloudy" />
                <ComLink
                    textname="Recibí Newsletters"
                    link="https://newsletter.lanacion.com.ar/#/"
                    size="--fourxs"
                    classCondition="--newsletter"
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

export default ModsubHeather;
