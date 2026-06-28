// Чекин — Shared Components
// All components exported to window for standalone screen files
const {useState} = React;

// ── Tokens ──────────────────────────────────────────────────────────
const A='#C4513A',BG='#F7F4EF',DK='#1A1714',MU='#8A7B70',ML='#C5B8AF',BD='#E8E2DB',WH='#FFFFFF';
const SB=62;

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

// ── Icons ────────────────────────────────────────────────────────────
const IcBack=({s=24,c=DK})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>;
const IcChev=({s=18,c=ML})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>;
const IcSearch=({s=18,c=ML})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IcShare=({s=18,c=WH})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>;
const IcCopy=({s=15,c=A})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcPin=({s=22,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
const IcGrid=({s=22,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>;
const IcPers=({s=22,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>;
const IcChart=({s=22,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
const IcEdit=({s=18,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcTrash=({s=18,c=MU})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;

// ── Navigation ───────────────────────────────────────────────────────
function BNav({active,go}){
  const tabs=[{id:3,label:'Места',El:IcPin},{id:7,label:'Коллекция',El:IcGrid},{id:9,label:'Профиль',El:IcPers}];
  return <div className="bnav">{tabs.map(({id,label,El})=>{const on=active===id,col=on?A:MU;return(
    <button key={id} className="ntab" onClick={()=>go(id)}><El s={22} c={col}/><span className="nlbl" style={{color:col}}>{label}</span></button>
  );})}</div>;
}
function BNavOwner({active,go}){
  const tabs=[{id:10,label:'Места',El:IcGrid},{id:14,label:'Аналитика',El:IcChart},{id:9,label:'Профиль',El:IcPers}];
  return <div className="bnav">{tabs.map(({id,label,El})=>{const on=active===id,col=on?A:MU;return(
    <button key={id} className="ntab" onClick={()=>go(id)}><El s={22} c={col}/><span className="nlbl" style={{color:col}}>{label}</span></button>
  );})}</div>;
}

// ── QR Mock ──────────────────────────────────────────────────────────
function QRMock({size=180,color='#1A1714'}){
  const M=[
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1],
    [0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0],
    [1,0,1,0,0,1,0,1,0,1,0,1,0,1,1,0,0,1,1],
    [0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0],
    [1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,0,0,1,1,0,0,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,1,0,0,0],
    [1,1,1,1,1,1,1,0,0,0,0,0,1,0,1,0,1,0,1],
  ];
  const n=M.length,cs=size/n;
  return <svg width={size} height={size} viewBox={'0 0 '+size+' '+size} style={{display:'block'}}>
    {M.map((row,r)=>row.map((v,c)=>v?<rect key={r+'-'+c} x={c*cs} y={r*cs} width={cs-.5} height={cs-.5} fill={color} rx="0.8"/>:null))}
  </svg>;
}

// ── Shell ────────────────────────────────────────────────────────────
const Shell=({dark,children})=>(
  <div style={{height:'100%',display:'flex',flexDirection:'column',background:dark?'#0E0B09':BG,overflow:'hidden'}}>{children}</div>
);

// ── S1 Онбординг ─────────────────────────────────────────────────────
function S1({go}){
  return <IOSDevice><Shell>
    <div className="sc" style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:SB+20+'px 28px 34px'}}>
      <div style={{marginBottom:14}}><Stamp p={PLACES[0]} sz={78}/></div>
      <div style={{fontSize:30,fontWeight:800,letterSpacing:'.1em',color:DK,marginBottom:8}}>ЧЕКИН</div>
      <div style={{fontSize:14,color:MU,lineHeight:1.7,marginBottom:44,maxWidth:220}}>Собирайте штампы мест,<br/>которые вам важны</div>
      <div style={{display:'flex',gap:16,marginBottom:48,opacity:.15}}>
        {PLACES.slice(1,4).map(p=><Stamp key={p.id} p={p} sz={44}/>)}
      </div>
      <div style={{width:'100%',display:'flex',flexDirection:'column',gap:12}}>
        <button className="btn-p" onClick={()=>go(2)}>Я гость</button>
        <button className="btn-s" onClick={()=>go(10)}>Я владелец места</button>
      </div>
    </div>
  </Shell></IOSDevice>;
}

// ── S2 Вход ──────────────────────────────────────────────────────────
function S2({go}){
  const [tab,setTab]=useState('in');
  return <IOSDevice><Shell>
    <div className="sc" style={{flex:1,display:'flex',flexDirection:'column',padding:SB+'px 24px 36px'}}>
      <button onClick={()=>go(1)} style={{background:'none',border:'none',cursor:'pointer',alignSelf:'flex-start',padding:'4px 0',marginBottom:22}}><IcBack/></button>
      <div style={{fontSize:24,fontWeight:700,color:DK,marginBottom:5}}>{tab==='in'?'Добро пожаловать':'Создать аккаунт'}</div>
      <div style={{fontSize:13,color:MU,marginBottom:26}}>{tab==='in'?'Войдите, чтобы продолжить':'Несколько штампов вас уже ждут'}</div>
      <div style={{display:'flex',background:'#EDE9E3',borderRadius:12,padding:3,marginBottom:24,gap:3}}>
        {[['in','Войти'],['up','Регистрация']].map(([t,lbl])=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:'10px 0',borderRadius:9,border:'none',cursor:'pointer',background:tab===t?WH:'transparent',color:tab===t?DK:MU,fontFamily:'Inter,sans-serif',fontSize:14,fontWeight:500,boxShadow:tab===t?'0 1px 4px rgba(0,0,0,.10)':'none',transition:'all .15s'}}>{lbl}</button>
        ))}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:11,marginBottom:20}}>
        {tab==='up'&&<input className="inp" placeholder="Ник (@username)"/>}
        <input className="inp" type="email" placeholder="Email"/>
        <input className="inp" type="password" placeholder="Пароль"/>
      </div>
      <button className="btn-p" onClick={()=>go(3)}>{tab==='in'?'Войти':'Зарегистрироваться'}</button>
      <div style={{textAlign:'center',marginTop:14,fontSize:13,color:MU}}>
        {tab==='in'?'Нет аккаунта? ':'Уже есть? '}
        <span style={{color:A,fontWeight:500,cursor:'pointer'}} onClick={()=>setTab(tab==='in'?'up':'in')}>{tab==='in'?'Зарегистрироваться':'Войти'}</span>
      </div>
    </div>
  </Shell></IOSDevice>;
}

// ── S3 Места ─────────────────────────────────────────────────────────
function S3({go}){
  const [chip,setChip]=useState('Все');
  const cats=['Все','Кафе','Книги','Культура','Бар','Парк','Галерея'];
  const list=chip==='Все'?PLACES:PLACES.filter(p=>p.cat===chip);
  return <IOSDevice><Shell>
    <div className="sc" style={{flexShrink:0,padding:SB+'px 20px 12px'}}>
      <div style={{fontSize:28,fontWeight:700,color:DK,marginBottom:14}}>Места</div>
      <div style={{position:'relative',marginBottom:12}}>
        <div style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)'}}><IcSearch/></div>
        <input className="inp" placeholder="Поиск мест" style={{paddingLeft:40}}/>
      </div>
      <div className="scrl" style={{display:'flex',gap:7,paddingBottom:4}}>
        {cats.map(c=><button key={c} className={'chip '+(chip===c?'on':'off')} onClick={()=>setChip(c)}>{c}</button>)}
      </div>
    </div>
    <div className="scrl" style={{flex:1,padding:'4px 20px 8px',display:'flex',flexDirection:'column',gap:10}}>
      {list.map(p=>(
        <div key={p.id} className="card" onClick={()=>go(4,{place:p})}>
          <div style={{flexShrink:0}}><Stamp p={p} sz={58}/></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:15,fontWeight:600,color:DK,marginBottom:2}}>{p.name}</div>
            <div style={{fontSize:12,color:MU,marginBottom:5}}>{p.addr}</div>
            <span className="bdg">{p.cat}</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4,flexShrink:0}}>
            <IcChev/><span style={{fontSize:11,color:ML}}>{p.n}</span>
          </div>
        </div>
      ))}
    </div>
    <BNav active={3} go={go}/>
  </Shell></IOSDevice>;
}

