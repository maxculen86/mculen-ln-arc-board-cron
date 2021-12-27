import Text from './text/index';
import Link from './com-link';
import '../../../resources/dist/css/ln/components/daily-horoscope.css';

const DailyHoroscope = ({ data, ...r }) => {
    return (
        <article className="daily-horoscope" {...r}>
            <header className="daily-horoscope-header">
                <div>
                    <div className="falso-svg"></div>
                </div>
                <div>
                    <Text tag="h2" extraClass="title" size="--m">
                        Horóscopo de <strong>{data.nombre} HOY</strong>
                    </Text>
                    <Text tag="time" extraClass="text periodo" size="--twoxs">
                        {data.periodo}
                    </Text>
                    <Text tag="p" extraClass="text" size="--fourxs">
                        Por{' '}
                        <Link
                            link="https:www.lanacion.com.ar/autores/RenataDossi"
                            title=""
                            classCondition="--author"
                        >
                            Renata Dossi
                        </Link>
                    </Text>
                </div>
            </header>
            <main className="daily-horoscope-main">
                <Text tag="p" size="--twoxs">
                    {data.detalle}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Amor: </strong>
                    {data.elementos.Amor}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Riqueza: </strong>
                    {data.elementos.Riqueza}
                </Text>
                <Text tag="p" size="--twoxs">
                    <strong>Bienestar: </strong>
                    {data.elementos.Bienestar}
                </Text>
            </main>
        </article>
    );
};

export default DailyHoroscope;
