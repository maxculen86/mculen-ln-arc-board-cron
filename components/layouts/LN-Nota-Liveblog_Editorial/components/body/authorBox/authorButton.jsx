import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '../../../../../features/ui-ln/avatar/default';

function AuthorButton({ id, image, name, firstName, lastName, onClick }) {
    if (!id || !name) return null;

    return (
        <button
            type="button"
            role="link"
            key={id}
            className="author-button cursor-pointer inline-flex font-bold gap-8 w-full items-center hover:opacity-80"
            onClick={onClick}
            title="Ir a la última actualización"
            aria-label="Ir a la última actualización del autor"
        >
            <Avatar
                rounded="avatar"
                size={56}
                imageProps={image}
                className="rounded-full"
                fallbackProps={{
                    className:
                        'avatar-placeholder bg-[url("/pf/resources/images/ln-placeholder.svg")] w-full h-full bg-cover'
                }}
            />
            {firstName && lastName ? (
                <div className="flex flex-col">
                    <p className="arial text-14 text-neutral-600 text-start whitespace-nowrap">
                        {firstName}
                    </p>
                    <p className="arial text-14 text-neutral-600 text-start whitespace-nowrap">
                        {lastName}
                    </p>
                </div>
            ) : (
                <p className="arial text-14 text-neutral-600 text-start whitespace-nowrap">
                    {name}
                </p>
            )}
        </button>
    );
}

export default AuthorButton;

AuthorButton.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
    }),
    name: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

AuthorButton.defaultProps = {
    image: {},
    firstName: '',
    lastName: ''
};
