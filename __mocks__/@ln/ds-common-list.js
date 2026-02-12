import React from 'react';

const List = ({ tag: Tag = 'ul', children, ...props }) => (
    <Tag {...props}>{children}</Tag>
);

List.Title = ({ children, ...props }) => <div {...props}>{children}</div>;

List.Item = ({ children, align, ...props }) => <li {...props}>{children}</li>;

List.Separator = props => <hr {...props} />;

export { List };
