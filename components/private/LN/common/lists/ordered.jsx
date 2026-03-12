import React from 'react';
import '../../../../../resources/dist/css/ln/components/com-ordered.css';

const ordered = ({ children, extraClass }) => (
    <ol className={`com-ordered`.concat(extraClass ? ` ${extraClass}` : '')}>
        {children.length > 0 &&
            children.map(item => (
                <li className="com-item" key={item.toString()}>
                    {item}
                </li>
            ))}
    </ol>
);

export default ordered;
