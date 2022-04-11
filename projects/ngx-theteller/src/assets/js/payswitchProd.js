(function(g){

function l(){

  document.getElementById("ttlr_inline")&&document.body.removeChild(document.getElementById("ttlr_inline"));

  if(c&&c.onclose)c.onclose();

  document.getElementById("rve_spinner_container_0999")&&document.body.removeChild(document.getElementById("rve_spinner_container_0999"))
}

  function x(a,b){
    setTimeout(function(){
      l();
      try{a()}
      catch(d){}
    },b)
  }

  function q(a){
    var b=[],d;
    for(d in a) {
      if(a.hasOwnProperty(d)){
        var h=a[d];
        h=encodeURIComponent(h);
        b.push(d+"="+h)
      }
    }
    return b.join("&")
  }

  function qqq(a){
    var b=[],d;
    for(d in a) {
      if(a.hasOwnProperty(d)){
        var h=a[d];
        h=encodeURIComponent(h);
        b.push("/"+h)
      }
    }
    return b.join("")
  }

  function y(a){
    var b=document.createElement("div"),d=document.createElement("div");
    b.setAttribute("class","spinner-container");
    b.setAttribute("id","rve_spinner_container_0999");
    d.setAttribute("class","spinner");
    b.appendChild(d);
    document.body.appendChild(b);
    if(b=document.createElement("style")){
      b.appendChild(document.createTextNode(".spinner-container{height:100%;width:100%;position:fixed;top:0;left:0;background-color:rgba(0,0,0,.75); z-index:999}.spinner{width:40px;height:40px;margin-top:-20px; margin-left:-20px; position:fixed; top:50%; left:50%; background-color:#fff;border-radius:100%;-webkit-animation:sk-scaleout 1s infinite ease-in-out;animation:sk-scaleout 1s infinite ease-in-out}@-webkit-keyframes sk-scaleout{0%{-webkit-transform:scale(0)}100%{-webkit-transform:scale(1);opacity:0}}@keyframes sk-scaleout{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}")),
      document.getElementsByTagName("head")[0].appendChild(b);
    }
    a.loadtimeout&&x(a.onloadtimeout,a.loadtimeout);
    c=a;
    b=document.createElement("iframe");
    b.setAttribute("style","position:fixed; top:0; left:0; z-index:2147483647; border:none;");
    b.setAttribute("allowTransparency","true");
    b.setAttribute("width","100%");
    b.setAttribute("height","100%");
    b.setAttribute("id","ttlr_inline");
    a=JSON.parse(JSON.stringify(a));
    delete a.callback;
    delete a.onclose;
    delete a.onpaymentinit;
    delete a.onvalidateotpinit;
    delete a.meta;
    a.init_url=encodeURIComponent(g.location.href);
    b.src="https://prod.theteller.net/checkout/api/checkout/inline/?"+q(a);
    document.body.appendChild(b);
    b.onload=function(){}
  }

  function z(a,b){
    var d={};
    b.forEach(function(b){
      var c=a.getAttribute("data-"+b);
      c&&(d[b]=c)});
      return d
    }

    function A(a){
      a=a.attributes;
      for(var b=a.length,d=[],c=0;c<b;c++){
        var f=a[c];
        f.name.match(/^data-meta-/)&&d.push({metaname:f.name.replace("data-meta-",""),metavalue:f.value})
      }
      return d
    }
    var c,r,t,n,u={readytorecieve:function(a){
      a.source.postMessage({name:"updategotten",meta:r,subaccounts:t},a.origin)
    },complete:function(a){
      console.log(a);
      setTimeout(function(){
        if(!n&&c&&c.redirect_url) {
          if(a.data.data.transaction_id=a.data.tx,c.redirect_post){
            var b=a.data.data,d=document.createElement("form");
            d.setAttribute("method","POST");
            d.setAttribute("action",c.redirect_url);
            for(var h in b){
              var f=document.createElement("input");
              f.setAttribute("type","hidden");
              f.setAttribute("name",h);
              f.setAttribute("value",b[h]);
              d.appendChild(f)
            }
            document.body.appendChild(d);
            d.submit()
          }
          else {
            g.location.href=c.redirect_no_json?c.redirect_url:c.redirect_url+qqq(a.data.data);
            l();
          }
        }
      },4E3)
    },
    vbv:function(a){
      setTimeout(function(){
        !n&&c&&(a.data.data.transaction_id=a.data.tx,g.location.href=a.data.data.reason)
      },5E3)
    },
    closeiframe:function(a){
      "checkout"===c.campaign_id?g.location.href=c.redirect_url+"/cancelled/900/"+c.transid:l()
    },closeError:function(a){
      setTimeout(function(){l()},4E3)
    }
  };
  g.addEventListener("message",function(a){
    if(a&&a.data&&a.data.name&&u[a.data.name])u[a.data.name](a)
  },!1);

  window.addEventListener('load', function() {
    var v=document.querySelectorAll(".ttlr_inline"),w=v.length;
    console.log(w);

    if(w){
      for(var p=0;p<w;p++){
        var k=v[p];
        if(k){
          var m={};
          m=z(k,"APIKey transid amount customer_email customer_phone customer_lastname customer_firstname currency country customer_fullname callback onclose onvalidateotpinit onpaymentinit redirect_url pay_button_text custom_title custom_description custom_logo default_account payment_method exclude_banks settlement_token recurring_stop integrity_hash redirect_post redirect_no_json payment_page payment_plan campaign_id".split(" "));
          m.meta=A(k)
        }
      }
      var e=document.createElement("button");
      e.innerText=m.pay_button_text||"Pay With Theteller";
      k.innerText="";
      // e.setAttribute("style","color:#fff;background-color:#0a2740;border-color:#142a3e;/*padding:10px;*/display:inline-block;padding:6px12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1pxsolidtransparent;border-radius:4px;");
      e.setAttribute("type","button");
      e.classList.add('btn');
      e.classList.add('btn-primary');
      e.classList.add('btn-block');
      e.addEventListener("click",function(a){
        a=m;
        ""===a.APIKey||void 0===a.APIKey||null===a.APIKey?e.innerText="API Key is required":""===a.transid||void 0===a.transid||null===a.transid||12!==a.transid.length?e.innerText="Invalid Transaction ID":""===a.amount||void 0===a.amount||null===a.amount?e.innerText="Amount is required":""===a.payment_method||void 0===a.payment_method||null===a.payment_method?e.innerText="Set Payment Method":g.getpaidSetup(a)
      });
      k.appendChild(e)
    }
  })


  g.getpaidSetup= function(a){Date.now();if(a.hosted_payment&&!a.is_hosted_page){var b=document.createElement("form");b.setAttribute("method","POST");b.setAttribute("action","https://prod.theteller.net/checkout/api/checkout/initiate");for(var d in a)if("meta"==d)a[d].forEach(function(a,c){var e=document.createElement("input");e.setAttribute("type","hidden");e.setAttribute("name",d+"["+c+"][metaname]");e.setAttribute("value",a.metaname);b.appendChild(e);e=document.createElement("input");e.setAttribute("type","hidden");
      e.setAttribute("name",d+"["+c+"][metavalue]");e.setAttribute("value",a.metavalue);b.appendChild(e)});else if(~["string","number","boolean"].indexOf(typeof a[d])){var c=document.createElement("input");c.setAttribute("type","hidden");c.setAttribute("name",d);c.setAttribute("value",a[d]);b.appendChild(c)}document.body.appendChild(b);b.submit()}else return n=a.is_hosted_page,delete a.is_hosted_page,r=a.meta,t=a.subaccounts,"customer_email"===a.customer_email&&(a.customer_email=document.getElementById("customer_email").value),
      y(a),{close:l}}
})(window);
