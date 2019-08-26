import React from 'react';

import '../../../assets/bundles/css/ln/components/share.css';

// TODO: hacer. Esto es solo un mock
const share = props => {
    return (
        <div className="com-share">
            <div className="share-left">
                <button href="" className="icon-facebook" />
                <button href="" className="icon-twitter" />
                <button href="" className="icon-whatsapp" />
            </div>

            <div className="share-right">
                <button href="" className="icon-mail" />
            </div>
        </div>
    );
};

share.label = 'LN-Nota-Share';

export default share;
