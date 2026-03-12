/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Consumer from 'fusion:consumer';
import AcumuladoTitle from './acumuladoTitle';

function index(props) {
    const { globalContent: { _id } = {} } = props;

    return <AcumuladoTitle sectionId={_id} {...props} />;
}

export default Consumer(index);
