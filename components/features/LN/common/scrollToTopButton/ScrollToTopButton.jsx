import React from 'react';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import {
    containerClassname,
    buttonClassname,
    textButtonClassname
} from './styles';

function ScrollToTopButton({ onClick, template = 'others' }) {
    return (
        <div data-tw className="contents">
            <div className={containerClassname({ template })}>
                <Button
                    title="Subir"
                    variant="outline"
                    color="custom"
                    className={buttonClassname({ template })}
                    onClick={onClick}
                    size="custom"
                    aria-label="Subir"
                >
                    <Icon size={20} name="arrow-line-up" aria-hidden="true" />
                    <span className={textButtonClassname({ template })}>
                        Subir
                    </span>
                </Button>
            </div>
        </div>
    );
}
export default ScrollToTopButton;
