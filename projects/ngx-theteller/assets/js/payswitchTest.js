//'use strict';
(function (window) {

  var globalConfigData;
  var globalMeta;
  var globalSubaccounts;
  var globalClosePopup;
  var globalButtonClicked;
  var globalIsHostedPage;

  var w = window;


  function closePopup() {


      if (document.getElementById('ttlr_inline'))
          document.body.removeChild(document.getElementById('ttlr_inline'));

      if (globalConfigData && globalConfigData.onclose) {
          globalConfigData.onclose();
      }

      if (document.getElementById('rve_spinner_container_0999'))
          document.body.removeChild(document.getElementById('rve_spinner_container_0999'));

  }

  globalClosePopup = closePopup;

  //message handlers
  var message_handlers = {};
  message_handlers.readytorecieve = function (d) {

      d.source.postMessage({ name: "updategotten", meta: globalMeta, subaccounts: globalSubaccounts }, d.origin);

  };

  var loadtimeout_settimeouthandler;

  function handleLoadTimeout(timeout_callback, wait) {

      loadtimeout_settimeouthandler = setTimeout(function () {
          closePopup();
          try {
              timeout_callback();
          } catch (e) {
          }
      }, wait)

  }


  message_handlers.complete = function (d) {
      console.log(d);

      setTimeout(function () {
          if (!globalIsHostedPage && globalConfigData && globalConfigData.redirect_url) {
              d.data.data['transaction_id'] = d.data.tx;
              if (globalConfigData.redirect_post) {
                  generateQueryPost(d.data.data);
              }
              else {
                  if (globalConfigData.redirect_no_json) {
                      window.location.href = globalConfigData.redirect_url;
                  } else {
                      window.location.href = globalConfigData.redirect_url + '?' + generateQueryString(d.data.data)
                  }

              }
          }
      }, 4000);//end set timeout

  };

  message_handlers.vbv = function (d) {
      setTimeout(function () {
          if (!globalIsHostedPage && globalConfigData) {
              d.data.data['transaction_id'] = d.data.tx;
              window.location.href = d.data.data.reason;
          }
      }, 5000);//end set timeout
  };

  message_handlers.closeiframe = function (d) {
      if (globalConfigData.campaign_id === 'checkout') {
          window.location.href = globalConfigData.redirect_url + '?status=cancelled&code=900&transaction_id=' + globalConfigData.transid;
      } else {
          closePopup();
      }
  };

  message_handlers.closeError = function (d) {
      setTimeout(function () {
          closePopup();
      }, 4000);
  };

  w.addEventListener("message", function (message_data) {
      if (message_data && message_data.data && message_data.data.name && message_handlers[message_data.data.name]) {
          message_handlers[message_data.data.name](message_data);
      }

  }, false);


  function generateQueryString(obj) {
      var str = [];
      for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
              var v = obj[prop];
              v = encodeURIComponent(v);
              str.push(prop + "=" + v);
          }
      }
      return (str.join("&"));
  }

  function generateQueryPost(obj) {
      var form = document.createElement('form');
      form.setAttribute('method', 'POST');
      form.setAttribute('action', globalConfigData.redirect_url);
      for (var c in obj) {
          var i = document.createElement('input');
          i.setAttribute('type', 'hidden');
          i.setAttribute('name', c);
          i.setAttribute('value', obj[c]);
          form.appendChild(i);
      }
      document.body.appendChild(form);
      form.submit();
  }


  function loadIframe(data) {

      /*Show spinner*/
      var spinnerContainer = document.createElement('div');
      var spinner = document.createElement('div');
      spinnerContainer.setAttribute('class', 'spinner-container');
      spinnerContainer.setAttribute('id', 'rve_spinner_container_0999');
      spinner.setAttribute('class', 'spinner');
      spinnerContainer.appendChild(spinner);
      document.body.appendChild(spinnerContainer);

      var pageStyle = document.createElement('style');
      if (pageStyle) {
          pageStyle.appendChild(document.createTextNode('.spinner-container{height:100%;width:100%;position:fixed;top:0;left:0;background-color:rgba(0,0,0,.75); z-index:999}.spinner{width:40px;height:40px;margin-top:-20px; margin-left:-20px; position:fixed; top:50%; left:50%; background-color:#fff;border-radius:100%;-webkit-animation:sk-scaleout 1s infinite ease-in-out;animation:sk-scaleout 1s infinite ease-in-out}@-webkit-keyframes sk-scaleout{0%{-webkit-transform:scale(0)}100%{-webkit-transform:scale(1);opacity:0}}@keyframes sk-scaleout{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}'));
          document.getElementsByTagName('head')[0].appendChild(pageStyle);
      }


      if (data.loadtimeout) {
          handleLoadTimeout(data.onloadtimeout, data.loadtimeout);
      }

      globalConfigData = data;
      var getpaidiframe = document.createElement('iframe');
      getpaidiframe.setAttribute('style', 'position:fixed; top:0; left:0; z-index:2147483647; border:none;');
      getpaidiframe.setAttribute('allowTransparency', 'true');
      getpaidiframe.setAttribute('width', '100%');
      getpaidiframe.setAttribute('height', '100%');
      getpaidiframe.setAttribute('id', 'ttlr_inline');

      //this inadvertently strips all functions, the inner stringify that is. Accidental genius maybe?
      var _data = JSON.parse(JSON.stringify(data));

      delete _data.callback;  //callback is not required as a query string to pass
      delete _data.onclose;   //onclose is not required as a query string to pass
      delete _data.onpaymentinit;
      delete _data.onvalidateotpinit;
      delete _data.meta;
      //delete _data.onintegritycheck;

      _data.init_url = encodeURIComponent(window.location.href);

      getpaidiframe.src = 'https://test.theteller.net/checkout/api/checkout/inline/?' + generateQueryString(_data);

      document.body.appendChild(getpaidiframe);

      getpaidiframe.onload = function () {

      }
  }

  function validateData(x, paybutton) {

      if (x.APIKey === '' || x.APIKey === undefined || x.APIKey === null) {
          paybutton.innerText = 'API Key is required';
      } else if (x.transid === '' || x.transid === undefined || x.transid === null || x.transid.length !== 12) {
          paybutton.innerText = 'Invalid Transaction ID';
      } else if (x.amount === '' || x.amount === undefined || x.amount === null) {
          paybutton.innerText = 'Amount is required';
      }
      else if (x.payment_method === '' || x.payment_method === undefined || x.payment_method === null) {
          paybutton.innerText = 'Set Payment Method';
      }
      else {
          window.getpaidSetup(x);
      }
  }

  function extractAttributes(element, attributes) {
      var obj = {};
      attributes
          .forEach(function (attrib) {
              var aa = element.getAttribute('data-' + attrib);
              if (aa)
                  obj[attrib] = aa;
          });
      return obj;
  }

  function extractMetaInfo(element) {
      var attributes = element.attributes;
      var atrlen = attributes.length;
      var metas = [];
      for (var x = 0; x < atrlen; x++) {
          var attrib = attributes[x];
          if (attrib.name.match(/^data-meta-/)) {
              metas.push(
                  {
                      metaname: attrib.name.replace('data-meta-', ''),
                      metavalue: attrib.value
                  }
              );
          }
      }

      //=== Handle sideffects\\
      x = null;
      atrlen = null;
      //======================\\
      return metas
  }

  window.addEventListener('load', function() {
    var anchors = document.getElementsByClassName('ttlr_inline');
    var anlen = anchors.length;
    if (anlen) {


        for (var i = 0; i < anlen; i++) {


            var ahref = anchors[i];
            if (ahref) {
                var iframeData = {};
                iframeData = extractAttributes(ahref, ['APIKey', 'transid', 'amount', 'customer_email',
                    'customer_phone', 'customer_lastname', 'customer_firstname', 'currency', 'country',
                    'customer_fullname', 'callback', 'onclose', 'onvalidateotpinit',
                    'onpaymentinit', 'redirect_url', 'pay_button_text', 'custom_title', 'custom_description',
                    'custom_logo', 'default_account', 'payment_method', 'exclude_banks', 'settlement_token',
                    'recurring_stop', 'integrity_hash', 'redirect_post', 'redirect_no_json', 'payment_page', 'payment_plan', 'campaign_id'
                ]);

                //globalMeta = extractMetaInfo(ahref);
                iframeData.meta = extractMetaInfo(ahref);

            }
        }


        var paybutton = document.createElement('button');
        paybutton.innerText = iframeData.pay_button_text || "Pay With Theteller";
        ahref.innerText = "";

        paybutton.setAttribute('style', 'color:#fff;background-color:#0a2740;border-color:#142a3e;/*padding:10px;*/display:inline-block;padding:6px12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1pxsolidtransparent;border-radius:4px;');

        paybutton.setAttribute('type', 'button');

        // paybutton.classList.add('btn');
        // paybutton.classList.add('btn-primary');
        // paybutton.classList.add('btn-block');

        paybutton.addEventListener('click', function (e) {

            validateData(iframeData, paybutton);

        });
        ahref.appendChild(paybutton);
    }
  });

  window.getpaidSetup = function (config) {

      globalButtonClicked = Date.now();
      if (config.hosted_payment && !config.is_hosted_page) {

          var form = document.createElement('form');
          form.setAttribute('method', 'POST');
          //form.setAttribute('target', '_blank');
          form.setAttribute('action', 'https://test.theteller.net/checkout/api/checkout/initiate');
          for (var c in config) {

              if (c == 'meta') {

                  config[c].forEach(function (m, mi) {

                      var i = document.createElement('input');
                      i.setAttribute('type', 'hidden');
                      i.setAttribute('name', c + '[' + mi + '][metaname]');
                      i.setAttribute('value', m.metaname);
                      form.appendChild(i);
                      var i = document.createElement('input');
                      i.setAttribute('type', 'hidden');
                      i.setAttribute('name', c + '[' + mi + '][metavalue]');
                      i.setAttribute('value', m.metavalue);
                      form.appendChild(i);

                  })

              } else {
                  if (!~["string", "number", "boolean"].indexOf(typeof config[c])) continue;
                  var i = document.createElement('input');
                  i.setAttribute('type', 'hidden');
                  i.setAttribute('name', c);
                  i.setAttribute('value', config[c]);
                  form.appendChild(i);
              }
          }
          document.body.appendChild(form);
          form.submit();
          return;

      }

      globalIsHostedPage = config.is_hosted_page;
      delete config.is_hosted_page;
      globalMeta = config.meta;
      globalSubaccounts = config.subaccounts;
      if (config.customer_email === 'customer_email') {
          config.customer_email = document.getElementById('customer_email').value;
      }
      loadIframe(config);
      return {
          close: globalClosePopup
      }
  }

  //});
})(window);
