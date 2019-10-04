import React, { useEffect } from 'react';

const Comments = props => {
    useEffect(() => {
        const networkConfig = {
            network: 'la-nacion.fyre.co'
        };

        const convConfig = {
            siteId: '356483',
            articleId: 'articleId',
            el: 'livefyre',
            collectionMeta: 'collectionMeta',
            checksum: 'checksum'
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

    return <div className="livefyre" />;
};

export default Comments;
