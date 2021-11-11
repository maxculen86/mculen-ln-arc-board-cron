import PropTypes from 'prop-types';

import { ComTitle as Title } from '../com-title';
import { ComLink as Link } from '../com-link';
import { ComImage as Image } from '../com-image';

import './_currencyData.scss';
import classNames from 'classnames';

const propTypes = {
    /**
     * Clases adicionales.
     */
    className: PropTypes.string,
    /**
     * Titulo.
     */
    title: PropTypes.string,
    /**
     * Valor de compra.
     */
    purchaseValue: PropTypes.string,
    /**
     * Valor de venta.
     */
    saleValue: PropTypes.string,
    /**
     * texto asociado al brands.
     */
    textBrand: PropTypes.string,
    /**
     * Alt de imagen de información.
     */
    informationAlt: PropTypes.string,
    /**
     * Alt de imagen de proveedor.
     */
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
    const classes = classNames(
        urlBrand ? 'provider-data' : 'currency-data',
        className
    );

    return (
        <>
            {!urlBrand ? (
                <div className={classes}>
                    <Title
                        tag="h2"
                        size="--xs"
                        classCondition="Arial --font-bold"
                    >
                        {title}
                    </Title>
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
                <Link link={urlBrand} classCondition={classes} type="text/css">
                    <div>
                        <span className="--sixxs">Información de</span>
                        <Image
                            className="logo byma-logo"
                            alt={informationAlt}
                            target="_blank"
                        />
                    </div>
                    <div>
                        <span className="--sixxs">provista por</span>
                        <Image
                            classCondition="logo invertir-online"
                            alt={providedAlt}
                            target="_blank"
                        />
                    </div>
                </Link>
            )}
        </>
    );
};

CurrencyData.propTypes = propTypes;
CurrencyData.defaultProps = defaultProps;

export default CurrencyData;
