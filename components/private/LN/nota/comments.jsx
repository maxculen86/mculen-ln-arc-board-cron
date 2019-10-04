import React, { Fragment, useEffect } from 'react';

const Comments = props => {
    useEffect(() => {
        const networkConfig = {
            network: 'la-nacion.fyre.co'
        };

        const convConfig = {
            siteId: '356483',
            articleId: dataLiveFyre.getAttribute("data-entrada"),
            el: 'livefyre',
            collectionMeta: dataLiveFyre.getAttribute("data-id"),
            "datetimeFormat": {
                minutesUntilAbsoluteTime: 4,
                absoluteFormat: 'HH:mm dd/MM/y'
            },
            editorCss: {
                background: '#ccc',
                color: 'red',
                font: '30px "Helvetica Neue", Helvetica, Arial, Geneva, sans-serif'
            }
        };

        Livefyre.require(['fyre.conv#3', 'auth'], (Conv, auth) => {
            new Conv(networkConfig, [convConfig], (commentsWidget) => {}); 
            auth.delegate({
                login(callback) {
                    callback(null, { livefyre: '<userauthtoken>' });
                }
            });
        });
    }, []);

    return (
        <Fragment>
            <div id="tokenLF" data-id="" data-entrada="" data-lf-siteId="356483"></div>
            <div className="livefyre" />
        </Fragment>
    );
};

export default Comments;