// ── S4 Детали ─────────────────────────────────────────────────────────
function S4({go,place}){
  const p=place||PLACES[0];
  return <IOSDevice><Shell>
    <div className="sc" style={{flexShrink:0,display:'flex',alignItems:'center',padding:SB+'px 20px 8px',gap:4}}>
      <button onClick={()=>go(3)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px 8px 4px 0'}}><IcBack/></button>
      <span className="bdg">{p.cat}</span>
    </div>
    <div className="scrl" style={{flex:1}}>
      <div style={{display:'flex',justifyContent:'center',padding:'20px 20px 16px'}}><div className="sc"><Stamp p={p} sz={158}/></div></div>
      <div style={{padding:'0 20px 24px'}}>
        <div style={{fontSize:26,fontWeight:700,color:DK,marginBottom:6}}>{p.name}</div>
        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:14}}><IcPin s={14} c={MU}/><span style={{fontSize:13,color:MU}}>{p.addr}</span></div>
        <div style={{fontSize:15,color:DK,lineHeight:1.65,marginBottom:18}}>{p.desc}</div>
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'13px 0',borderTop:'1px solid '+BD,borderBottom:'1px solid '+BD}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:p.color}}/><span style={{fontSize:13,color:MU}}>{p.n} штампов поставлено</span>
        </div>
      </div>
    </div>
    <div style={{flexShrink:0,padding:'12px 20px 32px',borderTop:'1px solid '+BD,background:WH}}>
      <button className="btn-p" onClick={()=>go(5,{place:p})}>Отсканировать QR</button>
    </div>
  </Shell></IOSDevice>;
}

