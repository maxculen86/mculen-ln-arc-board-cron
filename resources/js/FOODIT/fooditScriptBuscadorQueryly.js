const setActionBar = (element, callback) => {
    element.addEventListener("click", (e) => {
        callback && callback(e)
    })
}

const scriptSearch = document.getElementById('scriptBuscadorQuerylyFoodit');
const emptyStateIcon = scriptSearch.getAttribute('data-empty-state');
const timerIcon = scriptSearch.getAttribute('data-timer-icon');

var searchPage = {
    batchSize: 24,
    endIndex: 0,
    query: null,
    facetedkey: [],
    facetedvalue: [],
    fromdate: '',
    todate: '',
    sortby: 'relevancy',
    result_template: '',
    initial_facets: null,
    fkey: [],
    fval: [],
    badges: ['Fácil', 'Vegana', 'Keto', 'Vegetariana', 'Rápida', 'Sin Gluten', 'Clásica', 'Maridaje'],

    init: function () {
        queryly.QuerylyKey = '2bf85a66b5f04de9';

        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        var fkey = '';
        var fval = '';
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0].toLowerCase() == 'query') {
                searchPage.query = sParameterName[1] + ' ';
            }
            else if (sParameterName[0].toLowerCase() == "fkey") {
                searchPage.fkey = decodeURIComponent(sParameterName[1].toLowerCase()).split('|');
            }
            else if (sParameterName[0].toLowerCase() == "fval") {
                searchPage.fval = decodeURIComponent(sParameterName[1].toLowerCase()).split('|');
            }
        }

        if (searchPage.query == null || searchPage.query.trim() == '') {
            searchPage.query = ' ';
        }
        searchPage.query = decodeURI(searchPage.query);

        if (searchPage.query.trim() != '' && searchPage.query != null) {
            searchPage.renderStyle();
            searchPage.dofacetedsearch(0, '', '');
            queryly.util.trackSearch(searchPage.query, searchPage.query, 1);
        }
        else {
            searchPage.renderStyle();
            document.getElementById('btn-toggle-filter').classList.add('none');
            document.getElementById('container-faceteddata').style.display = 'none';
            document.getElementById('resultdata').classList.replace('col-span-12_lg', 'col-span-16_lg');

            const emptyState = `<img class="image flex --cover" decoding="async" fetchpriority="low" loading="lazy" src="${emptyStateIcon}" alt="¡Aún no hay nada por acá!">`

            var html = '<div class="search-bar-area flex flex-column ai-center" style="padding-bottom: 26px;position: relative;display: none;"><form class="search-bar"><input style="border-radius:60px;" class="queryly_searchbox" name="query" type="text"  value="" placeholder="" onkeydown="searchPage.processEnterKey(event);"><button class="search-button" type="submit">Search</button></form></div>';
            html = html + '<div class="search-bar-area flex flex-column ai-center" style="position: relative;"><div class="search-bar none" ></div><div class="empty-state-svg mb-32">'+ emptyState +'</div><div class="prumo prumo-semibold text-24 text-28_md text-32_lg text-center mb-8">Nada por acá</div><div class="roboto text-24 text-center">No se encontraron resultados</div></div>';
            
            document.querySelector("#resultdata").innerHTML = html;
            return;
        }

        var result_template = `
            <script type="text/html" id="queryly_resultpage_template">
            <article class="card relative h-100 w-100 max-w-1366 mx-auto border border-all border-thin border-light-100 overflow-hidden  <%=queryly.data.subtype === '4' ? 'bg-positive' : 'bg-light-1'%> col-span-4 col-span-4_md" data-variant="<%=queryly.data.subtype === '4' ? 'note' : 'recipe'%>">
                <a href="<%=queryly.data.link%>" <%=queryly.data.trackevent%> class="link foodit-link flex gap-8 ai-center roboto-regular card-container flex-column row-gap-0 column-gap-32 h-100 text-inherit" title="<%=queryly.data.title%>" target="_self" data-variant="primary">
                    <div class="<%=queryly.data.subtype === '4' ? 'relative w-100 px-16 pt-16 pb-4' : 'relative w-100'%>">
                        <div class="foodit-placeholder card-image ratio-3-2 w-100">
                            <picture>
                                <source media="(max-width: 767px)" srcset="<%=queryly.data.image%>">
                                <img class="image flex card-image ratio-3-2 w-100  <%=queryly.data.subtype === '4' ? 'none' : ''%> --cover" decoding="async" fetchpriority="low" loading="lazy" src="<%=queryly.data.image%>" alt="">
                            </picture>
                        </div>
                        <%if (typeof queryly.data.badge != "undefined") {%>
                            <span class="inline-flex ai-center gap-4 py-2 px-16 bg-accent-vino text-light-1 text-12 roboto-bold uppercase absolute bottom-0 left-0 translate-y-50"><%=queryly.data.badge%></span>
                        <%}%>
                    </div>
                    <div class="card-main w-100 flex flex-column flex-grow-1 jc-between gap-16  text-light-800 px-16 pb-16 pt-20">
                        <div class="flex flex-column gap-12">
                            <div class="flex flex-column gap-4"><span class="text card-title prumo transition-regular text-ellipsis-3 prumo-medium text-20 <%=!queryly.data.subtype ? 'text-center' : ''%>"><%=queryly.data.title%></span></div>
                        </div>
                        <%if (queryly.data.subtype) {%>
                            <div class="flex gap-16 text-light-800 ai-center">
                                <div class="flex flex-column gap-8 flex-grow-1">
                                    <%if (queryly.data.creator) {%>
                                        <span class="text text-14">Por <%=queryly.data.creator%></span>
                                    <%}%>
                                    <%if (queryly.data.counter_time) {%>
                                        <div class="opacity-1">
                                            <i class="icon --icon-12 --inherit">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                    <use href="${timerIcon}"></use>
                                                </svg>
                                            </i>
                                            <span class="text text-12 roboto-light"><%=queryly.data.counter_time%> min</span>
                                        </div>
                                    <%}%>
                                </div>
                            </div>
                        <%}%>
                    </div>
                </a>
            </article>
            </script>
        `;

        const toggleFilterButtonMobile = document.getElementById("btn-toggle-filter");
        const btnDeleteFilter = document.getElementById("btn-delete-filter");
        const btnCloseFilter = document.getElementById("btn-close-filter");
        setActionBar(toggleFilterButtonMobile, () => searchPage.toggleFilter())

        setActionBar(btnDeleteFilter, () => {
            searchPage.dofacetedsearch(0, '');
        })

        setActionBar(btnCloseFilter, () => searchPage.toggleFilter())


        template = document.createElement('div');
        template.innerHTML = result_template;
        document.head.appendChild(template);
    },

    // TODO: 
    // 1. Cambiar el "+" y "-" de "Ver más" y "Ver menos" por los iconos correspondientes.
    // 2. Queda comentada una porcion de stylehtml para futura implementacion de checkbox custom
    renderStyle: function () {
        var style = document.createElement('style');
        var stylehtml = `.collapsed {position: relative;}.collapsed::before {content: 'Ver más ';color: #846B05;font-size: 14px;font-weight: bold;cursor: pointer;display: inline-flex;align-items: center;}.collapsed::after {content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTguMjQyNjcgOC42MzMzNEwxMS4wNzEzIDUuODA0NjdDMTEuMzMxNiA1LjU0NDM2IDExLjc1MzcgNS41NDQzNiAxMi4wMTQgNS44MDQ2N0MxMi4yNzQzIDYuMDY0OTggMTIuMjc0MyA2LjQ4NzAzIDEyLjAxNCA2Ljc0NzM0TDguOTQ5NzcgOS44MTE1NkM4LjU1OTI1IDEwLjIwMjEgNy45MjYwOCAxMC4yMDIxIDcuNTM1NTYgOS44MTE1Nkw0LjQ3MTMzIDYuNzQ3MzRDNC4yMTEwMiA2LjQ4NzAzIDQuMjExMDIgNi4wNjQ5OCA0LjQ3MTMzIDUuODA0NjdDNC43MzE2NCA1LjU0NDM2IDUuMTUzNjkgNS41NDQzNiA1LjQxNCA1LjgwNDY3TDguMjQyNjcgOC42MzMzNFoiIGZpbGw9IiM4NDZCMDUiLz4KPC9zdmc+');position: absolute;top: 14px;left: 64px;transform: translate(-50%, -50%);width: 20px;height: 20px;} .collapsed > * {display:none!important;} .expanded {display:flex;flex-direction:column;padding-bottom:16px;gap:8px;} .expanded {position: relative;}.expanded::after {content: 'Ver menos ';color: #846B05;font-size: 14px;font-weight: bold;cursor: pointer;display: inline-flex;align-items: center;}.expanded::before {content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj4NCiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik03Ljc1NzMzIDcuMzY2NjZMNC45Mjg2NyAxMC4xOTUzQzQuNjY4MzYgMTAuNDU1NiA0LjI0NjMxIDEwLjQ1NTYgMy45ODYgMTAuMTk1M0MzLjcyNTY5IDkuOTM0OTggMy43MjU2OSA5LjUxMjk3IDMuOTg2IDkuMjUyNjZMNy4wNTAyMyA2LjE4ODQ0QzcuNDQwNzUgNS43OTc5MiA4LjA3MzkyIDUuNzk3OTIgOC40NjQ0NCA2LjE4ODQ0TDExLjUyODcgOS4yNTI2NkMxMS43ODkgOS41MTI5NyAxMS43ODkgOS45MzQ5OCAxMS41Mjg3IDEwLjE5NTNDMTEuMjY4NCAxMC40NTU2IDEwLjg0NjMgMTAuNDU1NiAxMC41ODYgMTAuMTk1M0w3Ljc1NzMzIDcuMzY2NjZaIiBmaWxsPSIjODQ2QjA1Ii8+DQo8L3N2Zz4=');position: absolute;bottom: 7px;left: 80px;transform: translate(-50%, -50%);width: 20px;height: 20px;}
        .expanded > * {display:flex!important;} .search-button {padding: 10px 15px;vertical-align:top;;color: white;border-style: hidden;font-weight: bold;position: absolute;top: 0px;right: 0px;font-size: 16px;cursor: pointer;} .queryly_filter_hide {display:none!important;} .queryly_filter {border-bottom: 1px solid #E6E6E6;margin-bottom:16px; } .queryly_filter_title {cursor:pointer;font-weight:bold;font-size:12px;margin-bottom:16px} .queryly_filter_title img {content:url(https://www.queryly.com/images/chevron_right_black_24dp.svg);float:right;vertical-align:middle;margin-top:3px;} .queryly_filter_title_expand {margin-bottom: 16px;} .queryly_filter_title_expand img {content:url(https://www.queryly.com/images/expand_more_black_24dp.svg)}`;
        // stylehtml = stylehtml + '.filter_item_label {-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;} .filter_item_label:hover input ~ .checkmark{border-color:#787932; opacity:0.8;} .filter_item_label input:checked ~ .checkmark{border:none; background-color:#787932; opacity:0.8;} .checkmark:after {content:"";position:absolute;display:none;} .filter_item_label input:checked ~ .checkmark:after {display:block;} .filter_item_label .checkmark:after {left:8px;top:3px;width:8px;height:16px;border:solid #F3F0EB;border-width:0 3px 3px 0; border-radius:0px 3px 3px 3px; -webkit-transform: rotate(45deg); -ms-transform: rotate(45deg); transform: rotate(45deg);} ';
        stylehtml = stylehtml + '.filter_item_counter {vertical-align: middle;color: var(--neutral-light-600); font-size: 14px;cursor:pointer;}.hideElement {display:none} .showElement {display:flex}  #queryly_advanced_container {width:100%;} #faceteddata {font-size: 16px;line-height:150%;} .queryly_item_row img {} .queryly_item_row {width:calc(33% - 28px);overflow:hidden;display:inline-block;margin-right:0px;margin-left:20px;margin-bottom:20px;margin-right:0px;;padding-bottom:0px;background:white;vertical-align:top;} .queryly_item_title {overflow: hidden;} .queryly_item_description {color: #5f5f5f; font-size: 14px;font-weight: 400;   overflow: hidden;  } #resultdata {margin-bottom: 60px;} .queryly_advanced_item_imagecontainer {margin-right: 20px; padding-bottom: 0px;  height: 120px;width: 210px; overflow: hidden;  background-size: cover; background-position: 50% 50%; position: relative;}';
        stylehtml = stylehtml + '.pointer {cursor:pointer;} .filterbar_item {cursor:pointer;display:inline-block;margin-right:10px;padding:8px 12px;border-radius:4px;background:#333333;color:#FEFEFE;font-size: 14px;line-height:100%; font-weight:700; font-family: Roboto; display:flex; align-items:center;} .selectedFilterItem a {font-weight:800} .queryly_item_title {color:red;margin-top:0px;margin-bottom:6px;font-family: FoundersGroteskCond,Arial Narrow,Arial,sans-serif;font-size:24px;line-height:24px;font-weight:600;}; @media (max-width: 780px) { section {width:100%!important;padding:0px!important;} #resultdata{margin-left:0px!important;} .queryly_item_title {font-weight:normal;}  } ';
        stylehtml = stylehtml + ' @media (max-width: 1279.9px) { #filterbar {display:none;} .queryly_advanced_item_imagecontainer {width: 160px; height: 100px; margin-right: 15px;} .queryly_item_description {display: none;} .queryly_item_title {font-size: 14px!important;font-weight: normal; } .queryly_item_row { min-height: 50px;} .queryly_item_row img { width: 140px; } .faceteddata {display:none;} #faceteddata { display:none;} #resultdata { margin-left: 0px; } }; ';
        style.innerHTML = stylehtml;
        document.getElementById('queryly_advanced_container').parentNode.insertBefore(style, document.getElementById('queryly_advanced_container'));
    },

    toggleFilter() {
        const faceteddata = document.getElementById("faceteddata");
        const containetFacetedData = document.getElementById("container-faceteddata");
        const btnToggleFilter = document.getElementById('btn-toggle-filter');
        const body = document.querySelector("body");
        const actionBar = document.getElementById("actionbar");
        const overlayDrawer = document.getElementById("overlay-drawer-container");
        const drawer = document.getElementById("drawer-faceted-data");

        if (faceteddata.style["display"] == "" || faceteddata.style["display"] == "none") {
            btnToggleFilter.classList.add('none');
            containetFacetedData.style["display"] = "block";
            faceteddata.style["display"] = "flex";
            body.classList.add("overflow-hidden");
            overlayDrawer.classList.add("drawer-overlay", "top-0", "fixed", "right-0", "w-100", "h-100vh", "z-15");
            drawer.classList.add("drawer", "top-0", "bg-light-1", "right-0", "fixed", "w-100", "h-100vh", "h-100dvh", "max-w-520_md")
            faceteddata.classList.add("overflow-x-hidden", "pr-16", "foodit-scrollbar", "flex-grow-1")
            actionBar.style["display"] = "flex"; 
            faceteddata.style["background"] = "#FEFEFE";
        }
        else {
            containetFacetedData.style["display"] = "none";
            faceteddata.style["display"] = "none";
            btnToggleFilter.classList.remove('none')
            body.classList.remove("overflow-hidden");
            overlayDrawer.classList.remove("drawer-overlay", "top-0", "fixed", "right-0", "w-100", "h-100vh", "z-15");
            drawer.classList.remove("drawer", "overflow-x-hidden", "pr-16", "top-0", "bg-light-1", "right-0", "fixed", "w-100", "h-100vh", "h-100dvh", "max-w-520_md")
            actionBar.style["display"] = "none";
        }
    },

    getFilterBar(filters) {
        var filterbar = '';
        for (var i = 0; i < filters.length; i++) {
            var filter_vals = filters[i].value.replaceAll('[', '').replaceAll(']', '').split('^');
            for (var j = 0; j < filter_vals.length; j++) {
                var id = filters[i].key + "_" + filter_vals[j].replace(' ', '_');
                var filter_str = filter_vals[j];
                var filteredValue= filter_str[0].toUpperCase() + filter_str.slice(1);
                filterbar = filterbar + '<div class="filterbar_item pointer" >' + ((filters[i].key == "subtype") ? (filter_vals[j] == "7" ? "Recetas" : "Notas") : filteredValue) + '<label class="pointer" for="' + id + '"><i style ="vertical-align: middle;margin-left: 10px;cursor:pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99987 5.29299L8.12137 3.17149C8.3166 2.97626 8.63314 2.97626 8.82837 3.17149C9.0236 3.36673 9.0236 3.68326 8.82837 3.87849L6.70687 5.99999L8.82837 8.12149C9.0236 8.31673 9.0236 8.63326 8.82837 8.82849C8.63314 9.02373 8.3166 9.02373 8.12137 8.82849L5.99987 6.70699L3.87837 8.82849C3.68314 9.02373 3.3666 9.02373 3.17137 8.82849C2.97614 8.63326 2.97614 8.31673 3.17137 8.12149L5.29287 5.99999L3.17137 3.87849C2.97614 3.68326 2.97614 3.36673 3.17137 3.17149C3.3666 2.97626 3.68314 2.97626 3.87837 3.17149L5.99987 5.29299Z" fill="#FEFEFE"/></svg></i></label></div>';
            }            
        }
        if (filterbar != '') {
            filterbar = "<div id='filterbar' class='lg-only' style='margin:-10px 0px 24px 0px; cursor:pointer; display: flex; justify-content: space-between;'><div>" + filterbar + "</div><div><button onclick='searchPage.dofacetedsearch(0,\"\",\"\");' class='clear-all lg-only button foodit-button gap-8 roboto-bold text-12 rounded-4 text-secondary-positive border border-all border-thin border-secondary-positive text-accent-lechuga__hover border-accent-lechuga__hover px-16 py-8 max-h-32'><i><svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M11.8335 3.99992H14.5002C14.8684 3.99992 15.1668 4.2984 15.1668 4.66659C15.1668 5.03478 14.8684 5.33325 14.5002 5.33325H13.8335V13.9999C13.8335 14.1767 13.7633 14.3463 13.6382 14.4713C13.5132 14.5963 13.3436 14.6666 13.1668 14.6666H3.8335C3.65669 14.6666 3.48712 14.5963 3.36209 14.4713C3.23707 14.3463 3.16683 14.1767 3.16683 13.9999V5.33325H2.50016C2.13197 5.33325 1.8335 5.03478 1.8335 4.66659C1.8335 4.2984 2.13197 3.99992 2.50016 3.99992H5.16683V1.99992C5.16683 1.82311 5.23707 1.65354 5.36209 1.52851C5.48712 1.40349 5.65669 1.33325 5.8335 1.33325H11.1668C11.3436 1.33325 11.5132 1.40349 11.6382 1.52851C11.7633 1.65354 11.8335 1.82311 11.8335 1.99992V3.99992ZM12.5002 5.33325H4.50016V13.3333H12.5002V5.33325ZM6.50016 7.99992C6.50016 7.63173 6.79864 7.33325 7.16683 7.33325C7.53502 7.33325 7.8335 7.63173 7.8335 7.99992V10.6666C7.8335 11.0348 7.53502 11.3333 7.16683 11.3333C6.79864 11.3333 6.50016 11.0348 6.50016 10.6666V7.99992ZM9.16683 7.99992C9.16683 7.63173 9.46531 7.33325 9.8335 7.33325C10.2017 7.33325 10.5002 7.63173 10.5002 7.99992V10.6666C10.5002 11.0348 10.2017 11.3333 9.8335 11.3333C9.46531 11.3333 9.16683 11.0348 9.16683 10.6666V7.99992ZM6.50016 2.66659V3.99992H10.5002V2.66659H6.50016Z' fill='#846B05'/></svg></i>Limpiar Filtros</button></div></div>";
        }
        return filterbar;
    },

    //This render the faceted object into html. In the current rss feed, creator and pubdate are used in the facet.
    renderFaceted: function (faceted, filters) {
        // TODO: Color y tamaños para MVP2
        // var filterItemlabel= "filter_item_label gap-8 relative cursor-pointer text-16";
        // class="' + filterItemlabel + '"

        // var filterItemCounter= "absolute opacity-0 cursor-pointer h-0 w-0";
        // class="'+filterItemCounter+'"

        // var filterItemCheckbox= "checkmark absolute top-0 left-0 h-24 w-24 bg-positive border border-thin border-all rounded-4"
        // <span class="'+filterItemCheckbox+'"/>
        var html = '<div class="flex flex-column"><div class="faceteddata_title flex jc-between text-24 pb-24_lg"><span class="prumo">Filtros</span><a class="lg-none" style="color:black;cursor:pointer" onclick="searchPage.toggleFilter();"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9997 10.586L16.2427 6.34299C16.6332 5.95252 17.2663 5.95252 17.6567 6.34299C18.0472 6.73345 18.0472 7.36652 17.6567 7.75699L13.4137 12L17.6567 16.243C18.0472 16.6335 18.0472 17.2665 17.6567 17.657C17.2663 18.0475 16.6332 18.0475 16.2427 17.657L11.9997 13.414L7.75674 17.657C7.36628 18.0475 6.73321 18.0475 6.34274 17.657C5.95228 17.2665 5.95228 16.6335 6.34274 16.243L10.5857 12L6.34274 7.75699C5.95228 7.36652 5.95228 6.73345 6.34274 6.34299C6.73321 5.95252 7.36628 5.95252 7.75674 6.34299L11.9997 10.586Z" fill="#333333"/></svg></i></a></div><div class="w-100 lg-none border border-bottom border-thin border-light-100 my-16"/></div>';
        
        html = html + '<div id="subtype_filter" class="queryly_filter"><div class="queryly_filter_title queryly_filter_title_expand" >TIPO DE CONTENIDO <img class="filter_arrow"/></div><div class="filter_item_container flex flex-column pb-16 gap-8">';
        var subtype = faceted.subtype;
        for (var i = 0; i < subtype.length; i++) {            
            var id = "subtype_" + subtype[i].key.toLowerCase().replace(' ', '_');
            var name = (subtype[i].key == "7") ? "Recetas" : "Notas";
            var count = subtype[i].value;
            html = html + '<div class="filter_item flex ai-center gap-8" data-filter-value="' + subtype[i].key + '"><input class="pointer w-22 h-22"  count="' + count + '" id="' + id + '" type="checkbox" value="' + subtype[i].key + '" onclick="searchPage.dofacetedsearch(0,\'subtype\',\'' + subtype[i].key.replace(/'/g, "\\'") + '\')";return false;" /><label class="pointer" for="' + id + '">' + name + '</label><label class="filter_item_counter">(' + count + ')</label></div>';

        }
        html = html + '</div></div>';

        html = html + '<div id="section_dietafilter" class="queryly_filter"><div class="queryly_filter_title queryly_filter_title_expand" >DIETA <img class="filter_arrow"/></div><div class="filter_item_container flex flex-column pb-16 gap-8">';
        var dieta_section = faceted.section;
        for (var i = 0; i < dieta_section.length; i++) {
            var name = dieta_section[i].key;
            if (name != "Vegetariana" && name != "Sin Gluten" && name != "Keto" && name != "Sin Lactosa" && name != "Vegana") { continue; }
            var id = "section_" + name.toLowerCase().replace(' ', '_');
            var count = dieta_section[i].value;
            html = html + '<div class="filter_item flex ai-center gap-8" data-filter-value="' + dieta_section[i].key + '"><input class="pointer w-22 h-22" count="' + count + '" id="' + id + '" type="checkbox" value="' + dieta_section[i].key + '" onclick="searchPage.dofacetedsearch(0,\'section\',\'' + dieta_section[i].key.replace(/'/g, "\\'") + '\')";return false;" /><label class="pointer" for="' + id + '">' + name + '</label><label class="filter_item_counter" >('+ count +')</label></div>';
        }
        html = html + '</div></div>';

        html = html + '<div id="section_saladasfilter" class="queryly_filter"><div class="queryly_filter_title queryly_filter_title_expand" >SALADAS <img class="filter_arrow"/></div><div class="filter_item_container flex flex-column pb-16 gap-8">';
        var saladas_section = faceted.section;
        for (var i = 0; i < saladas_section.length; i++) {
            var name = saladas_section[i].key;
            if (name != "Arroz" && name != "Tartas" && name != "Pollo" && name != "Pizza y Empanadas" && name != "Pastas" && name != "Pescados" && name != "Carnes" && name != "Hamburguesa" && name != "Sopa" && name != "Salsas" && name != "Ensaladas") { continue; }
            var id = "section_" + name.toLowerCase().replace(' ', '_');
            var count = saladas_section[i].value;
            html = html + '<div class="filter_item flex ai-center gap-8" data-filter-value="' + saladas_section[i].key + '"><input class="pointer w-22 h-22" count="' + count + '" id="' + id + '" type="checkbox" value="' + saladas_section[i].key + '" onclick="searchPage.dofacetedsearch(0,\'section\',\'' + saladas_section[i].key.replace(/'/g, "\\'") + '\')";return false;" /><label class="pointer" for="' + id + '">' + name + '</label><label class="filter_item_counter">(' + count + ')</label></div>';
        }
        html = html + '</div></div>';

        html = html + '<div id="section_dulcesfilter" class="queryly_filter"><div class="queryly_filter_title queryly_filter_title_expand" >DULCES <img class="filter_arrow"/></div><div class="filter_item_container flex flex-column pb-16 gap-8">';
        var dulces_section = faceted.section;
        for (var i = 0; i < dulces_section.length; i++) {
            var name = dulces_section[i].key;
            if (name != "Tortas" && name != "Postres" && name != "Panqueques" && name != "Budines" && name != "Helados" && name != "Batidos") { continue; }
            var id = "section_" + name.toLowerCase().replace(' ', '_');
            var count = dulces_section[i].value;
            html = html + '<div class="filter_item flex ai-center gap-8" data-filter-value="' + dulces_section[i].key + '"><input class="pointer w-22 h-22" count="' + count + '" id="' + id + '" type="checkbox" value="' + dulces_section[i].key + '" onclick="searchPage.dofacetedsearch(0,\'section\',\'' + dulces_section[i].key.replace(/'/g, "\\'") + '\')";return false;" /><label class="pointer" for="' + id + '">' + name + '</label><label class="filter_item_counter">(' + count + ')</label></div>';
        }
        html = html + '</div></div>';


        html = html + '<div id="section_otherfilter" class="queryly_filter"><div class="queryly_filter_title queryly_filter_title_expand" >OTROS <img class="filter_arrow"/></div><div class="filter_item_container flex flex-column pb-16 gap-8">';
        var other_section = faceted.section;
        for (var i = 0; i < other_section.length; i++) {
            var name = other_section[i].key;
            if (name != "Fácil" && name != "Saludable" && name != "Bajo Costo" && name != "Rápida" && name != "Bebidas" && name != "De autor") { continue; }
            var id = "section_" + name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/'/g, "\\'")
            var count = other_section[i].value;
            html = html + '<div class="filter_item flex ai-center gap-8" data-filter-value="' + other_section[i].key + '"><input class="pointer w-22 h-22" count="' + count + '" id="' + id + '" type="checkbox" value="' + other_section[i].key + '" onclick="searchPage.dofacetedsearch(0,\'section\',\'' + other_section[i].key.replace(/'/g, "\\'") + '\')";return false;" /><label class="pointer" for="' + id + '">' + name + '</label><label class="filter_item_counter">(' + count + ')</label></div>';
        }
        html = html + '</div></div>';


        html = html + '<div id="main_ingredients_filter" class="queryly_filter"><div class="queryly_filter_title queryly_filter_title_expand" >INGREDIENTE PRINCIPAL <img class="filter_arrow"/></div><div class="filter_item_container flex flex-column pb-16 gap-8">';
        var main_ingredients = faceted.main_ingredients;
        for (var i = 0; i < main_ingredients.length; i++) {
            var name = main_ingredients[i].key;
            var id = "main_ingredients_" + name.toLowerCase().replace(' ', '_');
            var count = main_ingredients[i].value;
            html = html + '<div class="filter_item flex ai-center gap-8" data-filter-value="' + main_ingredients[i].key + '"><input class="pointer w-22 h-22" count="' + count + '" id="' + id + '" type="checkbox" value="' + main_ingredients[i].key + '" onclick="searchPage.dofacetedsearch(0,\'main_ingredients\',\'' + main_ingredients[i].key.replace(/'/g, "\\'") + '\')";return false;" /><label class="pointer" for="' + id + '">' + name + '</label><label class="filter_item_counter">(' + count + ')</label></div>';
        }
        html = html + '</div></div>';

        html = html + '<div id="cookingtypes_filter" class="queryly_filter"><div class="queryly_filter_title queryly_filter_title_expand" >TIPO DE COCCIÓN <img class="filter_arrow"/></div><div class="filter_item_container flex flex-column pb-16 gap-8">';
        var cookingtypes = faceted.cookingtypes;
        for (var i = 0; i < cookingtypes.length; i++) {
            var name = cookingtypes[i].key;
            var id = "cookingtypes_" + name.toLowerCase().replace(' ', '_');
            var count = cookingtypes[i].value;
            html = html + '<div class="filter_item flex ai-center gap-8" data-filter-value="' + cookingtypes[i].key + '"><input class="pointer w-22 h-22" count="' + count + '" id="' + id + '" type="checkbox" value="' + cookingtypes[i].key + '" onclick="searchPage.dofacetedsearch(0,\'cookingtypes\',\'' + cookingtypes[i].key.replace(/'/g, "\\'") + '\')";return false;" /><label class="pointer" for="' + id + '">' + name + '</label><label class="filter_item_counter">(' + count + ')</label></div>';
        }
        html = html + '</div></div>';


        html = html + '<div id="regions_filter" class="queryly_filter"><div class="queryly_filter_title queryly_filter_title_expand" >REGIÓN<img class="filter_arrow"/></div><div class="filter_item_container flex flex-column pb-16 gap-8">';
        var regions = faceted.regions;
        for (var i = 0; i < regions.length; i++) {
            var name = regions[i].key;   
            var id = "regions_" + name.toLowerCase().replace(' ', '_');
            var count = regions[i].value;
            html = html + '<div class="filter_item flex ai-center gap-8" data-filter-value="' + regions[i].key + '"><input class="pointer w-22 h-22" count="' + count + '" id="' + id + '" type="checkbox" value="' + regions[i].key + '" onclick="searchPage.dofacetedsearch(0,\'regions\',\'' + regions[i].key.replace(/'/g, "\\'") + '\')";return false;" /><label class="pointer" for="' + id + '">' + name + '</label><label class="filter_item_counter">(' + count + ')</label></div>';
        }
        html = html + '</div></div>';
        

        document.getElementById('faceteddata').innerHTML = (html);

        try {
            if (typeof filters != 'undefined') {
                if (filters.length == 0) {
                    var filter_items = document.querySelectorAll('.filter_item');
                    for (var j = 0; j < filter_items.length; j++) {
                        filter_items[j].classList.remove("selectedFilterItem");
                    }
                }
                else {
                    for (var i = 0; i < filters.length; i++) {
                        var val = filters[i].value;
                        var filter_items = document.querySelector('#' + filters[i].key + '_filter').querySelectorAll('.filter_item');
                        for (var j = 0; j < filter_items.length; j++) {
                            if (filter_items[j].getAttribute("data-filter-value").toLowerCase() == val) {
                                filter_items[j].classList.add("selectedFilterItem");
                            }
                            else {
                                filter_items[j].classList.remove("selectedFilterItem");
                            }
                        }
                    }
                }

            }
        }
        catch (e) { }

        const filtersections = document.querySelectorAll(".queryly_filter_title");

        for (var i = 0; i < filtersections.length; i++) {
            filtersections[i].addEventListener("click", function () {
                this.classList.toggle("queryly_filter_title_expand");
               this.nextSibling.classList.toggle("queryly_filter_hide");
                //filtersections[i].parentNode.nextSibling.classList.toggle("queryly_filter_hide");
            });
        }

    },

    SwitchSort: function () {
        searchPage.sortby = document.querySelector('#sortby').value;

        document.getElementById('resultdata').innerHTML = '';

        //assemble the rest api.
        var url = "//api.queryly.com/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + searchPage.query + "&endindex=0&batchsize=" + searchPage.batchSize + "&callback=searchPage.resultcallback&showfaceted=true&maxfacetitems=40&extendeddatafields=guid,creator,imageresizer,promo_image,counter_time,section,subtype&timezoneoffset=" + (new Date(0)).getTimezoneOffset();
        url = url + "&sort=" + searchPage.sortby;

        var keys = '';
        var values = '';
        for (var i = 0; i < searchPage.facetedkey.length; i++) {
            keys = keys + searchPage.facetedkey[i] + "|";
            values = values + searchPage.facetedvalue[i] + "|";
            url = url + "&facetedkey=" + encodeURIComponent(keys) + "&facetedvalue=" + encodeURIComponent(values);
        }

        if (searchPage.fromdate != '' && searchPage.todate != '') {
            url = url + "&daterange=" + searchPage.fromdate + "," + searchPage.todate;
        }

        searchPage.loadScript(url, function (data, textStatus, jqxhr) {
            //window.scrollTo(0, 0);
        });
    },

    advanced_searchbox_keydown: function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 13) {
            searchPage.redirectsearch();
        }
    },

    resultcallback: function (results) {
        //retrieve metadata
        var total = results.metadata.total;
        searchPage.endIndex = results.metadata.endindex;
        const emptyState = `<img class="image flex --cover w-147" decoding="async" fetchpriority="low" loading="lazy" src="${emptyStateIcon}" alt="¡Aún no hay nada por acá!">`
        
        if (total == 0) {
            document.getElementById('btn-toggle-filter').classList.add('none');
            document.querySelector('.faceteddata').style.display = 'none';
            document.getElementById('resultdata').classList.replace('col-span-12_lg', 'col-span-16_lg');
            document.getElementById('resultdata').innerHTML = '<div class="search-bar-area flex flex-column ai-center" style="position: relative;"><form class="search-bar none" action=""><input style="border-radius:60px" class="queryly_searchbox" name="query" type="text"  value="' + (results.metadata.query.trim().toLowerCase() == "Saladas" ? "" : results.metadata.query.trim()) + '" placeholder="" onkeydown="searchPage.processEnterKey(event);"><button class="search-button" type="submit">Search</button></form><div class="empty-state-svg mb-32">'+ emptyState +'</div><div class="prumo prumo-semibold text-24 text-28_md text-32_lg text-center mb-8">Nada por acá</div><div class="roboto roboto-regular text-16 text-light-600 text-center">No se encontraron resultados para "' + (results.metadata.query.trim().toLowerCase() == "Saladas" ? "" : results.metadata.query.trim()) + '"</div></div>';
            return;
        }

        //if there is faceted data in results object, render it.

        if (searchPage.initial_facets == null) {
            searchPage.initial_facets = results.faceted;
            searchPage.renderFaceted(results.faceted, results.metadata.filters);
            if (searchPage.fkey.length > 0 ) {

                var filters = document.querySelectorAll('.queryly_filter');
                for (var i = 0; i < filters.length; i++) {
                    var idx = filters[i].id.lastIndexOf('_');
                    var fkey = filters[i].id.substring(0, idx);
                    if (searchPage.fkey.indexOf(fkey) >= 0) {
                        var filter_items = filters[i].querySelectorAll('.filter_item input');
                        var itemvals = searchPage.fval[searchPage.fkey.indexOf(fkey)].split('^');
                        for (var j = 0; j < filter_items.length; j++) {
                            if (itemvals.indexOf(filter_items[j].value.toLowerCase()) >= 0 ) {
                                filter_items[j].checked = true;
                            }
                        }                      
                    }                    
                }

                searchPage.dofacetedsearch(0, searchPage.fkey.join('|'), searchPage.fval.join('|'), true);
                return;
            }
        }

        var existingfilters = [];
        for (var i = 0; i < results.metadata.filters.length; i++) {
            existingfilters.push(results.metadata.filters[i].key);
        }
        var filterbar = searchPage.getFilterBar(results.metadata.filters);
        var filters = document.querySelectorAll('.queryly_filter');
        for (var i = 0; i < filters.length; i++) {
            var idx = filters[i].id.lastIndexOf('_');
            var fkey = filters[i].id.substring(0, idx);
            var vals = typeof results.faceted[fkey] != 'undefined' ? results.faceted[fkey] : [];
            var filter_items = filters[i].querySelectorAll('.filter_item input');
            for (var j = 0; j < filter_items.length; j++) {
                var val = filter_items[j].value;
                var found = false;
                var count = 0;
                for (var k = 0; k < vals.length; k++) {
                    
                    if (val.toLowerCase() == vals[k].key.toLowerCase()) {
                        count = vals[k].value;
                        found = true;
                        break;
                    }
                }
                if (!found && existingfilters.indexOf(fkey) < 0) {
                    //filter_items[j].checked = found;
                    filter_items[j].disabled = true;
                    //filter_items[j].setAttribute("count", -count);
                    //filter_items[j].nextSibling.style["text-decoration"] = "line-through";
                    filter_items[j].parentNode.style["display"] = "none";
                }
                else {
                    filter_items[j].disabled = false;
                    if (filter_items[j].checked) {
                        filter_items[j].setAttribute("count", (count + 1)*10000);
                    }
                    else {
                        //count = Number(filter_items[j].parentNode.querySelector('.filter_item_counter').innerHTML);
                        filter_items[j].setAttribute("count", count);
                    }

                    //if (searchPage.facetedkey.indexOf(fkey) < 0) {
                    //    filter_items[j].parentNode.querySelector('.filter_item_counter').innerHTML = count;
                    //}

                    filter_items[j].parentNode.querySelector('.filter_item_counter').innerHTML = `(${count})`;
                    
                    //filter_items[j].parentNode.lastChild.innerHTML = count;
                    //filter_items[j].nextSibling.style["text-decoration"] = "";
                    filter_items[j].parentNode.style["display"] = "flex";

                    //if (count == 0 && searchPage.facetedkey.indexOf(fkey) < 0) {
                    //    filter_items[j].parentNode.style["display"] = "none";
                    //}

                    if (count == 0) {
                        filter_items[j].parentNode.style["display"] = "none";
                    }

                }
            }
            //searchPage.sortList(filters[i]);
            var toSort = Array.prototype.slice.call(filter_items, 0);
            toSort.sort(function (a, b) {
                var aord = Number(a.getAttribute("count"));
                var bord = Number(b.getAttribute("count"));
                return bord - aord;
            });
            var parent = filters[i].querySelector('.filter_item_container');
            parent.innerHTML = "";
            var visible_count = 0;
            for (var j = 0, l = toSort.length; j < l; j++) {
                parent.appendChild(toSort[j].parentNode);
                if (toSort[j].parentNode.style["display"] == "flex") {
                    visible_count = visible_count + 1;
                }
                if (visible_count == 5 && toSort.length > 5) {
                    parent_hiden = document.createElement("div");
                    parent_hiden.classList.add("collapsed"); 
                    parent_hiden.onclick = function () {
                        var content = window.getComputedStyle(parent_hiden, '::after').getPropertyValue('content');                       
                        if (this.classList.contains('expanded')) {
                            this.classList.remove('expanded');
                            this.classList.add('collapsed');
                        } else {
                            this.classList.add('expanded');
                            this.classList.remove('collapsed');
                        }
                    };                    

                    parent.appendChild(parent_hiden);
                    parent = parent_hiden;
                }
            }
        }



         //loop through each result.

        var html = '<div class="search-bar-area" style="position: relative;margin-left:20px;display: none;"><form class="search-bar" action=""><input style="border-radius:60px" class="queryly_searchbox" name="query" type="text"  value="' + (results.metadata.query.trim().toLowerCase() == "Saladas" ? "" : results.metadata.query.trim())  + '" placeholder="" onkeydown="searchPage.processEnterKey(event);"><button class="search-button" type="submit">Buscar</button></form></div>';

        if (filterbar != '') {
            html = html + filterbar;
        }

        if (results.items.length == 0) {
            html = html + "<div style='margin: 50px;text-align: center;font-size: 30px;color: #444;'>No result found. Please try a different keyword or clear the filters</div>";
            document.getElementById('resultdata').innerHTML = html;
            return;
        }

        html = html + '<div class="flex jc-between"><div class="text-28 prumo prumo-light text-light-800" id="results_count"><span class="prumo prumo-medium">' + results.metadata.total + '</span> resultados de: ' + (results.metadata.query.trim().toLowerCase() == 'Saladas' ? "" :  results.metadata.query.trim()) + '</div><div class="lg-none w-40 h-40"></div></div>';
        
        var filterIcon = `<i class="icon --icon-16"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.79702 10.2885C7.29858 10.3811 7.79231 10.7084 8.07526 11.2833C8.30206 11.7442 8.53889 12.4768 8.46287 13.1566C8.42322 13.5111 8.29232 13.896 7.98261 14.1964C7.66993 14.4998 7.24698 14.6475 6.75855 14.6658C6.61328 14.6713 6.4618 14.6504 6.31688 14.5989C5.27568 14.2294 4.95148 13.3159 4.92503 12.5629C4.9119 12.189 4.96699 11.8273 5.04912 11.5275C5.12634 11.2456 5.246 10.9508 5.40737 10.7503C5.75632 10.3168 6.32315 10.201 6.79702 10.2885ZM6.35934 11.5435C6.35453 11.5511 6.33936 11.576 6.31796 11.624C6.29086 11.6848 6.26138 11.7658 6.23482 11.8628C6.18115 12.0587 6.14705 12.2915 6.15502 12.5183C6.17068 12.9642 6.32819 13.2755 6.71627 13.4161C6.98656 13.4054 7.09219 13.3313 7.13261 13.2921C7.17616 13.2498 7.22252 13.1714 7.23997 13.0154C7.27814 12.674 7.14843 12.1961 6.97443 11.8425M6.35934 11.5435C6.35976 11.5433 6.3606 11.5428 6.36185 11.5421C6.37577 11.5336 6.44153 11.4938 6.57694 11.5188C6.71512 11.5443 6.87268 11.6358 6.97443 11.8425" fill="#FEFEFE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0959 10.1571C10.6287 10.3644 10.0392 10.3724 9.48886 10.0553C9.04769 9.8012 8.44908 9.32718 8.13916 8.71978C7.9775 8.40297 7.87501 8.00935 7.96723 7.58447C8.06034 7.15551 8.33041 6.79332 8.72584 6.50145C8.84345 6.41464 8.98068 6.34619 9.1292 6.3068C10.1964 6.02379 10.9668 6.59853 11.4019 7.20864C11.618 7.51159 11.7707 7.84308 11.8671 8.13849C11.9576 8.41622 12.0201 8.72876 11.9961 8.98661C11.9443 9.54418 11.5373 9.96136 11.0959 10.1571ZM10.7706 8.86734C10.7704 8.85829 10.7694 8.82909 10.7608 8.7771C10.7499 8.71125 10.7299 8.62729 10.6987 8.53177C10.6358 8.33873 10.5363 8.12613 10.4053 7.94238C10.1476 7.58109 9.846 7.41184 9.44671 7.51499C9.22819 7.67695 9.18116 7.7983 9.16913 7.85376C9.15616 7.9135 9.1607 8.00487 9.23183 8.14426C9.38745 8.44927 9.75738 8.77255 10.0959 8.96752M10.7706 8.86734C10.7703 8.86773 10.7699 8.86862 10.7693 8.86996C10.7623 8.88484 10.7296 8.95517 10.6035 9.01111C10.4748 9.0682 10.2938 9.08152 10.0959 8.96752" fill="#FEFEFE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.74209 6.36649C5.24759 6.24066 4.77604 5.88122 4.5308 5.28867C4.33422 4.81369 4.14518 4.0669 4.2649 3.39362C4.32734 3.04245 4.4828 2.66718 4.81123 2.38797C5.14281 2.10609 5.57439 1.98688 6.06295 2.00114C6.20826 2.00538 6.35806 2.03634 6.49935 2.09731C7.51446 2.53541 7.77901 3.46857 7.75682 4.22167C7.7458 4.59564 7.66748 4.9529 7.56618 5.2466C7.47094 5.52271 7.33251 5.80893 7.15855 5.99824C6.78238 6.40761 6.20929 6.48537 5.74209 6.36649ZM6.25982 5.14332C6.26511 5.13603 6.28185 5.11228 6.3063 5.06578C6.33727 5.00688 6.37191 4.928 6.40467 4.83304C6.47087 4.64112 6.51992 4.41106 6.5266 4.18425C6.53974 3.73827 6.40266 3.4171 6.02449 3.251C5.75409 3.24365 5.64391 3.31056 5.60104 3.347C5.55486 3.38626 5.50354 3.46143 5.47606 3.61594C5.41595 3.95402 5.51453 4.43955 5.66534 4.80396M6.25982 5.14332C6.25938 5.14347 6.25852 5.14391 6.25722 5.14459C6.24279 5.15208 6.1746 5.18745 6.04109 5.15348C5.90486 5.11881 5.75354 5.01705 5.66534 4.80396" fill="#FEFEFE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.71797 5.25889H2.66669V4.00842H4.71797V5.25889Z" fill="#FEFEFE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.17951 5.25889V4.00842H13.3334V5.25889H7.17951Z" fill="#FEFEFE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.41028 9.0103H2.66669V7.75983H8.41028V9.0103Z" fill="#FEFEFE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3334 9.0103H11.6923V7.75983H13.3334V9.0103Z" fill="#FEFEFE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.53848 12.7617H2.66669V11.5112H5.53848V12.7617Z" fill="#FEFEFE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3334 12.7617H8.00002V11.5112H13.3334V12.7617Z" fill="#FEFEFE"/></svg></i>`
        html = html + '<button id="btn-open-filter" class="button foodit-button gap-8 roboto-bold text-12 rounded-4 bg-primary-positive text-light-1 bg-accent-lechuga__hover px-16 py-12 fixed bottom-16 z-5 shadow-down-2xs left-50 -ml-55 lg-none" onclick="searchPage.toggleFilter();">' + filterIcon +'Filtros (' + results.metadata.total + ')</button>'
        html = html + '<div class="woocommerce mt-24 mb-32"><ul class="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">';
        var rows = '';

        if (typeof results.topics != 'undefined') {
            for (var i = 0; i < results.topics.length; i++) {
                var item = results.topics[i];
                try {
                    rows = rows + searchPage.renderitem(item);
                }
                catch (e) {}
              
            }
        }

        for (var i = 0; i < results.items.length; i++) {
            var item = results.items[i];
            rows = rows + searchPage.renderitem(item);
        }
        html = html + rows + '</ul></div>';

        //var pagerhtml = '';
        if (total > searchPage.endIndex) {
            html = html + '<button class="next_btn w-max as-center gap-8 roboto-bold text-12 rounded-4 px-16 py-12 text-secondary-positive border border-all border-thin border-secondary-positive text-accent-lechuga__hover border-accent-lechuga__hover" onclick="searchPage.turnpage();return false;" >VER MÁS</button>';
        }
        else {
            if (document.querySelector('.next_btn') != null) {
                document.querySelector('.next_btn').style["display"] = "none";
            }
           
        }
        //if (searchPage.endIndex > searchPage.batchSize) {
        //    var prev = Math.max(0, searchPage.endIndex - 2 * searchPage.batchSize);
        //    html = html + '<div><a style="float:left;font-family: Arial;font-size: 17px;color: #428bca;font-weight: 600;" class="prev_btn" onclick="searchPage.turnpage(' + prev + ');return false;" href="#" >Previous Page</a></div>';
        //}

        if (searchPage.endIndex <= searchPage.batchSize) {
            document.getElementById('resultdata').innerHTML = html;
            window.scrollTo(0, 0);
        }
        else {
            document.querySelector('div.woocommerce ul').insertAdjacentHTML('beforeend', rows);          
        }
        
        //window.scrollTo(0, 0);
    },

    renderitem: function (item) {

        item.trackevent = 'onmousedown = "queryly.util.trackClick(\'' + item.link + '\',\'' + searchPage.query + '\');"';
        if (item.promo_image != '' && typeof item.promo_image != 'undefined') {
            item.image = item.promo_image.split('|')[0];
        }
        else if (item.imageresizer != '' && typeof item.imageresizer != 'undefined') {
            item.image = item.imageresizer.split('|')[0];
        }

        var sections = (typeof item.sections != 'undefined' ? item.section.split('|') : []);
        for (var i = 0; i < sections.length; i++) {
            if (searchPage.badges.indexOf(sections[i]) >= 0) {
                item.badge = sections[i];                
                break;
            }
        }

        queryly.data = item;
        html = queryly.util.tmpl('queryly_resultpage_template', new Object());

        return html;
    },

    turnpage: function (index) {
        // queryly.jquery('#resultdata').html('');
        //document.getElementById('resultdata').innerHTML = '';

        var keys = '';
        var values = '';
        for (var i = 0; i < searchPage.facetedkey.length; i++) {
            keys = keys + searchPage.facetedkey[i] + "|";
            //values = values + searchPage.facetedvalue[i].join('^') + "|";

            if (searchPage.facetedkey[i] == "section") {
                values = values + "[" + searchPage.facetedvalue[i].join(']^[') + "]|";
            }
            else {
                values = values + searchPage.facetedvalue[i].join('^') + "|";
            }
        }
        var url = "//api.queryly.com/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + searchPage.query + "&endindex=" + searchPage.endIndex + "&batchsize=" + searchPage.batchSize + "&callback=searchPage.resultcallback&showfaceted=true&maxfacetitems=40&extendeddatafields=guid,creator,imageresizer,promo_image,counter_time,section,subtype&timezoneoffset=" + (new Date(0)).getTimezoneOffset();
        url = url + "&sort=" + searchPage.sortby;
        if (searchPage.facetedkey.length > 0) {
            url = url + "&facetedkey=" + encodeURIComponent(keys) + "&facetedvalue=" + encodeURIComponent(values);
        }

        //making the search call to Queryly server
        searchPage.loadScript(url, function (data, textStatus, jqxhr) {
            //window.scrollTo(0, 0);
        });


    },

    //similar with dosearch method, but with faceted turned on. It passes in the current facet selection if any.
    dofacetedsearch: function (index, key, value,initialsearch) {
        //document.getElementById('resultdata').innerHTML = '';

        //assemble the rest api.
        var url = "//api.queryly.com/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + searchPage.query + "&endindex=" + index + "&batchsize=" + searchPage.batchSize + "&callback=searchPage.resultcallback&showfaceted=true&maxfacetitems=40&extendeddatafields=guid,creator,imageresizer,promo_image,counter_time,section,subtype&timezoneoffset=" + (new Date(0)).getTimezoneOffset();
        if (key != '') {

            var fkeys = [];
            var fvals = [];

            
                var filters = document.querySelectorAll('.queryly_filter');

                for (var i = 0; i < filters.length; i++) {
                    var idx = filters[i].id.lastIndexOf('_');
                    var fkey = filters[i].id.substring(0, idx);
                    var filter_items = filters[i].querySelectorAll('.filter_item input');
                    var itemvals = [];
                    for (var j = 0; j < filter_items.length; j++) {
                        if (filter_items[j].checked) {
                            var fval = filter_items[j].value;
                            itemvals.push(fval);
                        }
                    }
                    if (itemvals.length > 0) {
                        if (fkeys.indexOf(fkey) < 0) {
                            fkeys.push(fkey);
                            fvals.push(itemvals);
                        }
                        else {
                            fvals[fkeys.indexOf(fkey)] = fvals[fkeys.indexOf(fkey)].concat(itemvals);
                        }
                    }
                }
            

            searchPage.facetedkey = fkeys;
            searchPage.facetedvalue = fvals;
            var keys = '';
            var values = '';
            for (var i = 0; i < fkeys.length; i++) {
                keys = keys + fkeys[i] + "|";
                if (fkeys[i] == "section" && fvals[i].length > 1) {
                    values = values + "[" + fvals[i].join(']^[') + "]|";
                }
                else {
                    values = values + fvals[i].join('^') + "|";
                }
                
            }

            url = url + "&facetedkey=" + encodeURIComponent(keys) + "&facetedvalue=" + encodeURIComponent(values);


        }
        else {

            if (initialsearch) {
                url = url + "&facetedkey=" + encodeURIComponent(searchPage.fkey.join('|')) + "&facetedvalue=" + encodeURIComponent(searchPage.fval.join('|'));
            }
            else {
                //searchPage.initial_facets = null;
                //searchPage.fkey = '';
                //searchPage.fval = '';
            }
            
            searchPage.facetedkey = [];
            searchPage.facetedvalue = [];

            filters = document.querySelectorAll('.queryly_filter');
            for (var i = 0; i < filters.length; i++) {
                var filter_items = filters[i].querySelectorAll('.filter_item input');

                for (var j = 0; j < filter_items.length; j++) {
                    filter_items[j].checked = false;
                    filter_items[j].disabled = false;
                }
            }
        }

        url = url + "&sort=" + searchPage.sortby;

        //making the search call to Queryly server
        searchPage.loadScript(url, function (data, textStatus, jqxhr) {
        });
    },

    loadScript: function (src, callback) {
        var script = document.createElement('script');
        var loaded = false;
        script.setAttribute('src', src);
        if (callback) {
            script.onreadystatechange = script.onload = function () {
                if (!loaded) {
                    callback();
                }
                loaded = true;
            };
        }
        document.head.appendChild(script);
    }
}
searchPage.init();
