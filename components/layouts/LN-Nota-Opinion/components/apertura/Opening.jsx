import React from 'react';
import Title from '../../../../features/LN/common/title/default';
import Subtitle from '../../../../features/LN/common/subtitle/default';
import Media from './Media';
import Authors from './Authors';

function Opening({ children, className }) {
    return <div className={className}>{children}</div>;
}

Opening.Title = Title;
Opening.Subtitle = Subtitle;
Opening.Media = Media;
Opening.Authors = Authors;

export default Opening;
