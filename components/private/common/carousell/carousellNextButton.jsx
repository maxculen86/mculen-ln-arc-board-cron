import React from 'react';
export default function CarousellNextButton({ onClick }) {
    return (
        <button onClick={onClick} className={'next'}>
            Next
        </button>
    );
}
