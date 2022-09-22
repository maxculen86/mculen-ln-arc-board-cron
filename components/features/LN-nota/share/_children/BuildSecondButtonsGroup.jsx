/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import ComButton from '../../../../private/common/com-button';
import ModTooltip from '../../../../private/common/mod-tooltip';
import {
    buttonsList,
    BtnContainer,
    addEventToDataLayer
} from '../../../../private/LN/common/utils/shareHelper';
import '../../../../../resources/dist/css/ln/components/build-second-buttons-group.css';

const BuildSecondButtonsGroup = ({
    requestUri,
    host,
    title: basic,
    mobileTitle
} = {}) => {
    const [copy, setCopy] = useState(false);

    return (
        <div className="second-buttons-group">
            {buttonsList.map(
                ({
                    withContainer = false,
                    id,
                    dataEvent,
                    dataSection,
                    iconName,
                    title,
                    handleClick,
                    className = ''
                } = {}) => {
                    return (
                        <BtnContainer withContainer={withContainer} key={id}>
                            <ComButton
                                dataEvent={dataEvent}
                                dataSection={dataSection}
                                iconName={iconName}
                                title={title}
                                id={id}
                                onClick={() => {
                                    handleClick({
                                        requestUri,
                                        host,
                                        basic,
                                        setCopy,
                                        mobileTitle
                                    });
                                    addEventToDataLayer(title);
                                }}
                                classCondition={className}
                            />
                            {id === 'copyLinkNote' && copy && (
                                <ModTooltip
                                    className="copy"
                                    label="Copiado"
                                    handleTimeout={() => setCopy(false)}
                                />
                            )}
                        </BtnContainer>
                    );
                }
            )}
        </div>
    );
};

BuildSecondButtonsGroup.propTypes = {
    requestUri: PropTypes.string,
    host: PropTypes.string,
    title: PropTypes.string,
    mobileTitle: PropTypes.string
};

export default BuildSecondButtonsGroup;
