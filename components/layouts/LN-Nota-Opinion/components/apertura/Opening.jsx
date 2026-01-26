import React from 'react';
import Title from '../../../../features/LN/common/title/default';
import Subtitle from '../../../../features/LN/common/subtitle/default';
import Media from './Media';

function Opening({ children, className }) {
    return <div className={className}>{children}</div>;
}

Opening.Title = Title;
Opening.Subtitle = Subtitle;
Opening.Media = Media;

export default Opening;
