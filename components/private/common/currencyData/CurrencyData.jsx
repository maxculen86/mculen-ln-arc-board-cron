import PropTypes from 'prop-types';

import ComTitle from '../com-title';
import ComLink from '../com-link';
import ComImage from '../com-image';

import '../../../resources/dist/css/ln/modules/currency-data.css';

const propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    purchaseValue: PropTypes.string,
    saleValue: PropTypes.string,
    textBrand: PropTypes.string,
    informationAlt: PropTypes.string,
    providedAlt: PropTypes.string
};

const defaultProps = {
    informationAlt: 'byma-logo',
    providedAlt: 'invertir-online'
};

const CurrencyData = ({
    className,
    title,
    purchaseValue,
    saleValue,
    sourceName,
    urlBrand,
    textBrand,
    informationAlt,
    providedAlt,
    ...r
}) => {
    return (
        <>
            {!urlBrand ? (
                <div className="currency-data">
                    <ComTitle
                        tag="h2"
                        size="--xs"
                        classCondition="Arial --font-bold"
                    >
                        {title}
                    </ComTitle>
                    <p className="com-text --sixxs">
                        <span>COMPRA </span>
                        <strong>${purchaseValue}</strong>
                        {saleValue && (
                            <>
                                <span>VENTA </span>
                                <strong>${saleValue}</strong>
                            </>
                        )}
                    </p>
                </div>
            ) : (
                <ComLink
                    link={urlBrand}
                    classCondition="provider-data"
                    type="text/css"
                >
                    <div>
                        <div>
                            <span className="--sixxs">Información de</span>
                            <ComImage
                                className="logo byma-logo"
                                alt={informationAlt}
                                target="_blank"
                            />
                        </div>
                        <div>
                            <span className="--sixxs">provista por</span>
                            <ComImage
                                classCondition="logo invertir-online"
                                alt={providedAlt}
                                target="_blank"
                            />
                        </div>
                    </div>
                </ComLink>
            )}
        </>
    );
};

CurrencyData.propTypes = propTypes;
CurrencyData.defaultProps = defaultProps;

export default CurrencyData;
