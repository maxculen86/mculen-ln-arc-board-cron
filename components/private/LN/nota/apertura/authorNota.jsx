import React from 'react';
//import './index.css'

const AuthorNota = props => {
    const {
        globalContent: {
            credits: {
                by: { _id, referent }
            }
        }
    } = props;
    return (
        <h1 className={by.type}>
            {_id ? (
                <div>
                    <a className={referent.type}>{referent.id}</a>{' '}
                    <button className={referent.type} onClick={() => {}}>
                        SEGUIR
                    </button>
                </div>
            ) : null}
        </h1>
    );
};

export default AuthorNota;
