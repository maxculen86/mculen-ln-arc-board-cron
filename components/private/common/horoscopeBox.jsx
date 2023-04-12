import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from './com-title';
import Text from './text';
import HoroscopeItem from './horoscopeItem';
import '../../../resources/dist/css/ln/components/horoscope-box.css';

const HoroscopeBox = ({
    classCondition,
    signos,
    title,
    deployment,
    contextPath
}) => {
    return (
        <article className={`horoscope-box ${classCondition}`}>
            {title && (
                <ComTitle
                    tag="h3"
                    content={title}
                    size="--l"
                    weight="font-semi"
                />
            )}
            <div className="--items">
                <div className="zodiaco row-gap-2 row-gap-tablet-3 row-gap-desksm-4 row-gap-deskxl-6">
                    {signos.map(signo => {
                        return (
                            <HoroscopeItem
                                classCondition="--zodiaco"
                                filenameLogo={signo.nombre}
                                nombre={signo.nombre}
                                periodo={signo.periodo}
                                deployment={deployment}
                                contextPath={contextPath}
                            />
                        );
                    })}
                </div>
                <div className="chino">
                    <HoroscopeItem
                        classCondition="--chino"
                        filenameLogo="rata"
                        nombre="Horóscopo Chino"
                        deployment={deployment}
                        contextPath={contextPath}
                    />
                </div>
            </div>
        </article>
    );
};

HoroscopeBox.propTypes = {
    classCondition: PropTypes.string,
    signos: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};

HoroscopeBox.defaultProps = {
    classCondition: '',
    signos: [],
    title: ''
};

export default HoroscopeBox;
