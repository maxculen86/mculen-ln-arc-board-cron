import React from 'react';
import get from '../../../../private/common/utils/get';

import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import ShareFoodit from '../ShareFoodit/foodit';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import addActionToDataLayer from '../utils/addActionToDataLayer';
import { Tooltip, useTooltip } from '@ln/common-ui-tooltip';

const buttonCopy = () => {
    navigator.clipboard.writeText(window.location.href);
};
const buttonShare = article => {
    const title = get(article, 'headlines.basic', '');
    const subTitle = get(article, 'subheadlines.basic', '');
    navigator.share({
        text: `${title}\n${subTitle}\n`,
        url: window.location.href
    });
};
const buttonComment = () => {
    const commentsBox = document.querySelector('#viafoura-comments');
    commentsBox && commentsBox.scrollIntoView({ behavior: 'smooth' });
};
const buttonPrint = () => {
    window.print();
};

export const buttonConfig = [
    {
        type: 'copy',
        handleClick: article => {
            addActionToDataLayer(article, 'copiar');
            buttonCopy();
        },
        description: 'Copiar',
        IconButton: <IconSprite name="copy" />
    },
    {
        type: 'print',
        handleClick: article => {
            addActionToDataLayer(article, 'imprimir');
            buttonPrint();
        },
        description: 'Imprimir',
        IconButton: <IconSprite name="printer" />
    },
    {
        type: 'share',
        handleClick: shareData => {
            addActionToDataLayer(shareData, 'compartir');
            buttonShare(shareData);
        },
        description: 'Compartir',
        IconButton: <IconSprite name="share" />
    },
    {
        type: 'comment',
        handleClick: article => {
            buttonComment();
            addActionToDataLayer(article, 'comentarios');
        },
        description: 'Comentarios',
        IconButton: <IconSprite name="chat" />
    }
];

const renderShareButton = ({
    IconButton,
    description,
    handleClick,
    type,
    article
}) => (
    <ShareFoodit
        key={type}
        type={type}
        article={article}
        onClickShare={handleClick}
        title={description}
        IconButton={IconButton}
    />
);

const renderRegularButton = ({
    IconButton,
    description,
    handleClick,
    type,
    article
}) => (
    <Button
        key={type}
        title={description}
        variant="link"
        onClick={() => handleClick(article)}
    >
        <Icon size={24}>{IconButton}</Icon>
    </Button>
);

const renderCopyButton = ({
    IconButton,
    description,
    handleClick,
    type,
    article
}) => {
    const { tooltipVisible, openTooltip, closeTooltip } = useTooltip();

    return (
        <div className="relative">
            <Button
                key={type}
                title={description}
                variant="link"
                onClick={() => {
                    openTooltip();
                    handleClick(article);
                }}
            >
                <Icon size={24}>{IconButton}</Icon>
            </Button>
            <Tooltip
                autoClose={2800}
                closeTooltip={closeTooltip}
                visible={tooltipVisible}
                className="rounded-4 shadow-center px-8 py-4 bg-secondary-positive text-light-1 text-12 border border-all border-thin border-light-100 z-5 w-max max-w-248"
            >
                Copiado
            </Tooltip>
        </div>
    );
};

export const renderAction = ({
    IconButton,
    description,
    handleClick,
    type,
    article
}) => {
    const options = {
        share:
            type === 'share' &&
            renderShareButton({
                IconButton,
                description,
                handleClick,
                type,
                article
            }),
        copy:
            type === 'copy' &&
            renderCopyButton({
                IconButton,
                description,
                handleClick,
                type,
                article
            }),
        default: renderRegularButton({
            IconButton,
            description,
            handleClick,
            type,
            article
        })
    };

    return Object.values(options).find(Boolean);
};
