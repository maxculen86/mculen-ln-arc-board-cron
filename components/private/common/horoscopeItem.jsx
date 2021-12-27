import '../../../resources/dist/css/ln/components/horoscope-item.css';
import Link from './link';
import Text from './text';

const HoroscopeItem = ({ classCondition, periodo, nombre, ...r }) => {
    return (
        <article className={`horoscope-item ${classCondition}`} {...r}>
            <Link
                href={`https://www.lanacion.com.ar/horoscopo/${nombre}`}
                title={`Ir al detalle de ${nombre}`}
            >
                <div className="falso-svg"></div>
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

export default HoroscopeItem;
