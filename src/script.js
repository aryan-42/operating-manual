(function(){
  "use strict";
  var KEY="opman.v1";
  var DOMS=["body","mind","craft","money","presence","people","character"];
  var NAMES={body:"Body",mind:"Mind",craft:"Craft",money:"Money",presence:"Presence",people:"People",character:"Character"};
  var EMPTY_MSG="No snapshots yet. Your first one is the baseline every later one is measured against.";
  var state={f:{},snaps:[],t:0};
  function $(id){return document.getElementById(id);}
  function setText(id,t){var e=$(id);if(e)e.textContent=t;}
  function num(v){var n=parseFloat(String(v==null?"":v).replace(",","."));return isFinite(n)?n:null;}
  function today(){var d=new Date();function p(n){return n<10?"0"+n:""+n;}return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate());}

  /* Sprint grid: 3 measures by 12 weeks, built before controls are collected. */
  [].forEach.call(document.querySelectorAll("#sprintGrid tbody tr"),function(tr){
    var r=tr.getAttribute("data-row");
    for(var w=1;w<=12;w++){
      var td=document.createElement("td"),cb=document.createElement("input");
      cb.type="checkbox";cb.id="sp-r"+r+"-w"+w;cb.setAttribute("data-k","");
      cb.setAttribute("aria-label","Measure "+r+", week "+w);
      td.appendChild(cb);tr.appendChild(td);
    }
  });

  var els=[].slice.call(document.querySelectorAll("[data-k]"));
  var stds=els.filter(function(e){return e.type==="checkbox"&&e.id.indexOf("c-")===0;});

  function loadLocal(){
    try{var r=localStorage.getItem(KEY);if(r){var s=JSON.parse(r);if(valid(s))state=s;}}catch(e){}
  }
  function saveLocal(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
  function valid(s){return !!s&&typeof s==="object"&&!!s.f&&typeof s.f==="object"&&Array.isArray(s.snaps);}

  function merge(a,b){
    var older=(a.t||0)<=(b.t||0)?a:b, newer=older===a?b:a, out={f:{},snaps:[],t:newer.t||0}, k, seen={};
    for(k in older.f){if(Object.prototype.hasOwnProperty.call(older.f,k))out.f[k]=older.f[k];}
    for(k in newer.f){if(Object.prototype.hasOwnProperty.call(newer.f,k))out.f[k]=newer.f[k];}
    newer.snaps.concat(older.snaps).forEach(function(s){if(s&&s.id&&!seen[s.id]){seen[s.id]=1;out.snaps.push(s);}});
    out.snaps.sort(function(x,y){return x.id<y.id?-1:1;});
    return out;
  }

  function apply(){
    els.forEach(function(el){
      var v=state.f[el.id];
      if(el.type==="checkbox"){el.checked=!!v;}
      else if(v!==undefined&&v!==null){el.value=v;}
      else{el.value=el.defaultValue;}
    });
    renderAll();
  }
  function renderAll(){renderScores();renderSnaps();renderSparks();renderStamps();renderCount();renderDates();renderCalc();renderTime();renderSprint();}

  /* Scorecard */
  function scoreOf(d){var v=state.f["s-"+d];return v===undefined?null:Number(v);}
  function renderScores(){
    var vals=[],lowD=null,lowV=11,hi=0;
    DOMS.forEach(function(d){
      var v=scoreOf(d),out=document.querySelector('output[for="s-'+d+'"]');
      if(out)out.textContent=v===null?"–":String(v);
      if(v!==null){vals.push(v);if(v<lowV){lowV=v;lowD=d;}if(v>hi)hi=v;}
    });
    if(!vals.length){setText("avg","–");setText("low","–");setText("gap","–");return;}
    var sum=vals.reduce(function(a,b){return a+b;},0);
    setText("avg",(sum/vals.length).toFixed(1));
    setText("low",vals.length===DOMS.length?NAMES[lowD]:"score all 7");
    setText("gap",String(hi-lowV));
  }
  function snapAvg(s){var n=0,sum=0;DOMS.forEach(function(d){var v=s.s[d];if(v!=null){n++;sum+=v;}});return n?sum/n:null;}
  function renderSnaps(){
    var tb=document.querySelector("#snapTable tbody");if(!tb)return;tb.textContent="";
    if(!state.snaps.length){
      var tr0=document.createElement("tr"),td0=document.createElement("td");td0.colSpan=11;td0.className="note";
      td0.textContent=EMPTY_MSG;tr0.appendChild(td0);tb.appendChild(tr0);return;
    }
    state.snaps.slice().reverse().forEach(function(s){
      var tr=document.createElement("tr");
      function cell(t,c){var td=document.createElement("td");td.textContent=t;if(c)td.className=c;tr.appendChild(td);}
      cell(s.d,"num");
      DOMS.forEach(function(d){var v=s.s[d];cell(v==null?"–":String(v),"num");});
      var a=snapAvg(s);cell(a===null?"–":a.toFixed(1),"num");cell(s.note||"");
      var td=document.createElement("td"),b=document.createElement("button");b.type="button";b.className="ghost sm";b.textContent="Remove";
      b.addEventListener("click",function(){
        if(b.dataset.armed){state.snaps=state.snaps.filter(function(x){return x.id!==s.id;});touch();renderSnaps();renderSparks();}
        else{b.dataset.armed="1";b.textContent="Confirm";setTimeout(function(){delete b.dataset.armed;b.textContent="Remove";},3000);}
      });
      td.appendChild(b);tr.appendChild(td);tb.appendChild(tr);
    });
  }
  function renderSparks(){
    var box=$("sparks");if(!box)return;box.textContent="";
    if(!state.snaps.length){var p=document.createElement("p");p.className="note";p.textContent="Trends appear here after your first snapshot.";box.appendChild(p);return;}
    var NS="http://www.w3.org/2000/svg",W=150,H=44;
    var series=DOMS.map(function(d){return {name:NAMES[d],vals:state.snaps.map(function(s){return s.s[d];})};});
    series.push({name:"Average",vals:state.snaps.map(snapAvg)});
    series.forEach(function(se){
      var pts=[];se.vals.forEach(function(v,i){if(v!=null)pts.push({i:i,v:v});});
      var card=document.createElement("div");card.className="spark";
      var h=document.createElement("h4"),nm=document.createElement("span"),val=document.createElement("i");
      nm.textContent=se.name;
      if(pts.length){var f=pts[0].v,l=pts[pts.length-1].v;val.textContent=pts.length>1?(fmt(f)+" to "+fmt(l)):fmt(l);}else{val.textContent="–";}
      h.appendChild(nm);h.appendChild(val);card.appendChild(h);
      var svg=document.createElementNS(NS,"svg");svg.setAttribute("viewBox","0 0 "+W+" "+H);svg.setAttribute("role","img");
      svg.setAttribute("aria-label",se.name+" score over "+state.snaps.length+" snapshots");
      var g=document.createElementNS(NS,"line");g.setAttribute("class","gr");g.setAttribute("x1",0);g.setAttribute("x2",W);g.setAttribute("y1",y(5.5));g.setAttribute("y2",y(5.5));svg.appendChild(g);
      var n=state.snaps.length;
      function x(i){return n>1?6+i*(W-12)/(n-1):W/2;}
      function y(v){return H-5-(v-1)/9*(H-10);}
      if(pts.length>1){
        var d="",a="";pts.forEach(function(p,k){d+=(k?"L":"M")+x(p.i).toFixed(1)+" "+y(p.v).toFixed(1)+" ";});
        a=d+"L"+x(pts[pts.length-1].i).toFixed(1)+" "+H+" L"+x(pts[0].i).toFixed(1)+" "+H+" Z";
        var ar=document.createElementNS(NS,"path");ar.setAttribute("class","ar");ar.setAttribute("d",a);svg.appendChild(ar);
        var ln=document.createElementNS(NS,"path");ln.setAttribute("class","ln");ln.setAttribute("d",d);svg.appendChild(ln);
      }
      if(pts.length){var last=pts[pts.length-1],c=document.createElementNS(NS,"circle");c.setAttribute("class","pt");c.setAttribute("cx",x(last.i));c.setAttribute("cy",y(last.v));c.setAttribute("r",3);svg.appendChild(c);}
      card.appendChild(svg);box.appendChild(card);
    });
    function fmt(v){return Math.round(v)===v?String(v):v.toFixed(1);}
  }

  /* Standards: date first met, totals, per-domain counts */
  function renderStamps(){
    stds.forEach(function(el){
      var lab=el.closest("label");if(!lab)return;
      var sm=lab.querySelector(".dt"),d=state.f["@"+el.id];
      if(el.checked&&d){if(!sm){sm=document.createElement("span");sm.className="dt";lab.appendChild(sm);}sm.textContent=d;}
      else if(sm){lab.removeChild(sm);}
    });
  }
  function renderCount(){
    var n=stds.filter(function(e){return e.checked;}).length;
    setText("stdCount",n+" of "+stds.length+" standards met");
    [].forEach.call(document.querySelectorAll("em[data-count]"),function(em){
      var sec=$(em.getAttribute("data-count"));if(!sec)return;
      var c=[].slice.call(sec.querySelectorAll('input[type=checkbox][id^="c-"]'));
      em.textContent=c.filter(function(e){return e.checked;}).length+"/"+c.length;
    });
  }
  function renderDates(){
    var v=$("f-start").value,start=v?new Date(v+"T00:00:00"):null;
    if(!start||isNaN(start.getTime())){setText("weekNo","Week –");setText("nextRev","–");return;}
    var now=new Date(),wk=Math.floor((now-start)/(7*864e5))+1;
    setText("weekNo","Week "+Math.max(1,wk));
    var next=new Date(start.getTime());
    while(next<=now){next.setMonth(next.getMonth()+3);}
    setText("nextRev",next.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}));
  }

  /* Baseline calculations */
  function latest(key){var b=num(state.f["bt-"+key+"-b"]);return b!==null?b:num(state.f["bt-"+key+"-a"]);}
  function renderCalc(){
    var h=num(state.f["bt-height-a"]),w=latest("waist"),kg=latest("weight");
    if(h&&w){var r=w/h;setText("whtr",r.toFixed(2));setText("whtrNote",r<0.5?"under 0.5, in range":"at or above 0.5, bring it down");}
    else{setText("whtr","–");setText("whtrNote","");}
    var g=kg?Math.round(kg*1.6/5)*5:null;
    setText("protein",g?String(g):"–");
    [].forEach.call(document.querySelectorAll(".proteinOut"),function(e){
      e.textContent=g?("about "+g+" g, which is 1.6 g per kg at "+kg+" kg"):"set once you enter your weight in Baseline tests";
    });
  }
  function renderTime(){
    ["ta","tb"].forEach(function(k){
      var s=0;[].forEach.call(document.querySelectorAll('[data-sum="'+k+'"]'),function(e){var n=num(e.value);if(n)s+=n;});
      setText(k+"Sum",String(Math.round(s*10)/10));
    });
  }

  /* Sprint board */
  function sprintStats(){
    var hits=0,maxW=0,rows=0,r,w;
    for(r=1;r<=3;r++){
      var named=!!String(state.f["f-sp-m"+r]||"").trim(),any=false;
      for(w=1;w<=12;w++){if(state.f["sp-r"+r+"-w"+w]){hits++;any=true;if(w>maxW)maxW=w;}}
      if(named||any)rows++;
    }
    return {hits:hits,rows:rows||3,weeks:maxW};
  }
  function renderSprint(){
    if(!$("spHit"))return;
    var s=sprintStats();
    setText("spHit",s.hits+" of "+(s.rows*12));
    setText("spRate",s.weeks?Math.round(100*s.hits/(s.weeks*s.rows))+"%":"–");
  }

  function touch(){state.t=Date.now();saveLocal();scheduleCloud();}
  els.forEach(function(el){
    var ev=(el.type==="checkbox"||el.type==="date")?"change":"input";
    el.addEventListener(ev,function(){
      state.f[el.id]=el.type==="checkbox"?el.checked:el.value;
      if(el.type==="checkbox"&&el.id.indexOf("c-")===0){
        if(el.checked){if(!state.f["@"+el.id])state.f["@"+el.id]=today();}
        else{state.f["@"+el.id]="";}
      }
      touch();
      if(el.type==="range")renderScores();
      else if(el.type==="checkbox"){renderStamps();renderCount();renderSprint();}
      else if(el.id==="f-start")renderDates();
      else if(el.id.indexOf("bt-")===0)renderCalc();
      else if(el.id.indexOf("ta-")===0)renderTime();
      else if(el.id.indexOf("f-sp-m")===0)renderSprint();
    });
    if(el.type==="range"){
      /* A click or key press on the default position still counts as scoring it. */
      ["click","keyup"].forEach(function(n){el.addEventListener(n,function(){
        if(state.f[el.id]===undefined){state.f[el.id]=el.value;touch();renderScores();}
      });});
    }
  });

  $("snapBtn").addEventListener("click",function(){
    var s={},any=false;DOMS.forEach(function(d){var v=scoreOf(d);s[d]=v;if(v!==null)any=true;});
    if(!any){setText("snapMsg","Score at least one domain first.");return;}
    var d=today(),id=d+"-"+Date.now().toString(36);
    state.snaps.push({id:id,d:d,s:s,note:(state.f["f-snapnote"]||"").slice(0,200)});
    touch();renderSnaps();renderSparks();setText("snapMsg","Snapshot saved for "+d+".");
  });

  var spBtn=$("spArchive");
  if(spBtn)spBtn.addEventListener("click",function(){
    var s=sprintStats();
    if(!s.hits&&!String(state.f["f-q-focus"]||"").trim()){setText("spMsg","Nothing to archive yet.");return;}
    if(!spBtn.dataset.armed){spBtn.dataset.armed="1";spBtn.textContent="Confirm: archive and clear";setTimeout(function(){delete spBtn.dataset.armed;spBtn.textContent="Archive this sprint and clear the board";},5000);return;}
    delete spBtn.dataset.armed;spBtn.textContent="Archive this sprint and clear the board";
    var rate=s.weeks?Math.round(100*s.hits/(s.weeks*s.rows))+"%":"no ticks";
    var line=(state.f["f-sp-start"]||"?")+" to "+today()+" · "+(state.f["f-q-focus"]||"no focus set")+" · "+(state.f["f-q-out"]||"no outcome set")+" · "+s.hits+" of "+(s.rows*12)+" hit, "+rate;
    var log=String(state.f["f-sp-log"]||"");
    state.f["f-sp-log"]=line+(log?"\n"+log:"");
    ["f-q-focus","f-q-out","f-q-woop","f-sp-start","f-sp-mid","f-sp-m1","f-sp-m2","f-sp-m3"].forEach(function(k){state.f[k]="";});
    for(var r=1;r<=3;r++)for(var w=1;w<=12;w++)state.f["sp-r"+r+"-w"+w]=false;
    touch();apply();setText("spMsg","Archived. Set up the next sprint.");
  });

  var oa=$("openAll");
  if(oa)oa.addEventListener("click",function(){
    var open=oa.dataset.open!=="1";
    [].forEach.call(document.querySelectorAll("details.pb"),function(d){d.open=open;});
    oa.dataset.open=open?"1":"";oa.textContent=open?"Close all playbooks":"Open all playbooks";
  });
  /* A link to a source inside a closed playbook still works; a hash pointing into one opens it. */
  function openForHash(){
    var id=location.hash.slice(1);if(!id)return;var t=$(id);if(!t)return;
    var d=t.closest("details");if(d)d.open=true;
  }
  window.addEventListener("hashchange",openForHash);

  $("copyBtn").addEventListener("click",function(){
    var txt=JSON.stringify(state);$("bkBox").value=txt;
    try{navigator.clipboard.writeText(txt).then(function(){setText("bkMsg","Backup copied. Paste it into a note you control.");},function(){$("bkBox").select();setText("bkMsg","Copy the selected text below.");});}
    catch(e){$("bkBox").select();setText("bkMsg","Copy the selected text below.");}
  });
  $("restoreBtn").addEventListener("click",function(){
    var b=$("restoreBtn"),s;
    try{s=JSON.parse($("bkBox").value);}catch(e){s=null;}
    if(!valid(s)){setText("bkMsg","That is not a backup from this manual. Paste the full text and try again.");return;}
    if(!b.dataset.armed){b.dataset.armed="1";b.textContent="Confirm: replace everything";setText("bkMsg","This replaces all current entries.");setTimeout(function(){delete b.dataset.armed;b.textContent="Restore from pasted backup";},5000);return;}
    delete b.dataset.armed;b.textContent="Restore from pasted backup";
    state={f:s.f,snaps:s.snaps,t:Date.now()};saveLocal();apply();scheduleCloud();setText("bkMsg","Restored.");
  });

  /* Account storage: one private document per signed-in viewer. Browser storage stays as the fallback. */
  var cloud={ref:null,saving:false,dirty:false,timer:null,dead:false};
  function status(t,ok){setText("syncText",t);$("syncDot").className=ok?"dot ok":"dot";}
  function scheduleCloud(){if(!cloud.ref||cloud.dead)return;clearTimeout(cloud.timer);cloud.timer=setTimeout(pushCloud,1500);}
  function pushCloud(retried){
    if(!cloud.ref||cloud.dead)return;
    if(cloud.saving){cloud.dirty=true;return;}
    cloud.saving=true;cloud.dirty=false;
    cloud.ref.set({json:JSON.stringify(state),t:state.t}).then(function(){
      cloud.saving=false;status("Saved to your Claude account",true);
      if(cloud.dirty)pushCloud();
    },function(e){
      cloud.saving=false;
      if(e&&e.code==="unavailable"&&!retried){setTimeout(function(){pushCloud(true);},1200+Math.random()*1200);return;}
      cloud.dead=true;status("Saving in this browser only",false);
    });
  }
  function initCloud(){
    if(!(window.claude&&typeof window.claude.use==="function"))return;
    Promise.all([window.claude.use("db"),window.claude.use("user")]).then(function(r){
      var db=r[0],user=r[1];if(!db||!user)return null;
      return Promise.resolve(user.id()).then(function(id){
        if(!id)return null;
        var ref=db.doc("data/users/"+id+"/workbook");
        var timeout=new Promise(function(_,rej){setTimeout(function(){rej({code:"timeout"});},10000);});
        return Promise.race([ref.get(),timeout]).then(function(snap){
          cloud.ref=ref;
          var remote=null;
          if(snap&&snap.exists){try{remote=JSON.parse(snap.data().json);}catch(e){remote=null;}}
          if(valid(remote)){
            var localNewer=(state.t||0)>(remote.t||0);
            state=merge(state,remote);saveLocal();apply();
            if(localNewer)pushCloud();
            else status("Saved to your Claude account",true);
          }else if(state.t>0){pushCloud();}
          else{status("Saves to your Claude account",true);}
        });
      });
    }).catch(function(){status("Saving in this browser only",false);});
  }

  loadLocal();apply();openForHash();initCloud();
})();
