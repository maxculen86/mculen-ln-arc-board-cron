import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { isSubscribed } from '../../LN/common/utils/contextHelper';

const DivBanner = props => {
    const {
        id,
        classes = '',
        shouldRender,
        closeButton,
        fixed,
        validateSuscription = false,
        withoutHide,
        isStatic
    } = props;

    const subscription = isSubscribed();
    const isSuscribed = validateSuscription ? subscription : false;
    const ref = useRef();

    if (!isStatic && (!shouldRender || (validateSuscription && isSuscribed)))
        return <></>;

    return isStatic ? (
        <Static id={id} htmlOnly>
            <div
                className={`mod-banner ${classes}  ${
                    fixed ? '--fixed' : ''
                } --${id} ${withoutHide ? '' : 'hlp-none'}`}
            >
                <div id={id} className={`com-banner ${classes || ''}`} />
            </div>
        </Static>
    ) : (
        <div
            className={`mod-banner ${classes} ${
                closeButton ? '--close' : ' '
            } ${fixed ? '--fixed' : ''} --${id} ${
                withoutHide ? '' : 'hlp-none'
            } `}
            ref={ref}
        >
            {closeButton && (
                <button
                    type="button"
                    aria-label="Close"
                    className="icon-close"
                    title="Cerrar publicidad"
                    onClick={() => ref.current.remove()}
                />
            )}
            <div id={id} className={`com-banner`} />
        </div>
    );
};

DivBanner.propTypes = {
    id: PropTypes.string.isRequired,
    classes: PropTypes.string,
    closeButton: PropTypes.bool,
    fixed: PropTypes.bool,
    validateSuscription: PropTypes.bool,
    withoutHide: PropTypes.bool,
    shouldRender: PropTypes.bool,
    isStatic: PropTypes.bool
};

DivBanner.defaultProps = {
    classes: '',
    closeButton: false,
    fixed: false,
    validateSuscription: false,
    withoutHide: false,
    isStatic: false,
    shouldRender: false
};

export default DivBanner;
