import React from 'react';
import PropTypes from 'prop-types';

import '../../../resources/dist/css/ln/components/horoscope-item.css';
import Link from './link';
import Text from './text';
import Image from './com-image';

const HoroscopeItem = ({ classCondition, periodo, nombre, file, ...r }) => {
    return (
        <article className={`horoscope-item ${classCondition}`} {...r}>
            <Link
                href={`https://www.lanacion.com.ar/horoscopo/${nombre}`}
                title={`Ir al detalle de ${nombre}`}
            >
                <div className="falso-svg">
                    <Image
                        src={`http://arc.lanacion.com.ar/pf/resources/images/horoscopo-zodiaco/${file}.svg?d=%24LATEST`}
                        alt={nombre}
                        width="100%"
                        height="100%"
                    />
                </div>
                <div className="container-text">
                    <Text tag="h2" extraClass="title" size="--twoxs">
                        {nombre}
                    </Text>
                    <Text tag="time" extraClass="text" size="--fivexs">
                        {periodo}
                    </Text>
                </div>
            </Link>
        </article>
    );
};

HoroscopeItem.propTypes = {
    file: PropTypes.string
};

HoroscopeItem.defaultProps = {
    file: 'cancer'
};

export default HoroscopeItem;
