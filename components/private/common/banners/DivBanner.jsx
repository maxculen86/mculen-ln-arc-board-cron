import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Static from 'fusion:static';
import { getSubscription } from '../../LN/common/utils/homeHelper';

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
    const subscription = validateSuscription ? getSubscription() : false;
    const ref = useRef();

    if (!isStatic && (!shouldRender || (validateSuscription && subscription)))
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
                    onClick={() => ref.current.remove()}
                />
            )}
            <div id={id} className={`com-banner ${classes || ''}`} />
        </div>
    );
};

DivBanner.propTypes = {
    id: PropTypes.string.isRequired,
    classes: PropTypes.string,
    closeButton: PropTypes.bool,
    fixed: PropTypes.bool,
    validateSuscription: PropTypes.bool,
    withoutHide: PropTypes.bool
};

DivBanner.defaultProps = {
    classes: '',
    closeButton: false,
    fixed: false,
    validateSuscription: false,
    withoutHide: false
};

export default DivBanner;
