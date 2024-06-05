import classNames from 'classnames';

export const getClassNameByLayout = ({ layout }) => {
    const spacingByLayout =
        layout !== 'LN-nota-video' ? 'jc-between flex-row_sm ai-center_sm' : '';
    const containerClasses = classNames(
        'mod-date-container',
        'flex flex-column gap-8',
        'mb-16',
        'text-neutral-light-600',
        spacingByLayout,
    );
    return containerClasses;
};
