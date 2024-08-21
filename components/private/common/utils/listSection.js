import React from 'react';
import Title from '../com-title';
import List from '../mod-list';

const ListSection = ({
    title = '',
    list = [],
    titleSize = '--l',
    titleTag = 'h2',
    mod = '',
    className = ''
}) => {
    return (
        <div className={className}>
            <Title content={title} tag={titleTag} size={titleSize} />
            <List mod={mod}>{list}</List>
        </div>
    );
};

export default ListSection;
