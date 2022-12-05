import React from 'react';
import ComButton from './com-button';
import '../../../resources/dist/css/ln/modules/mod-share.css';

const ModShare = props => {
    const { classCondition } = props;

    return (
        <section
            className={`mod-share ${classCondition ? classCondition : ''}`}
        >
            <div className="container --left">
                <ComButton iconName="facebook-filled" />
                <ComButton iconName="twitter-filled" />
                <ComButton iconName="whatsapp-filled" />
            </div>
            <div className="container --right">
                <ComButton iconName="email" />
                <ComButton iconName="comment" size="--fourxs">
                    <label for="">0</label>
                </ComButton>
            </div>
        </section>
    );
};

export default ModShare;