// ── S5 QR Сканер ──────────────────────────────────────────────────────
function S5({go,place}){
  const p=place||PLACES[0];
  return <IOSDevice dark><Shell dark>
    <div className="sc" style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',color:WH}}>
      <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:SB+'px 24px 0'}}>
        <div style={{fontSize:17,fontWeight:600}}>Сканировать QR</div>
        <button onClick={()=>go(4,{place:p})} style={{background:'none',border:'none',cursor:'pointer',color:WH,fontSize:22,lineHeight:1}}>✕</button>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:22,paddingBottom:20}}>
        <div style={{position:'relative',width:220,height:220}}>
          <div style={{position:'absolute',inset:0,borderRadius:8,background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.08)'}}/>
          {[{top:0,left:0,borderTop:'3px solid #FFF',borderLeft:'3px solid #FFF'},{top:0,right:0,borderTop:'3px solid #FFF',borderRight:'3px solid #FFF'},{bottom:0,left:0,borderBottom:'3px solid #FFF',borderLeft:'3px solid #FFF'},{bottom:0,right:0,borderBottom:'3px solid #FFF',borderRight:'3px solid #FFF'}].map((s,i)=>
            <div key={i} style={{position:'absolute',width:28,height:28,borderRadius:2,...s}}/>
          )}
          <div className="scan-line" style={{position:'absolute',left:8,right:8,height:2,borderRadius:1,top:'50%',background:'linear-gradient(90deg,transparent,'+A+',transparent)'}}/>
        </div>
        <div style={{fontSize:14,color:'rgba(255,255,255,.5)',textAlign:'center',lineHeight:1.7}}>Наведите камеру<br/>на QR-код места</div>
        <button onClick={()=>go(6,{place:p})} style={{padding:'11px 24px',background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.18)',borderRadius:40,color:WH,fontSize:13,fontFamily:'Inter,sans-serif',cursor:'pointer'}}>Симулировать скан →</button>
      </div>
      <div style={{width:'100%',padding:'12px 20px 34px',flexShrink:0}}>
        <button onClick={()=>go(4,{place:p})} style={{width:'100%',padding:'14px',background:'rgba(255,255,255,.1)',border:'none',borderRadius:14,color:'rgba(255,255,255,.75)',fontFamily:'Inter,sans-serif',fontSize:15,cursor:'pointer'}}>Отмена</button>
      </div>
    </div>
  </Shell></IOSDevice>;
}

// ── S6 Подтверждение штампа ───────────────────────────────────────────
function S6({go,place}){
  const p=place||PLACES[0];
  const d=new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
  return <IOSDevice><Shell>
    <div className="sc" style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:(SB+16)+'px 28px 34px'}}>
      <div className="stamp-anim" style={{marginBottom:28}}><Stamp p={p} sz={180}/></div>
      <div style={{fontSize:22,fontWeight:700,color:DK,marginBottom:5}}>{p.name}</div>
      <div style={{fontSize:13,color:MU,marginBottom:4}}>{p.cat}</div>
      <div style={{fontSize:13,color:ML,marginBottom:40}}>{d}</div>
      <div style={{width:'100%',display:'flex',flexDirection:'column',gap:10}}>
        <button className="btn-p" onClick={()=>go(7)}>Подтвердить</button>
        <button onClick={()=>go(4,{place:p})} style={{background:'none',border:'none',color:MU,fontSize:14,cursor:'pointer',padding:'8px',fontFamily:'Inter,sans-serif'}}>Отмена</button>
      </div>
    </div>
  </Shell></IOSDevice>;
}

