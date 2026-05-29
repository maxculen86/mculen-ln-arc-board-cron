import React from 'react';

export function MessageUserLN({ message }) {
    return (
        <div className="flex justify-end">
            <p className="max-w-500 bg-neutral-50 font-secondary text-body-md text-neutral-800 p-8 rounded-sm">
                {message.content}
            </p>
        </div>
    );
}
