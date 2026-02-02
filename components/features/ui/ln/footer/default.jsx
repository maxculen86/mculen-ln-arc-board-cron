import React from 'react';
import { Footer as CommonFooter } from '@ln/ds-common-footer';

/**
 * @typedef {import('@ln/ds-common-footer').FooterProps} FooterProps
 */
/**
 * @param {string} props.extraPropFacade
 * @param {FooterProps} props
 * @returns {React.ReactElement}
 */
function Footer({ ...props }) {
    return <CommonFooter {...props} />;
}

export default Footer;

Footer.Section = CommonFooter.Section;
Footer.Top = CommonFooter.Top;
Footer.Col = CommonFooter.Col;
Footer.Grid = CommonFooter.Grid;
Footer.Middle = CommonFooter.Middle;
Footer.Row = CommonFooter.Row;
Footer.Bottom = CommonFooter.Bottom;
Footer.Left = CommonFooter.Left;
Footer.Right = CommonFooter.Right;