// ── S7 Коллекция ──────────────────────────────────────────────────────
function S7({go}){
  return <IOSDevice><Shell>
    <div className="sc" style={{flexShrink:0,padding:SB+'px 20px 12px',display:'flex',alignItems:'center',gap:10}}>
      <span style={{fontSize:28,fontWeight:700,color:DK}}>Коллекция</span>
      <span style={{background:DK,color:WH,borderRadius:20,padding:'2px 10px',fontSize:13,fontWeight:600}}>{COLL.length}</span>
    </div>
    <div className="scrl" style={{flex:1,padding:'4px 20px 8px',display:'flex',flexDirection:'column',gap:10}}>
      {COLL.map((item,i)=>(
        <div key={i} className="card" onClick={()=>go(8,{stamp:item})}>
          <div style={{flexShrink:0}}><Stamp p={item} sz={70}/></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:15,fontWeight:600,color:DK,marginBottom:3}}>{item.name}</div>
            <div style={{fontSize:12,color:MU,marginBottom:5}}>{item.date}</div>
            <span className="bdg">{item.cat}</span>
          </div>
          <IcChev/>
        </div>
      ))}
      <div className="card" onClick={()=>go(3)} style={{border:'1.5px dashed '+BD,boxShadow:'none',background:'transparent'}}>
        <div style={{flexShrink:0,opacity:.22}}><Stamp p={PLACES[1]} sz={50}/></div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:500,color:DK,marginBottom:2}}>Найти ещё места</div>
          <div style={{fontSize:12,color:MU}}>Осталось 4 из 6 доступных</div>
        </div>
        <IcChev/>
      </div>
    </div>
    <BNav active={7} go={go}/>
  </Shell></IOSDevice>;
}

// ── S8 Карточка штампа ────────────────────────────────────────────────
function S8({go,stamp}){
  const p=stamp||COLL[0];
  const [done,setDone]=useState(false);
  return <IOSDevice><Shell>
    <div className="sc" style={{flexShrink:0,padding:SB+'px 20px 8px'}}>
      <button onClick={()=>go(7)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px 0'}}><IcBack/></button>
    </div>
    <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'16px 28px',textAlign:'center'}}>
      <div style={{marginBottom:28}}><Stamp p={p} sz={190}/></div>
      <div style={{fontSize:24,fontWeight:700,color:DK,marginBottom:6}}>{p.name}</div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:6}}>
        <span className="bdg">{p.cat}</span>
        <span style={{fontSize:13,color:ML}}>·</span>
        <span style={{fontSize:13,color:MU}}>{p.date}</span>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:4}}>
        <IcPin s={13} c={ML}/><span style={{fontSize:13,color:ML}}>{p.addr}</span>
      </div>
    </div>
    <div style={{flexShrink:0,padding:'12px 20px 32px',borderTop:'1px solid '+BD,background:WH}}>
      <button className="btn-p" onClick={()=>{setDone(true);setTimeout(()=>setDone(false),2500);}}>
        <IcShare/>{done?'✓ Скопировано!':'Поделиться'}
      </button>
    </div>
  </Shell></IOSDevice>;
}

