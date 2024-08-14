import React from 'react';
import Title from '../com-title';
import List from '../mod-list';

const ListSection = ({
    title = '',
    list = [],
    titleSize = '--l',
    titleTag = 'h2'
}) => (
    <div className="col-6 col-tablet-3">
        <Title content={title} tag={titleTag} size={titleSize} />
        <List mod="">{list}</List>
    </div>
);

export default ListSection;
