import React from 'react';

function Social({ twitter, facebook, instagram }) {
    return (
        <div className="com-share">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <a href={facebook} target="_blank" rel="noreferrer noopener">
                <i className="icon-facebook" />
            </a>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <a href={twitter} target="_blank" rel="noreferrer noopener">
                <i className="icon-twitter" />
            </a>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <a href={instagram} target="_blank" rel="noreferrer noopener">
                <i className="icon-instagram" />
            </a>
        </div>
    );
}

export default Social;
