import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {Clock3,ArrowUpRight,ArrowDownLeft,Repeat2,MapPin,ShieldCheck,Plus,Search,ChevronRight,Sparkles,HeartHandshake,WalletCards,X,CheckCircle2} from "lucide-react";
import "./styles.css";

const seed=[
 {id:1,title:"Fix my resume",skill:"Career",distance:"0.3 km",time:1,person:"Aarav",trust:4.9,tag:"URGENT"},
 {id:2,title:"Math tutoring",skill:"Education",distance:"0.8 km",time:1,person:"Isha",trust:4.8,tag:"TODAY"},
 {id:3,title:"Help move a table",skill:"Hands-on",distance:"1.1 km",time:0.5,person:"Kabir",trust:4.7,tag:"NEARBY"},
 {id:4,title:"Build a simple portfolio",skill:"Web",distance:"1.6 km",time:2,person:"Riya",trust:5.0,tag:"SKILL"}
];

function App(){
 const [tab,setTab]=useState("home");
 const [requests,setRequests]=useState(seed);
 const [wallet,setWallet]=useState({
  earned:12,
  given:4,
  passed:2,
  balance:7.5
 });
 const [modal,setModal]=useState(false);
 const [toast,setToast]=useState("");
 const [search,setSearch]=useState("");

 const [ledger,setLedger]=useState([
  {id:1,text:"Today · Resume review",amount:-1},
  {id:2,text:"Yesterday · C++ mentoring",amount:1},
  {id:3,text:"Yesterday · Passed to Riya",amount:-1},
  {id:4,text:"Sep 22 · Math tutoring",amount:2}
 ]);

 useEffect(()=>{
  const savedWallet=localStorage.getItem("timeloop-wallet");
  const savedLedger=localStorage.getItem("timeloop-ledger");

  if(savedWallet){
   try{
    setWallet(JSON.parse(savedWallet));
   }catch{
    localStorage.removeItem("timeloop-wallet");
   }
  }

  if(savedLedger){
   try{
    setLedger(JSON.parse(savedLedger));
   }catch{
    localStorage.removeItem("timeloop-ledger");
   }
  }
 },[]);

 useEffect(()=>{
  localStorage.setItem("timeloop-wallet",JSON.stringify(wallet));
 },[wallet]);

 useEffect(()=>{
  localStorage.setItem("timeloop-ledger",JSON.stringify(ledger));
 },[ledger]);

 const filtered=useMemo(()=>{
  return requests.filter(r=>
   (r.title+" "+r.skill).toLowerCase().includes(search.toLowerCase())
  );
 },[requests,search]);

 function showToast(message){
  setToast(message);
  setTimeout(()=>{
   setToast("");
  },2400);
 }

 function accept(r){
  setWallet(w=>({
   ...w,
   given:w.given+r.time,
   balance:Math.max(0,w.balance-r.time)
  }));

  setLedger(l=>[
   {
    id:Date.now(),
    text:"Just now · "+r.title,
    amount:-r.time
   },
   ...l
  ]);

  showToast("Loop started — "+r.title);
 }

 function add(e){
  e.preventDefault();

  const f=new FormData(e.currentTarget);

  const title=f.get("title");
  const skill=f.get("skill");
  const time=Number(f.get("time"));

  setRequests([
   {
    id:Date.now(),
    title,
    skill,
    distance:"0.2 km",
    time,
    person:"You",
    trust:5,
    tag:"NEW"
   },
   ...requests
  ]);

  setLedger(l=>[
   {
    id:Date.now()+1,
    text:"Just now · Request created",
    amount:0
   },
   ...l
  ]);

  setModal(false);
  showToast("Request added to the local loop");
 }

 function openTimeBridge(){
  setWallet(w=>({
   ...w,
   balance:w.balance+1
  }));

  setLedger(l=>[
   {
    id:Date.now(),
    text:"Just now · TimeBridge promise",
    amount:1
   },
   ...l
  ]);

  showToast("TimeBridge: +1h promise opened");
 }

 return <div className="app">

  <aside>

   <div className="brand">
    <div className="mark">∞</div>
    <div>
     <b>TIMELOOP</b>
     <span>COMMUNITY TIME ECONOMY</span>
    </div>
   </div>

   <nav>
    {[
     ["home","Overview"],
     ["nearby","Nearby help"],
     ["wallet","Time wallet"],
     ["trust","Trust profile"]
    ].map(([k,t])=>
     <button
      className={tab===k?"active":""}
      onClick={()=>setTab(k)}
      key={k}
     >
      <span>
       {k==="home"
        ?<Clock3/>
        :k==="nearby"
        ?<MapPin/>
        :k==="wallet"
        ?<WalletCards/>
        :<ShieldCheck/>
       }
      </span>
      {t}
     </button>
    )}
   </nav>

   <div className="sidecard">
    <Sparkles size={16}/>
    <b>THE IDEA</b>
    <p>1 hour = 1 credit. The credit can move.</p>
   </div>

   <div className="sidebottom">
    MURPHY.EXE
    <br/>
    <small>GLOBAL INNOVATION HACKATHON 2026</small>
   </div>

  </aside>

  <main>

   <header>
    <div>
     <span className="eyebrow">
      THURSDAY · COMMUNITY 01
     </span>

     <h1>
      {tab==="home"
       ?"Your time is already valuable."
       :tab==="nearby"
       ?"Help is closer than you think."
       :tab==="wallet"
       ?"See where your hours went."
       :"Trust, measured in action."
      }
     </h1>
    </div>

    <button className="avatar">
     MS
    </button>
   </header>

   {tab==="home"&&
   <>

    <section className="hero">

     <div>

      <span className="pill">
       <HeartHandshake size={14}/>
       TIME AS A SOCIAL CURRENCY
      </span>

      <h2>
       Give an hour.
       <br/>
       <em>Start a loop.</em>
      </h2>

      <p>
       You help someone. You earn time. They pass it forward.
       No prices. No followers. Just useful hours moving through
       a community.
      </p>

      <button
       className="primary"
       onClick={()=>setModal(true)}
      >
       Offer / request time
       <ArrowUpRight size={17}/>
      </button>

     </div>

     <div className="orb">
      <div className="ring r1"></div>
      <div className="ring r2"></div>

      <div className="orbit o1">
       1h
      </div>

      <div className="orbit o2">
       +1
      </div>

      <div className="center">
       ∞
       <small>LOOP</small>
      </div>
     </div>

    </section>

    <section className="stats">

     <Stat
      icon={<Clock3/>}
      label="TIME CREDITS"
      value={wallet.balance+"h"}
      sub="available now"
     />

     <Stat
      icon={<ArrowUpRight/>}
      label="EARNED"
      value={wallet.earned+"h"}
      sub="contributed"
     />

     <Stat
      icon={<ArrowDownLeft/>}
      label="GIVEN"
      value={wallet.given+"h"}
      sub="received help"
     />

     <Stat
      icon={<Repeat2/>}
      label="PASSED"
      value={wallet.passed+"h"}
      sub="kept circulating"
     />

    </section>

    <section className="grid2">

     <div className="panel">

      <div className="panelhead">

       <div>
        <span className="eyebrow">
         LIVE LOOP
        </span>

        <h3>
         Hours in motion
        </h3>
       </div>

       <button
        className="ghost"
        onClick={()=>setTab("wallet")}
       >
        View ledger
        <ChevronRight size={15}/>
       </button>

      </div>

      <div className="flow">

       <Node
        label="YOU"
        text="teach C++"
        first
       />

       <div className="line">
        <span>+1.0h</span>
       </div>

       <Node
        label="A"
        text="needs C++"
       />

       <div className="line">
        <span>+1.0h</span>
       </div>

       <Node
        label="B"
        text="needs design"
       />

       <div className="line">
        <span>+1.0h</span>
       </div>

       <Node
        label="C"
        text="needs tutoring"
       />

      </div>

     </div>

     <div className="panel bridge">

      <div className="miniicon">
       ↔
      </div>

      <span className="eyebrow">
       TIMEBRIDGE
      </span>

      <h3>
       Need help before you can give?
      </h3>

      <p>
       Start at <b>−1h</b>. The promise is recorded,
       then repaid when you can.
      </p>

      <button
       className="secondary"
       onClick={openTimeBridge}
      >
       Open a TimeBridge
       <ArrowUpRight size={15}/>
      </button>

     </div>

    </section>

   </>
   }

   {tab==="nearby"&&
   <section className="content">

    <div className="search">
     <Search size={18}/>

     <input
      value={search}
      onChange={e=>setSearch(e.target.value)}
      placeholder="Search skills, help or people..."
     />
    </div>

    <div className="sectiontitle">

     <div>
      <span className="eyebrow">
       LOCAL-FIRST
      </span>

      <h2>
       Nearby requests
      </h2>
     </div>

     <button
      className="primary small"
      onClick={()=>setModal(true)}
     >
      <Plus size={16}/>
      New request
     </button>

    </div>

    <div className="requestgrid">

     {filtered.map(r=>
      <Request
       key={r.id}
       r={r}
       onAccept={accept}
      />
     )}

    </div>

   </section>
   }

   {tab==="wallet"&&
   <section className="content">

    <div className="walletbig">

     <span className="eyebrow">
      TIME WALLET
     </span>

     <div className="bigbalance">
      {wallet.balance}
      <small>hours</small>
     </div>

     <p>
      Your balance is a record of available time — not money.
     </p>

    </div>

    <div className="ledger">

     {ledger.map(item=>
      <div
       className="ledgerrow"
       key={item.id}
      >
       <span>
        {item.text}
       </span>

       <b>
        {item.amount>0?"+":""}
        {item.amount.toFixed(1)}h
       </b>
      </div>
     )}

    </div>

   </section>
   }

   {tab==="trust"&&
   <section className="content">

    <div className="profile">

     <div className="profileavatar">
      MS
     </div>

     <div>

      <span className="eyebrow">
       TIME CONTRIBUTOR
      </span>

      <h2>
       Mohit
      </h2>

      <p>
       Reputation earned in hours, not followers.
      </p>

     </div>

     <div className="trustscore">
      <b>4.9</b>
      <span>★ TRUST SCORE</span>
     </div>

    </div>

    <div className="trustgrid">

     {[
      ["12h","Given"],
      ["8","Exchanges"],
      ["0","Missed"],
      ["3","Passed"]
     ].map(x=>
      <div
       className="trustbox"
       key={x[1]}
      >
       <b>{x[0]}</b>
       <span>{x[1]}</span>
      </div>
     )}

    </div>

    <div className="panel">

     <span className="eyebrow">
      TRUST ENGINE
     </span>

     <h3>
      What makes a trustworthy loop?
     </h3>

     <div className="criteria">

      {[
       "Completion — did the exchange happen?",
       "Punctuality — did you show up?",
       "Feedback — would they exchange again?",
       "History — what have you contributed?"
      ].map((x,i)=>
       <div key={x}>
        <CheckCircle2 size={17}/>
        <span>{x}</span>
        <b>
         {[98,96,100,92][i]}%
        </b>
       </div>
      )}

     </div>

    </div>

   </section>
   }

  </main>

  {modal&&
  <div className="modalwrap">

   <div className="modal">

    <button
     className="close"
     onClick={()=>setModal(false)}
    >
     <X/>
    </button>

    <span className="eyebrow">
     START A LOOP
    </span>

    <h2>
     Put an hour into motion.
    </h2>

    <form onSubmit={add}>

     <label>
      What do you need?
     </label>

     <input
      name="title"
      required
      placeholder="e.g. Review my portfolio"
     />

     <label>
      Skill / category
     </label>

     <input
      name="skill"
      required
      placeholder="e.g. Web, Design, Study"
     />

     <label>
      Time needed (hours)
     </label>

     <input
      name="time"
      type="number"
      min=".5"
      step=".5"
      defaultValue="1"
      required
     />

     <button
      className="primary"
      type="submit"
     >
      Publish request
      <ArrowUpRight size={17}/>
     </button>

    </form>

   </div>

  </div>
  }

  {toast&&
  <div className="toast">
   <CheckCircle2 size={17}/>
   {toast}
  </div>
  }

 </div>
}

function Stat({icon,label,value,sub}){
 return(
  <div className="stat">
   <div className="staticon">
    {icon}
   </div>

   <span>{label}</span>

   <b>{value}</b>

   <small>{sub}</small>
  </div>
 );
}

function Node({label,text,first}){
 return(
  <div className={"node "+(first?"selected":"")}>
   <div>{label}</div>
   <span>{text}</span>
  </div>
 );
}

function Request({r,onAccept}){
 return(
  <article className="request">

   <div className="requesttop">
    <span className="tag">
     {r.tag}
    </span>

    <span>
     {r.distance}
    </span>
   </div>

   <h3>
    {r.title}
   </h3>

   <p>
    {r.skill} · {r.time}h
   </p>

   <div className="requestfoot">

    <div className="person">

     <div>
      {r.person[0]}
     </div>

     <span>
      {r.person}
      <small>
       ★ {r.trust}
      </small>
     </span>

    </div>

    <button
     onClick={()=>onAccept(r)}
    >
     Start loop
     <ArrowUpRight size={15}/>
    </button>

   </div>

  </article>
 );
}

createRoot(
 document.getElementById("root")
).render(
 <App/>
);