// ── S9 Профиль ────────────────────────────────────────────────────────
function S9({go}){
  const [copied,setCopied]=useState(false);
  return <IOSDevice><Shell>
    <div className="scrl sc" style={{flex:1,padding:SB+'px 20px 12px',display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,paddingBottom:20,borderBottom:'1px solid '+BD}}>
        <div style={{width:76,height:76,borderRadius:'50%',background:DK,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,color:BG}}>АЛ</div>
        <div style={{fontSize:20,fontWeight:700,color:DK}}>@aleksei</div>
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 20px',background:WH,borderRadius:40,boxShadow:'0 1px 4px rgba(0,0,0,.07)'}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:A}}/>
          <span style={{fontSize:14,fontWeight:600,color:DK}}>{COLL.length} штампа</span>
        </div>
      </div>
      <div>
        <div className="sec-label">Реферальная ссылка</div>
        <div style={{background:WH,borderRadius:14,padding:'13px 15px',display:'flex',alignItems:'center',gap:10,boxShadow:'0 1px 4px rgba(0,0,0,.06)'}}>
          <span style={{flex:1,fontSize:13,color:ML,fontFamily:'monospace',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>checkin.app/ref/aleksei24</span>
          <button onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)}} style={{display:'flex',alignItems:'center',gap:5,background:'none',border:'1.5px solid '+A,borderRadius:8,padding:'6px 11px',cursor:'pointer',color:A,fontFamily:'Inter,sans-serif',fontSize:12,fontWeight:600,whiteSpace:'nowrap'}}>
            <IcCopy/>{copied?'✓':'Скопировать'}
          </button>
        </div>
      </div>
      <div>
        <div className="sec-label">Мои штампы</div>
        <div style={{display:'flex',gap:12}}>
          {COLL.map((item,i)=>(
            <div key={i} onClick={()=>go(8,{stamp:item})} style={{background:WH,borderRadius:12,padding:'12px',display:'flex',flexDirection:'column',alignItems:'center',gap:6,cursor:'pointer',flex:1,boxShadow:'0 1px 4px rgba(0,0,0,.06)'}}>
              <Stamp p={item} sz={50}/><span style={{fontSize:11,color:MU,textAlign:'center'}}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{marginTop:'auto',paddingBottom:8}}>
        <button onClick={()=>go(1)} style={{width:'100%',padding:'14px',background:'rgba(196,81,58,.08)',border:'none',borderRadius:14,color:A,fontFamily:'Inter,sans-serif',fontSize:15,fontWeight:500,cursor:'pointer'}}>Выйти</button>
      </div>
    </div>
    <BNav active={9} go={go}/>
  </Shell></IOSDevice>;
}

// ── S10 Дашборд владельца ─────────────────────────────────────────────
function S10({go}){
  const [delTarget,setDelTarget]=useState(null);
  return <IOSDevice><Shell style={{position:'relative'}}>
    {delTarget&&(
      <div style={{position:'absolute',inset:0,zIndex:99,display:'flex',alignItems:'flex-end',background:'rgba(0,0,0,.45)',backdropFilter:'blur(4px)'}}>
        <div style={{width:'100%',background:WH,borderRadius:'20px 20px 0 0',padding:'24px 20px 36px'}}>
          <div style={{fontSize:17,fontWeight:700,color:DK,marginBottom:6}}>Удалить место?</div>
          <div style={{fontSize:14,color:MU,marginBottom:24,lineHeight:1.6}}>«{delTarget.name}» будет удалено вместе со всеми данными. Это действие нельзя отменить.</div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <button onClick={()=>setDelTarget(null)} style={{width:'100%',padding:'14px',background:'#C0392B',border:'none',borderRadius:14,color:WH,fontFamily:'Inter,sans-serif',fontSize:15,fontWeight:600,cursor:'pointer'}}>Удалить</button>
            <button onClick={()=>setDelTarget(null)} className="btn-s">Отмена</button>
          </div>
        </div>
      </div>
    )}
    <div className="sc" style={{flexShrink:0,padding:SB+'px 20px 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <span style={{fontSize:28,fontWeight:700,color:DK}}>Мои места</span>
      <button onClick={()=>go(11)} style={{display:'flex',alignItems:'center',gap:6,background:A,border:'none',borderRadius:20,padding:'8px 14px',cursor:'pointer',color:WH,fontFamily:'Inter,sans-serif',fontSize:13,fontWeight:600}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={WH} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Добавить
      </button>
    </div>
    <div className="scrl" style={{flex:1,padding:'4px 20px 8px',display:'flex',flexDirection:'column',gap:12}}>
      {OWNED.map(p=>(
        <div key={p.id} className="card" style={{cursor:'default'}}>
          <div style={{flexShrink:0,cursor:'pointer'}} onClick={()=>go(14,{ownerPlace:p})}><Stamp p={p} sz={58}/></div>
          <div style={{flex:1,minWidth:0,cursor:'pointer'}} onClick={()=>go(14,{ownerPlace:p})}>
            <div style={{fontSize:15,fontWeight:600,color:DK,marginBottom:2}}>{p.name}</div>
            <div style={{fontSize:12,color:MU,marginBottom:5}}>{p.addr}</div>
            <span className="bdg">{p.cat}</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8,flexShrink:0}}>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:16,fontWeight:700,color:DK}}>{p.n}</div>
              <div style={{fontSize:11,color:MU}}>штампов</div>
            </div>
            <div style={{display:'flex',gap:6}}>
              <button onClick={()=>go(15,{ownerPlace:p})} style={{display:'flex',alignItems:'center',justifyContent:'center',width:30,height:30,borderRadius:8,border:'1.5px solid '+BD,background:WH,cursor:'pointer'}}><IcEdit s={15} c={MU}/></button>
              <button onClick={()=>setDelTarget(p)} style={{display:'flex',alignItems:'center',justifyContent:'center',width:30,height:30,borderRadius:8,border:'1.5px solid #FBDBD8',background:'#FEF2F1',cursor:'pointer'}}><IcTrash s={15} c="#C0392B"/></button>
            </div>
          </div>
        </div>
      ))}
      <div>
        <div className="sec-label">QR-коды мест</div>
        <div style={{display:'flex',gap:10}}>
          {OWNED.map(p=>(
            <div key={p.id} onClick={()=>go(13,{ownerPlace:p})} style={{flex:1,background:WH,borderRadius:14,padding:'14px 10px',display:'flex',flexDirection:'column',alignItems:'center',gap:8,cursor:'pointer',boxShadow:'0 1px 4px rgba(0,0,0,.06)'}}>
              <QRMock size={54} color={p.color}/>
              <div style={{fontSize:11,color:DK,fontWeight:600,textAlign:'center'}}>{p.name}</div>
              <span style={{fontSize:10,color:A,fontWeight:500}}>Открыть →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <BNavOwner active={10} go={go}/>
  </Shell></IOSDevice>;
}

// ── S11 Добавить место ────────────────────────────────────────────────
function S11({go}){
  const [form,setForm]=useState({name:'',cat:'Кафе',addr:'',desc:''});
  const CATS=['Кафе','Книги','Культура','Бар','Парк','Галерея'];
  return <IOSDevice><Shell>
    <div className="sc" style={{flexShrink:0,display:'flex',alignItems:'center',padding:SB+'px 20px 12px',gap:4}}>
      <button onClick={()=>go(10)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px 8px 4px 0'}}><IcBack/></button>
      <div style={{flex:1}}>
        <div style={{fontSize:18,fontWeight:700,color:DK}}>Новое место</div>
        <div style={{fontSize:12,color:MU}}>Шаг 1 из 2</div>
      </div>
      <div style={{width:48,height:4,borderRadius:2,background:BD,overflow:'hidden'}}>
        <div style={{width:'50%',height:'100%',background:A,borderRadius:2}}/>
      </div>
    </div>
    <div className="scrl" style={{flex:1,padding:'4px 20px 8px',display:'flex',flexDirection:'column',gap:16}}>
      <div><div className="sec-label">Название</div><input className="inp" placeholder="Название вашего места" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
      <div>
        <div className="sec-label">Категория</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:7}}>{CATS.map(c=><button key={c} className={'chip '+(form.cat===c?'on':'off')} onClick={()=>setForm({...form,cat:c})}>{c}</button>)}</div>
      </div>
      <div><div className="sec-label">Адрес</div><input className="inp" placeholder="ул. Примерная, 1" value={form.addr} onChange={e=>setForm({...form,addr:e.target.value})}/></div>
      <div><div className="sec-label">Описание</div><textarea className="inp" placeholder="Расскажите о месте..." rows={3} style={{resize:'none',lineHeight:1.6}} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/></div>
    </div>
    <div style={{flexShrink:0,padding:'12px 20px 32px',borderTop:'1px solid '+BD,background:WH}}>
      <button className="btn-p" onClick={()=>go(12,{newPlace:form})}>Далее — дизайн штампа</button>
    </div>
  </Shell></IOSDevice>;
}

// ── S12 Дизайн штампа ────────────────────────────────────────────────
function S12({go,newPlace}){
  const SHAPES=['circle','octagon','square','ring','hex','diamond'];
  const COLORS=['#C4513A','#2B4570','#3A6B4A','#7B2D42','#445566','#5B3D7A'];
  const [shape,setShape]=useState('circle');
  const [color,setColor]=useState('#C4513A');
  const prev={id:'p',name:(newPlace&&newPlace.name)||'Ваш штамп',cat:(newPlace&&newPlace.cat)||'Место',color,shape};
  return <IOSDevice><Shell>
    <div className="sc" style={{flexShrink:0,display:'flex',alignItems:'center',padding:SB+'px 20px 12px',gap:4}}>
      <button onClick={()=>go(11)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px 8px 4px 0'}}><IcBack/></button>
      <div style={{flex:1}}>
        <div style={{fontSize:18,fontWeight:700,color:DK}}>Дизайн штампа</div>
        <div style={{fontSize:12,color:MU}}>Шаг 2 из 2</div>
      </div>
      <div style={{width:48,height:4,borderRadius:2,background:BD,overflow:'hidden'}}>
        <div style={{width:'100%',height:'100%',background:A,borderRadius:2}}/>
      </div>
    </div>
    <div className="scrl" style={{flex:1,padding:'0 20px 8px',display:'flex',flexDirection:'column',gap:18}}>
      <div style={{display:'flex',justifyContent:'center',padding:'14px 0 6px'}}><Stamp p={prev} sz={124}/></div>
      <div>
        <div className="sec-label">Форма</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8}}>
          {SHAPES.map(s=>(
            <div key={s} onClick={()=>setShape(s)} style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'7px 0',borderRadius:10,cursor:'pointer',background:shape===s?color+'18':WH,border:shape===s?'1.5px solid '+color:'1.5px solid '+BD,transition:'all .15s'}}>
              <Stamp p={{...prev,shape:s}} sz={32}/>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="sec-label">Цвет</div>
        <div style={{display:'flex',gap:10}}>
          {COLORS.map(col=>(
            <div key={col} onClick={()=>setColor(col)} style={{width:36,height:36,borderRadius:'50%',background:col,cursor:'pointer',flexShrink:0,boxShadow:color===col?'0 0 0 2.5px '+WH+', 0 0 0 4.5px '+col:'none',transition:'box-shadow .15s'}}/>
          ))}
        </div>
      </div>
    </div>
    <div style={{flexShrink:0,padding:'12px 20px 32px',borderTop:'1px solid '+BD,background:WH}}>
      <button className="btn-p" onClick={()=>go(13,{newPlace:{...prev,...(newPlace||{}),color,shape}})}>Создать место и QR-код</button>
    </div>
  </Shell></IOSDevice>;
}

// ── S13 QR-код ────────────────────────────────────────────────────────
function S13({go,newPlace,ownerPlace}){
  const p=ownerPlace||newPlace||PLACES[0];
  const isNew=!!newPlace&&!ownerPlace;
  return <IOSDevice><Shell>
    {!isNew&&(
      <div style={{flexShrink:0,display:'flex',alignItems:'center',padding:SB+'px 20px 8px',gap:4}}>
        <button onClick={()=>go(10)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px 8px 4px 0'}}><IcBack/></button>
        <span style={{fontSize:18,fontWeight:700,color:DK}}>QR-код</span>
      </div>
    )}
    <div className="sc" style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:(isNew?SB+16:12)+'px 28px 34px',textAlign:'center'}}>
      {isNew&&(
        <div style={{marginBottom:22}}>
          <div style={{width:52,height:52,borderRadius:'50%',background:'#3A6B4A',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={WH} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{fontSize:20,fontWeight:700,color:DK,marginBottom:4}}>Место создано!</div>
          <div style={{fontSize:13,color:MU}}>Распечатайте QR и разместите в заведении</div>
        </div>
      )}
      {!isNew&&<div style={{marginBottom:14,fontSize:13,color:MU}}>{p.cat}</div>}
      <div style={{background:WH,borderRadius:20,padding:20,boxShadow:'0 4px 24px rgba(0,0,0,.10)',marginBottom:22}}>
        <QRMock size={172} color={p.color||DK}/>
        <div style={{marginTop:12,fontSize:14,fontWeight:700,color:DK}}>{p.name}</div>
        <div style={{fontSize:11,color:MU,marginTop:2}}>checkin.app/place/{p.id||'new'}</div>
      </div>
      <div style={{width:'100%',display:'flex',flexDirection:'column',gap:10}}>
        <button className="btn-p"><IcShare/>Скачать PDF</button>
        <button className="btn-s" onClick={()=>go(10)}>{isNew?'К моим местам':'Назад'}</button>
      </div>
    </div>
  </Shell></IOSDevice>;
}

// ── S14 Аналитика ─────────────────────────────────────────────────────
function S14({go,ownerPlace}){
  const initSel=ownerPlace?Math.max(0,OWNED.findIndex(p=>p.id===ownerPlace.id)):0;
  const [sel,setSel]=useState(initSel);
  const p=OWNED[sel]||OWNED[0];
  const BARS=[{d:'Пн',v:8},{d:'Вт',v:15},{d:'Ср',v:12},{d:'Чт',v:24},{d:'Пт',v:31},{d:'Сб',v:47},{d:'Вс',v:28}];
  const RECENT=[{user:'@marina_s',time:'сейчас'},{user:'@pavel_k',time:'2 мин назад'},{user:'@lena_art',time:'7 мин назад'},{user:'@igor_m',time:'15 мин назад'},{user:'@sonya_t',time:'23 мин назад'}];
  return <IOSDevice><Shell>
    <div className="sc" style={{flexShrink:0,display:'flex',alignItems:'center',padding:SB+'px 20px 10px',gap:4}}>
      <button onClick={()=>go(10)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px 8px 4px 0'}}><IcBack/></button>
      <span style={{fontSize:20,fontWeight:700,color:DK}}>Аналитика</span>
    </div>
    <div className="scrl" style={{flex:1,padding:'4px 20px 12px',display:'flex',flexDirection:'column',gap:16}}>
      <div style={{display:'flex',gap:7}}>
        {OWNED.map((pl,i)=><button key={i} className={'chip '+(sel===i?'on':'off')} onClick={()=>setSel(i)}>{pl.name}</button>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
        {[{lbl:'Всего',val:p.n},{lbl:'Сегодня',val:12},{lbl:'Неделя',val:47}].map(({lbl,val})=>(
          <div key={lbl} style={{background:WH,borderRadius:14,padding:'14px 10px',textAlign:'center',boxShadow:'0 1px 4px rgba(0,0,0,.06)'}}>
            <div style={{fontSize:22,fontWeight:700,color:DK}}>{val}</div>
            <div style={{fontSize:11,color:MU,marginTop:2}}>{lbl}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="sec-label">Последние 7 дней</div>
        <div style={{background:WH,borderRadius:14,padding:'14px 12px 10px',boxShadow:'0 1px 4px rgba(0,0,0,.06)'}}>
          <div style={{display:'flex',alignItems:'flex-end',gap:5,height:80}}>
            {BARS.map(({d,v},i)=>(
              <div key={d} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div style={{flex:1,width:'100%',display:'flex',alignItems:'flex-end'}}>
                  <div style={{width:'100%',borderRadius:'4px 4px 0 0',background:i===5?p.color:p.color+'55',height:(v/47*100)+'%',minHeight:4}}/>
                </div>
                <span style={{fontSize:10,color:MU}}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="sec-label">Последние штампы</div>
        <div style={{background:WH,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.06)'}}>
          {RECENT.map(({user,time},i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderBottom:i<RECENT.length-1?'1px solid '+BD:'none'}}>
              <div style={{width:32,height:32,borderRadius:'50%',background:p.color+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:p.color,flexShrink:0}}>{user[1].toUpperCase()}</div>
              <div style={{flex:1,fontSize:14,fontWeight:500,color:DK}}>{user}</div>
              <span style={{fontSize:12,color:ML,whiteSpace:'nowrap'}}>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <BNavOwner active={14} go={go}/>
  </Shell></IOSDevice>;
}


// ── S15 Редактировать место ───────────────────────────────────────────
function S15({go,ownerPlace}){
  const p=ownerPlace||OWNED[0];
  const [form,setForm]=useState({name:p.name,cat:p.cat,addr:p.addr,desc:p.desc||''});
  const CATS=['Кафе','Книги','Культура','Бар','Парк','Галерея'];
  return <IOSDevice><Shell>
    <div className="sc" style={{flexShrink:0,display:'flex',alignItems:'center',padding:SB+'px 20px 12px',gap:4}}>
      <button onClick={()=>go(10)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px 8px 4px 0'}}><IcBack/></button>
      <div style={{flex:1}}>
        <div style={{fontSize:18,fontWeight:700,color:DK}}>Редактировать</div>
        <div style={{fontSize:12,color:MU}}>{p.name}</div>
      </div>
    </div>
    <div className="scrl" style={{flex:1,padding:'4px 20px 8px',display:'flex',flexDirection:'column',gap:16}}>
      <div style={{display:'flex',justifyContent:'center',padding:'10px 0 6px'}}><Stamp p={{...p,cat:form.cat}} sz={78}/></div>
      <div><div className="sec-label">Название</div><input className="inp" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
      <div>
        <div className="sec-label">Категория</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:7}}>{CATS.map(c=><button key={c} className={'chip '+(form.cat===c?'on':'off')} onClick={()=>setForm({...form,cat:c})}>{c}</button>)}</div>
      </div>
      <div><div className="sec-label">Адрес</div><input className="inp" value={form.addr} onChange={e=>setForm({...form,addr:e.target.value})}/></div>
      <div><div className="sec-label">Описание</div><textarea className="inp" rows={3} style={{resize:'none',lineHeight:1.6}} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/></div>
      <div>
        <div className="sec-label">Штамп</div>
        <button onClick={()=>go(12,{newPlace:{...p,...form}})} style={{width:'100%',padding:'12px 16px',background:WH,border:'1.5px solid '+BD,borderRadius:12,cursor:'pointer',display:'flex',alignItems:'center',gap:12}}>
          <Stamp p={{...p,cat:form.cat}} sz={36}/>
          <span style={{flex:1,textAlign:'left',fontSize:14,color:DK,fontFamily:'Inter,sans-serif',fontWeight:500}}>Изменить дизайн штампа</span>
          <IcChev s={16} c={ML}/>
        </button>
      </div>
    </div>
    <div style={{flexShrink:0,padding:'12px 20px 32px',borderTop:'1px solid '+BD,background:WH,display:'flex',flexDirection:'column',gap:10}}>
      <button className="btn-p" onClick={()=>go(10)}>Сохранить изменения</button>
      <button className="btn-s" onClick={()=>go(10)}>Отмена</button>
    </div>
  </Shell></IOSDevice>;
}

// ── Export ───────────────────────────────────────────────────────────
Object.assign(window,{
  A,BG,DK,MU,ML,BD,WH,SB,PLACES,COLL,OWNED,
  Stamp,IcBack,IcChev,IcSearch,IcShare,IcCopy,IcPin,IcGrid,IcPers,IcChart,
  BNav,BNavOwner,QRMock,Shell,IcEdit,IcTrash,
  S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,S14,S15
});
