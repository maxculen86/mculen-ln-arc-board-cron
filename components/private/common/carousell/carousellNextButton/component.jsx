import React from 'react';
import Button from '../../button';
export default function CarousellNextButton({ onClick }) {
    return (
        <Button onClick={onClick} className={'next'}>
            Next
        </Button>
    );
}
