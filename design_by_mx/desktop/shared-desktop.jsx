// Чекин Desktop — Shared Components
const {useState} = React;

// ── Tokens ──────────────────────────────────────────────────────────
const A='#C4513A',BG='#F7F4EF',DK='#1A1714',MU='#8A7B70',ML='#C5B8AF',BD='#E8E2DB',WH='#FFFFFF';

// ── Data ────────────────────────────────────────────────────────────
const PLACES=[
  {id:1,name:'Кофейня Юга',cat:'Кафе',color:'#C4513A',addr:'ул. Садовая, 12',desc:'Авторские напитки и домашняя выпечка. Место, где хочется возвращаться снова.',n:342,shape:'circle'},
  {id:2,name:'Книжный',cat:'Книги',color:'#2B4570',addr:'пр. Невский, 45',desc:'Независимый книжный с редкими изданиями и тихими нишами для чтения.',n:218,shape:'octagon'},
  {id:3,name:'Музей Форм',cat:'Культура',color:'#3A6B4A',addr:'пл. Искусств, 3',desc:'Современное искусство и дизайн в историческом здании XIX века.',n:891,shape:'square'},
  {id:4,name:'Горизонт',cat:'Бар',color:'#7B2D42',addr:'наб. Фонтанки, 88',desc:'Крафтовые коктейли и закаты над Фонтанкой. Лучший вид в городе.',n:567,shape:'ring'},
  {id:5,name:'Сад Камней',cat:'Парк',color:'#445566',addr:'Каменный остров, 1',desc:'Японский сад с медитативными дорожками, прудом и сезонными выставками.',n:124,shape:'hex'},
  {id:6,name:'Галерея',cat:'Галерея',color:'#5B3D7A',addr:'ул. Марата, 24',desc:'Концептуальная галерея современных художников. Обновляется каждый месяц.',n:203,shape:'diamond'},
];
const COLL=[{...PLACES[2],date:'2 июня 2026'},{...PLACES[3],date:'28 мая 2026'}];
const OWNED=[PLACES[0],PLACES[1]];

