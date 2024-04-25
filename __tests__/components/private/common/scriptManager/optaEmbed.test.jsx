import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptaEmbed from '../../../../../components/private/common/scriptManager/optaEmbed';

jest.mock('fusion:consumer', () => component => component);

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        deployment: jest.fn(),
        contextPath: '/pf'
    }))
}));

describe('OptaEmbed', () => {
    it('does not render script element when type is not "story" and contentElements are not present', () => {
        const props = {
            globalContent: {
                type: 'not_a_story'
            },
            renderables: []
        };

        const { container } = render(<OptaEmbed {...props} />);

        expect(container.querySelector('#script-opta-embed')).toBeNull();
    });

    it('does not render script element when no Opta elements are present', () => {
        const props = {
            globalContent: {
                type: 'story',
                content_elements: [],
                promo_items: {}
            },
            renderables: []
        };

        const { container } = render(<OptaEmbed {...props} />);

        expect(container.querySelector('#script-opta-embed')).toBeNull();
    });

    it('renders script element with Opta configuration when Opta elements are present', () => {
        const props = {
            globalContent: {
                type: 'story',
                content_elements: [
                    {
                        _id: 'OW2OP6LPXBHSLDBG5AIUKM5QNA',
                        additional_properties: {},
                        content:
                            '<style>\nspan.mod-date {max-width: 250px;margin: auto;margin-top: 40px;border-top: 1px #ccc solid;padding-top: 20px;}\n.nota .com-embed {max-width: 900px;margin: auto;}\n.com-breadcrumb{justify-content: center;}\n.mod-date,.com-partner {justify-content: center;}\n.Opta h2{display:none;}\n.--font-primary.--font-extra.--sixxl{text-align: center; font-size: 3.5rem}\n.Opta-Team.Opta-Away.Opta-TeamName, .Opta-Team.Opta-TeamName.Opta-Home {font-family: Prumo;font-size:14px}\n.Opta-Divider {font-family: Prumo;}\n.Opta .Opta_R_F.Opta_R_F_N .Opta-fixture {border-bottom: 1px solid #ddd;}\n.Opta .Opta-Odd td  {background: #fafafa; padding-top:12px;}\n.Opta .Opta-Even td  {background: #fafafa; padding-top:12px}\n.Opta h3 {font-size:1.5rem;font-family: \'Prumo\';background:#eeeeee;display: flex;justify-content: center;margin-top: 40px;border-bottom:1px solid #d0d0d0;border-radius:5px 5px 0px 0px;}\n.Opta h3 span {font-size:14px;text-transform:uppercase;font-variation-settings:"wght" 150,"opsz" 40; }\n.Opta td {padding: 0px}\ntd.Opta-Outer.Opta-Time {font-weight: bold}\ntd.Opta-Venue {font-family: suecanano; font-size: 11px; font-weight: 100;}\n.Opta .Opta_R_F.Opta_R_F_N tr.Opta-agg td {color: #006590}\n.com-partner{padding-bottom:30px}\n.grupos {padding-top:50px;font-size: 1.8rem;font-family: \'Prumo\';font-variation-settings:"wght" 150,"opsz" 40;text-align: center;color: #166a98;border-top: 1px #176b98 solid;}\n.Opta table thead th.Opta-Sort.Opta-Sort-HeaderSortUp {background-color: #00aeef;}\n.Opta thead th {background-color: #e0f6ff;}\n.Opta_F_F.Opta_F_F_N .Opta-Scoreline .Opta-Home, Opta .Opta_F_F.Opta_F_F_N .Opta-Scoreline .Opta-Team {font-weight: bold;}\n.Opta .Opta_F_F.Opta_F_F_N .Opta-Scoreline .Opta-Outer {color: none;}\n</style>',
                        type: 'raw_html'
                    }
                ],
                promo_items: {
                    apertura_multimedia: {
                        _id: 'EGQUTPFWWZCUJOMPNRTLVFZ7W4',
                        content:
                            '<div class=grupos>CALENDARIO</div><opta-widget widget="fixtures" competition="210" season="2024" template="normal" live="true" show_venue="true" match_status="all" grouping="date" show_grouping="true" navigation="none" default_nav="1" start_on_current="true" sub_grouping="date" show_subgrouping="true" order_by="date_ascending" show_crests="true" date_format="dddd D MMMM YYYY" month_date_format="MMMM" competition_naming="full" team_naming="full" pre_match="false" show_live="true" show_logo="true" show_title="true" breakpoints="400" sport="rugby"></opta-widget>\n\n<div class=grupos>GRUPOS</div><opta-widget widget="standings" competition="210" season="2024" template="normal" live="true" default_nav="1" show_key="true" show_crests="true" points_in_first_column="true" show_form="6" competition_naming="full" team_naming="full" date_format="dddd D MMMM YYYY" sorting="true" show_live="true" show_logo="true" show_title="true" breakpoints="400,700" sport="rugby"></opta-widget>',
                        type: 'raw_html'
                    }
                }
            },
            renderables: [
                {
                    collection: 'layouts',
                    type: 'LN-nota-infografia'
                }
            ]
        };

        const { container } = render(<OptaEmbed {...props} />);

        expect(
            container.querySelector('#script-opta-embed')
        ).toBeInTheDocument();
    });

    it('renders script element with Opta configuration when Opta elements are present', () => {
        const props = {
            globalContent: {
                type: 'story',
                content_elements: [
                    {
                        _id: 'OW2OP6LPXBHSLDBG5AIUKM5QNA',
                        additional_properties: {},
                        content:
                            '<style>\nspan.mod-date {max-width: 250px;margin: auto;margin-top: 40px;border-top: 1px #ccc solid;padding-top: 20px;}\n.nota .com-embed {max-width: 900px;margin: auto;}\n.com-breadcrumb{justify-content: center;}\n.mod-date,.com-partner {justify-content: center;}\n.Opta h2{display:none;}\n.--font-primary.--font-extra.--sixxl{text-align: center; font-size: 3.5rem}\n.Opta-Team.Opta-Away.Opta-TeamName, .Opta-Team.Opta-TeamName.Opta-Home {font-family: Prumo;font-size:14px}\n.Opta-Divider {font-family: Prumo;}\n.Opta .Opta_R_F.Opta_R_F_N .Opta-fixture {border-bottom: 1px solid #ddd;}\n.Opta .Opta-Odd td  {background: #fafafa; padding-top:12px;}\n.Opta .Opta-Even td  {background: #fafafa; padding-top:12px}\n.Opta h3 {font-size:1.5rem;font-family: \'Prumo\';background:#eeeeee;display: flex;justify-content: center;margin-top: 40px;border-bottom:1px solid #d0d0d0;border-radius:5px 5px 0px 0px;}\n.Opta h3 span {font-size:14px;text-transform:uppercase;font-variation-settings:"wght" 150,"opsz" 40; }\n.Opta td {padding: 0px}\ntd.Opta-Outer.Opta-Time {font-weight: bold}\ntd.Opta-Venue {font-family: suecanano; font-size: 11px; font-weight: 100;}\n.Opta .Opta_R_F.Opta_R_F_N tr.Opta-agg td {color: #006590}\n.com-partner{padding-bottom:30px}\n.grupos {padding-top:50px;font-size: 1.8rem;font-family: \'Prumo\';font-variation-settings:"wght" 150,"opsz" 40;text-align: center;color: #166a98;border-top: 1px #176b98 solid;}\n.Opta table thead th.Opta-Sort.Opta-Sort-HeaderSortUp {background-color: #00aeef;}\n.Opta thead th {background-color: #e0f6ff;}\n.Opta_F_F.Opta_F_F_N .Opta-Scoreline .Opta-Home, Opta .Opta_F_F.Opta_F_F_N .Opta-Scoreline .Opta-Team {font-weight: bold;}\n.Opta .Opta_F_F.Opta_F_F_N .Opta-Scoreline .Opta-Outer {color: none;}\n</style>',
                        type: 'raw_html'
                    }
                ],
                promo_items: {
                    apertura_multimedia: {
                        _id: 'EGQUTPFWWZCUJOMPNRTLVFZ7W4',
                        content:
                            '<div class=grupos>CALENDARIO</div><opta-widget widget="fixtures" competition="210" season="2024" template="normal" live="true" show_venue="true" match_status="all" grouping="date" show_grouping="true" navigation="none" default_nav="1" start_on_current="true" sub_grouping="date" show_subgrouping="true" order_by="date_ascending" show_crests="true" date_format="dddd D MMMM YYYY" month_date_format="MMMM" competition_naming="full" team_naming="full" pre_match="false" show_live="true" show_logo="true" show_title="true" breakpoints="400" sport="rugby"></opta-widget>\n\n<div class=grupos>GRUPOS</div><opta-widget widget="standings" competition="210" season="2024" template="normal" live="true" default_nav="1" show_key="true" show_crests="true" points_in_first_column="true" show_form="6" competition_naming="full" team_naming="full" date_format="dddd D MMMM YYYY" sorting="true" show_live="true" show_logo="true" show_title="true" breakpoints="400,700" sport="rugby"></opta-widget>',
                        type: 'raw_html'
                    }
                }
            },
            renderables: [
                {
                    collection: 'layouts',
                    type: 'LN-nota-infografia'
                }
            ]
        };

        const { container } = render(<OptaEmbed {...props} />);

        expect(container.firstChild).toHaveAttribute(
            'data-subscriptionId',
            '2f9d4a3fdc61653e686a4be85a25e1ac'
        );
        expect(container.firstChild).toHaveAttribute('data-language', 'es_CO');
        expect(container.firstChild).toHaveAttribute(
            'data-timezone',
            'America/Buenos_Aires'
        );
    });
});
