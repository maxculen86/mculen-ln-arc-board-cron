import Text from './com-text';
import HoroscopeItem from './horoscopeItem';
import '../../../resources/dist/css/ln/components/horoscope-box.css';

const HoroscopeBox = ({ signos, ...r }) => {
    return (
        <article className="horoscope-box" {...r}>
            <Text tag="h2" size="--m">
                Seleccioná tu signo...
            </Text>
            <div className="--items">
                <div className="zodiaco row-gap-2 row-gap-tablet-3 row-gap-desksm-4 row-gap-deskxl-6">
                    {signos.map((signo, index) => {
                        return (
                            <HoroscopeItem
                                nombre={signo.nombre}
                                periodo={signo.periodo}
                                key={index}
                                classCondition="--zodiaco"
                            />
                        );
                    })}
                </div>
                <div className="chino">
                    <HoroscopeItem
                        nombre="Horóscopo Chino"
                        classCondition="--chino"
                    />
                </div>
            </div>
        </article>
    );
};

export default HoroscopeBox;
