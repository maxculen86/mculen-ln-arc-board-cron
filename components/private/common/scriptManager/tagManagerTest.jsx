import React from 'react';
import Consumer from 'fusion:consumer';


const tagManagerTest = ({ deployment }) => {
const scrip = `(function () {

 

    var tcWrapper = function(f) {

      return function() {

          try {

              return f.apply(this, arguments);

          } catch(e) {

              customErrorHandler(e)

          }

      }

  }

 

    function customErrorHandler(e) {

      

    }

 

    function setBoolScroll() {

      skroll = true

    }

 

    function checkIfLogged() {

      try {

        var logged = new RegExp("Ingresar|Ingresá", "i").test($('#cajaUsuario').find('.nick').text())

        return logged

      } catch (e) {}

      return false

    }

 

    function sendHit(payload) {

      if (payload.length > 0) {

        //cd = cd ? "Si" : "No"; // setea custom dimension con usuario loggeado o no(not used -> existe userLogged)

        window.dataLayer.push({

          'event': 'impressions',

          'products': payload,

          //'userLogged': cd

        })

      }

    }

 

    function checkVisibleDD(elm, evalType) {

      if (!elm) return false

 

      evalType = evalType || "visible"

 

      var vpH = $(window).height(), // Viewport Height

        st = $(window).scrollTop(), // Scroll Top

        y = $(elm).offset().top,

        elementHeight = $(elm).height()

      var ans = y < (vpH + st) && y > (st - elementHeight)

 

      if (evalType === "visible") return ans

      if (evalType === "above") return ((y < (vpH + st)))

    }

 

    function containsObject(obj, list) {

      var i

      for (i = 0; i < list.length; i++) {

        if (list[i].name == obj.name && list[i].list == obj.list && list[i].id == obj.id && list[i].position == obj.position) {

          return true

        }

      }

      return false

    }

 

    function getPos(article) {

      var temp = $(article)

      var cont = 0

      while (temp.length != 0) {

        temp = temp.prev()

        cont++

      }

      return cont

    }

 

    function saveAndSend(articlesOBJ) {

      try {

        var cdlogin = checkIfLogged()

 

        sendHit(articlesOBJ.payload, cdlogin)

 

        var seenArticlesString = JSON.stringify(articlesOBJ.seen)

        sessionStorage.setItem('seenArticles', seenArticlesString) // prevent loss upon auto-refresh

 

        articlesOBJ.payload = []

      } catch (e) {}

    }

 

    function impressionsOnScroll(articles, articlesOBJ) {

      //console.log('articles', articles)

      articles.forEach(tcWrapper(function (index, elem) {

          if (checkVisibleDD($(elem), 'visible')) {

            var article = parseArticle(elem, String(index))

            if (!containsObject(article, articlesOBJ.seen) && article.id != undefined && (typeof article.id == 'number' || article.id.match(/[0-9]/g) != null)) {

              articlesOBJ.payload.push(article);

              articlesOBJ.seen.push(article)

            }

          }

      }))

    }

 

    function attachProductClicks(articles) {

      articles.forEach(tcWrapper(function (index, elem) {

          var article = parseArticle(elem, String(index))

          $(elem).click(tcWrapper(function (e) {

            if (article.id != undefined && (typeof article.id == 'number' || article.id.match(/[0-9]/g) != null)) {

              window.dataLayer.push({

                'event': 'productClick',

                'product': article

              })

            }

          }))

          $(elem).mousedown(tcWrapper(function(e){

            switch(e.which){

                case 2:

                  if (article.id != undefined && (typeof article.id == 'number' || article.id.match(/[0-9]/g) != null)) {

                    window.dataLayer.push({

                      'event': 'productClick',

                      'product': article

                    })

                  }

                break;

            }

            return true;// to allow the browser to know that we handled it.

        }));

      }))

    }

 

    try {

      var skroll = false;

      var loMasVistoFlag = false;

      var tePuedeInteresarFlag = false;

      var grillaHoyFlag = false;

      var historiasFlag = false;

      window.onscroll = setBoolScroll;

      var parseArticle;

      var sendInterval;

      var articles = document.getElementsByTagName("article");//$('article');

      var page;

      switch (window.location.href) {

        case '/':

          page = 'Home'

          break

        default:

          page = 'Nota'

          break

      }

      sendInterval = 5000;

      parseArticle = function (art, index) {

        var anArticle = art;

        try {

          var target = $(art)

          var name = target.find('h2').text().trim()

         

          // Se agrega esta line para incluir el titulo de la primer nota

          name = (name==''?target.find('h1').text().trim(): name)

          // Se eliminan espacios y saltos de lineas TODO: agregar data-title con el titulo correcto de la nota

          
         

          var ref = target.find('a').attr('href') // if href is needed

          var artId = target.data('id') || target.data('notaid')

          var block = $(target.parents('section').filter(function () {

            return $(this).data("is-block");

          }).eq(0))

          var blockAside = $(target.parents('aside').filter(function () {

            return $(this).data("is-block");

          }).eq(0))

          var list = block.data('block-name')

          list = list == undefined ? blockAside.data('block-name') : list

          var source = target.data('source')

          var template_block = block.data('diagramacion-id') //target.closest('section').data('diagramacion-id')

          template_block = template_block == undefined ? blockAside.data('diagramacion-id') : template_block

          var author = target.find('.extras a.autor span').text().trim()// ver en el HTML como cargan autor

          if (author.length) name += ' :: ' + author

          list = list == undefined ? '' : list

          var artPos = target.data('pos') != undefined ? target.data('pos') : index;

          //artPos = artPos.replace(/[^0-9]+/g, '');

          artPos = typeof artPos == "string" ? artPos.replace(/[^0-9]+/g, '') : artPos;

          artPos = parseInt(artPos);

          anArticle = {

            "name": name,

            "position": artPos,

            "list": list,

            "brand": template_block,

            "variant": source,

            "id": artId,

          }

        } catch (e) { 
            console.log(JSON.stringify(e)) 
        }

        return anArticle || {}

      }

 

  

      var seenArticles = sessionStorage.getItem('seenArticles')

 

      if (seenArticles != null && seenArticles != '') {

        seenArticles = JSON.parse(seenArticles)

      } else {

        seenArticles = []

      }

 

      var articlesPayload = []

      var articlesOBJ = {

        payload: articlesPayload,

        seen: seenArticles

      }

 

      /*$(window).on("beforeunload", tcWrapper(function () {

          saveAndSend(articlesOBJ)

      }));*/

 

      setTimeout(tcWrapper(function() {

          impressionsOnScroll(articles, articlesOBJ)

      }), 3000)

      //impressionsOnScroll(articles, articlesOBJ) // impression on load

      //saveAndSend(articlesOBJ)

      attachProductClicks(articles)

 

      setInterval(tcWrapper(function () {

        if (skroll) {

          skroll = false

          impressionsOnScroll(articles, articlesOBJ)

        }

        if (!loMasVistoFlag && $('[data-module="masLeidasSitio"] article').length) {

          var addedArticles = $('[data-module="masLeidasSitio"] article');

          $.merge(articles, addedArticles);

          attachProductClicks(addedArticles);

          loMasVistoFlag = true;

        } else if (!tePuedeInteresarFlag && $('[data-module="tePuedeInteresar"] article').length) {

          var addedArticles = $('[data-module="tePuedeInteresar"] article');

          $.merge(articles, addedArticles);

          attachProductClicks(addedArticles);

          tePuedeInteresarFlag = true;

        } else if (!grillaHoyFlag && $('[data-module="grillaHoy"] article').length) {

          var addedArticles = $('[data-module="grillaHoy"] article');

          $.merge(articles, addedArticles);

          attachProductClicks(addedArticles);

          grillaHoyFlag = true;

        }

        else if (!historiasFlag && $('[data-module="historias"] article').length) {

          var addedArticles = $('[data-module="historias"] article');

          $.merge(articles, addedArticles);

          attachProductClicks(addedArticles);

          historiasFlag = true;

        }

      }), 1000)

 

      setInterval(tcWrapper(function () {

          saveAndSend(articlesOBJ)

      }), sendInterval)

 

      // Select the node that will be observed for mutations

      var targetNode = $('body')[0]

 

      // Options for the observer (which mutations to observe)

      var config = { childList: true, subtree: true };

 

      // Callback function to execute when mutations are observed

      var callback = function(mutationsList, observer) {

        try{

          var mutations = mutationsList.filter(function(m){

            return m.type == 'childList' ? true : false

          })

          for(var i=0; i<mutations.length; i++) {

            var addedArticles = $(mutations[i].addedNodes).find('article')

            if(addedArticles.length) {

              $.merge(articles, addedArticles);

              attachProductClicks(addedArticles)

            }

          }

        }catch(e){}

      };

 

      // Create an observer instance linked to the callback function

      var observer = new MutationObserver(callback);

 

      // Start observing the target node for configured mutations

      observer.observe(targetNode, config);

 

    } catch (e) {
        console.log(JSON.stringify(e));
    }

  })()`;

    return (<>
    <script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script>

        </>
    );
};



export default Consumer(tagManagerTest);
/*
<script 
type="text/javascript"
dangerouslySetInnerHTML={{ __html: scrip }}/>
*/