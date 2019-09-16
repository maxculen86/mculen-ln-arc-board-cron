import React from 'react';

// TODO: test y proptypes
const parrafo = ({ content }) => {
    // eslint-disable-next-line react/no-danger
    return <p dangerouslySetInnerHTML={{ __html: content }} />;
};

export default parrafo;
