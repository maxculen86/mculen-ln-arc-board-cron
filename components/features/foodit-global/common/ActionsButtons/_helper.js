import React from 'react';
import get from '../../../../private/common/utils/get';

import { Bookmark, Cake, Exit, Profile } from '@ln/foodit-ui-assets';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import ShareFoodit from '../ShareFoodit/foodit';

const buttonCopy = () => {
    navigator.clipboard.writeText(window.location.href);
};
const buttonShare = article => {
    navigator.share({
        title: get(article, 'headlines.basic', ''),
        text: get(article, 'subheadlines.basic', ''),
        url: window.location.href
    });
};
const buttonComment = () => {
    //TODO: funcionalidad para comentarios en foodit
};
const buttonPrint = () => {
    window.print();
};

export const buttonConfig = [
    {
        type: 'copy',
        enabled: true,
        handleClick: () => {
            buttonCopy();
        },
        description: 'Copiar',
        IconButton: <Bookmark />
    },
    {
        type: 'print',
        enabled: true,
        handleClick: () => {
            buttonPrint();
        },
        description: 'Imprimir',
        IconButton: <Profile />
    },
    {
        type: 'share',
        enabled: true,
        handleClick: shareData => {
            buttonShare(shareData);
        },
        description: 'Compartir',
        IconButton: <Exit />
    },
    {
        type: 'comment',
        enabled: true,
        handleClick: () => {
            buttonComment();
        },
        description: 'Comentarios',
        IconButton: <Cake />
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
    type
}) => (
    <Button key={type} title={description} variant="link" onClick={handleClick}>
        <Icon size={24}>{IconButton}</Icon>
    </Button>
);
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
        default: renderRegularButton({
            IconButton,
            description,
            handleClick,
            type
        })
    };

    return Object.values(options).find(Boolean);
};
