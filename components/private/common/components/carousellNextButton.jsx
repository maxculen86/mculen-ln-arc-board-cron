import React from 'react';
import Button from '../containers/button';
export default function CarousellNextButton({ onClick }) {
    return (
        <Button onClick={onClick} className={'next'}>
            Next
        </Button>
    );
}