// ── Stamp ────────────────────────────────────────────────────────────
function Stamp({p,sz=120}){
  const c=p.color,tp={fill:c,fontFamily:'Inter,sans-serif'};
  const oPts=r=>Array.from({length:8},(_,i)=>{const a=(i*45-22.5)*Math.PI/180;return `${(60+r*Math.cos(a)).toFixed(1)},${(60+r*Math.sin(a)).toFixed(1)}`;}).join(' ');
  const hPts=r=>Array.from({length:6},(_,i)=>{const a=(i*60+30)*Math.PI/180;return `${(60+r*Math.cos(a)).toFixed(1)},${(60+r*Math.sin(a)).toFixed(1)}`;}).join(' ');
  const CAT=p.cat.toUpperCase();
  let g;
  switch(p.shape){
    case 'circle':g=<>
      <circle cx="60" cy="60" r="55" fill="none" stroke={c} strokeWidth="2" strokeDasharray="5 3.5"/>
      <circle cx="60" cy="60" r="47" fill="none" stroke={c} strokeWidth="1.5"/>
      <circle cx="60" cy="60" r="33" fill="none" stroke={c} strokeWidth="1"/>
      <line x1="51" y1="60" x2="69" y2="60" stroke={c} strokeWidth="2.5"/>
      <line x1="60" y1="51" x2="60" y2="69" stroke={c} strokeWidth="2.5"/>
      <circle cx="60" cy="60" r="3.5" fill={c}/>
      <text x="60" y="79" textAnchor="middle" fontSize="7.5" letterSpacing="2.5" {...tp}>{CAT}</text>
      <text x="60" y="108" textAnchor="middle" fontSize="7" letterSpacing="1.5" {...tp}>2 0 2 6</text>
    </>;break;
    case 'octagon':g=<>
      <polygon points={oPts(55)} fill="none" stroke={c} strokeWidth="2"/>
      <polygon points={oPts(44)} fill="none" stroke={c} strokeWidth="1"/>
      {[45,52,60,68,75].map(y=><line key={y} x1="38" y1={y} x2="82" y2={y} stroke={c} strokeWidth="0.9"/>)}
      <text x="60" y="91" textAnchor="middle" fontSize="7.5" letterSpacing="2" {...tp}>{CAT}</text>
    </>;break;
    case 'square':g=<>
      <rect x="7" y="7" width="106" height="106" fill="none" stroke={c} strokeWidth="2"/>
      <rect x="19" y="19" width="82" height="82" fill="none" stroke={c} strokeWidth="1"/>
      <line x1="7" y1="21" x2="21" y2="7" stroke={c} strokeWidth="1.5"/>
      <line x1="99" y1="7" x2="113" y2="21" stroke={c} strokeWidth="1.5"/>
      <line x1="7" y1="99" x2="21" y2="113" stroke={c} strokeWidth="1.5"/>
      <line x1="99" y1="113" x2="113" y2="99" stroke={c} strokeWidth="1.5"/>
      <line x1="19" y1="46" x2="101" y2="46" stroke={c} strokeWidth="0.75"/>
      <line x1="19" y1="74" x2="101" y2="74" stroke={c} strokeWidth="0.75"/>
      <line x1="46" y1="19" x2="46" y2="101" stroke={c} strokeWidth="0.75"/>
      <line x1="74" y1="19" x2="74" y2="101" stroke={c} strokeWidth="0.75"/>
      <circle cx="60" cy="60" r="5" fill={c}/>
    </>;break;
    case 'ring':g=<>
      <circle cx="60" cy="60" r="55" fill="none" stroke={c} strokeWidth="2"/>
      <circle cx="60" cy="60" r="44" fill="none" stroke={c} strokeWidth="1"/>
      <circle cx="60" cy="60" r="31" fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="4 3"/>
      {[0,45,90,135].map(deg=>{const r=deg*Math.PI/180;return <line key={deg} x1={60+14*Math.cos(r)} y1={60+14*Math.sin(r)} x2={60-14*Math.cos(r)} y2={60-14*Math.sin(r)} stroke={c} strokeWidth="1.5"/>;})}
      <text x="60" y="108" textAnchor="middle" fontSize="7.5" letterSpacing="2" {...tp}>{CAT}</text>
    </>;break;
    case 'hex':g=<>
      <polygon points={hPts(55)} fill="none" stroke={c} strokeWidth="2"/>
      <polygon points={hPts(43)} fill="none" stroke={c} strokeWidth="1"/>
      <circle cx="60" cy="57" r="21" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="105 20"/>
      <text x="60" y="90" textAnchor="middle" fontSize="7.5" letterSpacing="2" {...tp}>{CAT}</text>
    </>;break;
    case 'diamond':g=<>
      <polygon points="60,5 115,60 60,115 5,60" fill="none" stroke={c} strokeWidth="2"/>
      <polygon points="60,20 100,60 60,100 20,60" fill="none" stroke={c} strokeWidth="1"/>
      {[[48,48],[60,48],[72,48],[48,60],[60,60],[72,60],[48,72],[60,72],[72,72]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2" fill={c}/>)}
      <text x="60" y="112" textAnchor="middle" fontSize="7.5" letterSpacing="2" {...tp}>{CAT}</text>
    </>;break;
    default:g=null;
  }
  return <svg viewBox="0 0 120 120" width={sz} height={sz} style={{display:'block',overflow:'visible'}}>{g}</svg>;
}

// ── QR Mock ──────────────────────────────────────────────────────────
function QRMock({size=180,color='#1A1714'}){
  const M=[
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],[1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],[1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],[1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1],[0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0],
    [1,0,1,0,0,1,0,1,0,1,0,1,0,1,1,0,0,1,1],[0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0],
    [1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1],[0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,1,0,1],[1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1],[1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,0,0,1,1,0,0,1,1],[1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1,0,0,0],
    [1,1,1,1,1,1,1,0,0,0,0,0,1,0,1,0,1,0,1],
  ];
  const n=M.length,cs=size/n;
  return <svg width={size} height={size} viewBox={'0 0 '+size+' '+size} style={{display:'block'}}>
    {M.map((row,r)=>row.map((v,c)=>v?<rect key={r+'-'+c} x={c*cs} y={r*cs} width={cs-.5} height={cs-.5} fill={color} rx="0.8"/>:null))}
  </svg>;
}

// ── Icons ────────────────────────────────────────────────────────────
const IcSearch=({s=18,c=ML})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IcShare=({s=18,c=WH})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>;
const IcCopy=({s=15,c=A})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcPin=({s=18,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
const IcEdit=({s=16,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcTrash=({s=16,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IcPlus=({s=16,c=WH})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcChevR=({s=16,c=ML})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>;
const IcDownload=({s=18,c=WH})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

// ── Wordmark ─────────────────────────────────────────────────────────
function Wordmark({sub}){
  return <div style={{display:'flex',alignItems:'center',gap:10}}>
    <Stamp p={PLACES[0]} sz={30}/>
    <div style={{display:'flex',alignItems:'baseline',gap:8}}>
      <span style={{fontSize:18,fontWeight:800,letterSpacing:'.14em',color:DK}}>ЧЕКИН</span>
      {sub&&<span style={{fontSize:12,fontWeight:500,color:MU,letterSpacing:'.02em'}}>{sub}</span>}
    </div>
  </div>;
}

// ── Topbar ───────────────────────────────────────────────────────────
function Topbar({role,active,go}){
  const guestNav=[['places','Места'],['collection','Коллекция']];
  const ownerNav=[['dashboard','Мои места'],['analytics','Аналитика']];
  const nav=role==='owner'?ownerNav:guestNav;
  return <header className="dtopbar">
    <div className="dtopbar-in">
      <div style={{cursor:'pointer'}} onClick={()=>go(role==='owner'?'dashboard':'places')}>
        <Wordmark sub={role==='owner'?'для бизнеса':null}/>
      </div>
      <nav className="dnav">
        {nav.map(([id,lbl])=>(
          <button key={id} className={'dnav-link'+(active===id?' on':'')} onClick={()=>go(id)}>{lbl}</button>
        ))}
      </nav>
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        {role==='owner'&&(
          <button className="dbtn-sm" onClick={()=>go('add')}><IcPlus s={14}/>Добавить место</button>
        )}
        <button className="davatar" onClick={()=>go(role==='owner'?'profile':'profile')}>
          <span>АЛ</span>
        </button>
      </div>
    </div>
  </header>;
}

// ── Page shell ───────────────────────────────────────────────────────
function Page({role,active,go,children,wide}){
  return <div className="dpage">
    <Topbar role={role} active={active} go={go}/>
    <main className={'dwrap'+(wide?' wide':'')}>{children}</main>
  </div>;
}

// ── Filter chips ─────────────────────────────────────────────────────
function Chips({items,value,onChange}){
  return <div className="dchips">
    {items.map(c=><button key={c} className={'dchip'+(value===c?' on':'')} onClick={()=>onChange(c)}>{c}</button>)}
  </div>;
}

// ── Place card ───────────────────────────────────────────────────────
function PlaceCard({p,onClick,count=true}){
  return <button className="dcard place" onClick={onClick}>
    <div className="dcard-stamp"><Stamp p={p} sz={88}/></div>
    <div className="dcard-body">
      <div className="dcard-title">{p.name}</div>
      <div className="dcard-addr"><IcPin s={13} c={MU}/>{p.addr}</div>
      <div className="dcard-foot">
        <span className="dbadge">{p.cat}</span>
        {count&&<span className="dcount">{p.n} штампов</span>}
      </div>
    </div>
  </button>;
}

Object.assign(window,{
  A,BG,DK,MU,ML,BD,WH,PLACES,COLL,OWNED,
  Stamp,QRMock,Wordmark,Topbar,Page,Chips,PlaceCard,
  IcSearch,IcShare,IcCopy,IcPin,IcEdit,IcTrash,IcPlus,IcChevR,IcDownload,
});
