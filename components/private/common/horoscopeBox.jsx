import PropTypes from 'prop-types';

import Text from './com-text';
import HoroscopeItem from './horoscopeItem';
import '../../../resources/dist/css/ln/components/horoscope-box.css';

const HoroscopeBox = ({ classCondition, signos, showTitle }) => {
    return (
        <article className={`horoscope-box ${classCondition}`}>
            {showTitle && (
                <Text tag="h2" size="--m">
                    Seleccioná tu signo...
                </Text>
            )}
            <div className="--items">
                <div className="zodiaco row-gap-2 row-gap-tablet-3 row-gap-desksm-4 row-gap-deskxl-6">
                    {signos.map((signo, index) => {
                        return (
                            <HoroscopeItem
                                classCondition="--zodiaco"
                                filenameLogo={signo.nombre}
                                key={index}
                                nombre={signo.nombre}
                                periodo={signo.periodo}
                            />
                        );
                    })}
                </div>
                <div className="chino">
                    <HoroscopeItem
                        classCondition="--chino"
                        filenameLogo="rata"
                        nombre="Horóscopo Chino"
                    />
                </div>
            </div>
        </article>
    );
};

HoroscopeBox.propTypes = {
    classCondition: PropTypes.string,
    signos: PropTypes.array,
    showTitle: PropTypes.bool
};

export default HoroscopeBox;
