import React from 'react';
import classNames from 'classnames';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';

function IaSummary({ id, contentData = [], className = '', onClose }) {
    const _classNames = classNames('flex flex-column gap-24', className);

    if (!contentData.length) return null;

    return (
        <div id={id} className={_classNames}>
            <ul className="flex flex-column --list-inherit gap-16 pl-32 marker-24">
                {contentData.map((paragraph, index) => (
                    <li
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className="text-18"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                ))}
            </ul>

            <div className="flex justify-between items-center">
                <span className="text-12 opacity-70">Realizado con IA</span>

                {onClose && (
                    <Button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar resumen IA"
                    >
                        <Icon name="close" />
                    </Button>
                )}
            </div>
        </div>
    );
}

export default IaSummary;
