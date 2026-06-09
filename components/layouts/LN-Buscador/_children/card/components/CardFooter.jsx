import React, { memo } from 'react';
import Icon from '../../../../../features/ui/ln/icon/default';
import { footerContainer } from '../styles';

function CardFooter({ variant, author, formattedDate, dateTime }) {
    const _footerContainer = footerContainer({ variant });

    return (
        <div className={_footerContainer}>
            {variant === 'highlights' ? (
                <>
                    <p className="font-secondary font-bold text-label-sm uppercase hover:text-primary-light">
                        explorar contenido
                    </p>
                    <Icon size={12} name="arrow-right" aria-hidden="true" />
                </>
            ) : (
                <>
                    {author && (
                        <p className="text-neutral-600 text-small-lg hidden md:flex">
                            Por <span className="font-bold pl-4">{author}</span>
                        </p>
                    )}
                    {formattedDate && (
                        <time
                            dateTime={dateTime}
                            className="font-secondary text-small-lg"
                        >
                            {formattedDate}
                        </time>
                    )}
                </>
            )}
        </div>
    );
}

export default memo(CardFooter);
