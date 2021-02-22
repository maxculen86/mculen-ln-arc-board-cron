import React from 'react';

const Buscador = props => {
    const estilo =
        '#queryly_advanced_container {width:86%;margin:auto;margin-top;24px;} #faceteddata {float: left; padding: 0px; padding-top:0px; font-size: 14px; margin-right: -10px;width: 220px;line-height:30px; overflow: hidden;} .queryly_item_row img {width: 200px!important;} .queryly_item_row {min-height: 100px;max-height: 180px!important;} .queryly_item_title {overflow: hidden;} .queryly_item_description {color: #5f5f5f; font-size: 16px;font-weight: 400;   overflow: hidden; line-height: 24px; margin-bottom: 8px; } #resultdata {margin-left: 250px;margin-bottom: 60px;}.filter_item a {color:#333;}.filterHeader {margin-top:10px;margin-bottom:10px;color:#000;font-weight: bold;font-family:SuecaSlab,Georgia;font-size: 18px;} .selectedFilterItem a {font-weight:800;color:#0074c4} .queryly_item_title {margin-bottom:8px;font-family: SuecaSlab,Georgia,serif;font-size:20px;line-height:28px;font-weight:600;}; @media (max-width: 780px) {.filterbar {display:none;} section {width:100%!important;padding:0px!important;} #resultdata{margin-left:0px!important;} .queryly_item_title {font-weight:normal;}  }  @media (max-width: 780px) {.queryly_item_description {display: none;} .queryly_item_title {font-size: 14px!important;font-weight: normal;line-height:18px; } .queryly_item_row { min-height: 50px;} .queryly_item_row img { width: 140px; } #faceteddata { display: none;} #resultdata { margin-left: 0px; } .filterbar { display: none; }}';

    return (
        <>
            <article id="nota" className="floatFix">
                <style>{estilo}</style>
                <div id="queryly_advanced_container">
                    <div id="faceteddata" />

                    <div id="resultdata" />
                </div>
            </article>

            <script
                src="https://code.jquery.com/jquery-3.5.1.min.js"
                integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
                crossorigin="anonymous"
            />

            <script
                defer
                src="https://www.queryly.com/js/lanacion-advanced-search.js"
            />
        </>
    );
};

Buscador.label = 'LN-Common-Buscador';

export default Buscador;
