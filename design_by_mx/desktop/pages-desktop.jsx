// Чекин Desktop — Pages
const {useState:uS} = React;

// ════ AUTH ════════════════════════════════════════════════════════════
function DAuth({go}){
  const [tab,setTab]=uS('in');
  const [role,setRole]=uS('guest');
  return <div className="dauth fade">
    {/* Brand panel */}
    <div className="dauth-brand">
      <div className="dauth-brand-in">
        <Wordmark/>
        <h1 className="dauth-h">Цифровая книга<br/>штампов</h1>
        <p className="dauth-p">Собирайте отметки мест, которые вам важны. Каждое место — свой уникальный штамп.</p>
        <div className="dauth-stamps">
          {PLACES.map(p=><div key={p.id} className="dauth-stamp"><Stamp p={p} sz={66}/></div>)}
        </div>
      </div>
    </div>
    {/* Form panel */}
    <div className="dauth-form">
      <div className="dauth-form-in">
        <div style={{fontSize:26,fontWeight:700,color:DK,marginBottom:6}}>{tab==='in'?'Вход в Чекин':'Создать аккаунт'}</div>
        <div style={{fontSize:15,color:MU,marginBottom:28}}>{tab==='in'?'Рады видеть вас снова':'Несколько штампов уже ждут вас'}</div>
        {/* role */}
        <div className="dlabel">Я хочу войти как</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:22}}>
          {[['guest','Гость','Собираю штампы'],['owner','Владелец','Управляю местами']].map(([r,t,s])=>(
            <button key={r} onClick={()=>setRole(r)} className="dauth-role" style={{
              borderColor:role===r?A:BD,background:role===r?'rgba(196,81,58,.05)':WH,
            }}>
              <div style={{fontSize:15,fontWeight:600,color:DK}}>{t}</div>
              <div style={{fontSize:12,color:MU,marginTop:3}}>{s}</div>
            </button>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:22}}>
          {tab==='up'&&<input className="dinput" placeholder="Ник (@username)"/>}
          <input className="dinput" type="email" placeholder="Email"/>
          <input className="dinput" type="password" placeholder="Пароль"/>
        </div>
        <button className="dbtn full" onClick={()=>go(role==='owner'?'dashboard':'places',{role})}>
          {tab==='in'?'Войти':'Зарегистрироваться'}
        </button>
        <div style={{textAlign:'center',marginTop:18,fontSize:14,color:MU}}>
          {tab==='in'?'Нет аккаунта? ':'Уже есть аккаунт? '}
          <span style={{color:A,fontWeight:600,cursor:'pointer'}} onClick={()=>setTab(tab==='in'?'up':'in')}>{tab==='in'?'Регистрация':'Войти'}</span>
        </div>
      </div>
    </div>
  </div>;
}

// ════ PLACES (guest grid) ═════════════════════════════════════════════
function DPlaces({go}){
  const [chip,setChip]=uS('Все');
  const [q,setQ]=uS('');
  const cats=['Все','Кафе','Книги','Культура','Бар','Парк','Галерея'];
  let list=chip==='Все'?PLACES:PLACES.filter(p=>p.cat===chip);
  if(q)list=list.filter(p=>p.name.toLowerCase().includes(q.toLowerCase()));
  return <Page role="guest" active="places" go={go}>
    <div className="fade">
      <div className="dhead">
        <div>
          <div className="dh-title">Места</div>
          <div className="dh-sub">{PLACES.length} мест собирают штампы рядом с вами</div>
        </div>
        <div className="dsearch"><IcSearch/><input className="dinput" placeholder="Поиск мест" value={q} onChange={e=>setQ(e.target.value)}/></div>
      </div>
      <div style={{marginBottom:24}}><Chips items={cats} value={chip} onChange={setChip}/></div>
      <div className="dgrid">
        {list.map(p=><PlaceCard key={p.id} p={p} onClick={()=>go('place',{place:p})}/>)}
      </div>
      {list.length===0&&<div style={{padding:'60px 0',textAlign:'center',color:MU,fontSize:15}}>Ничего не найдено</div>}
    </div>
  </Page>;
}

// ════ PLACE DETAIL ════════════════════════════════════════════════════
function DPlace({go,place}){
  const p=place||PLACES[0];
  return <Page role="guest" active="places" go={go}>
    <div className="fade">
      <button className="dback" onClick={()=>go('places')}>← Все места</button>
      <div className="ddetail">
        <div className="ddetail-aside">
          <div className="dpanel" style={{padding:'40px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:24}}>
            <Stamp p={p} sz={210}/>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 18px',background:BG,borderRadius:30}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:p.color}}/>
              <span style={{fontSize:14,color:MU}}>{p.n} штампов поставлено</span>
            </div>
          </div>
        </div>
        <div className="ddetail-main">
          <span className="dbadge" style={{marginBottom:16}}>{p.cat}</span>
          <h1 style={{fontSize:38,fontWeight:700,color:DK,letterSpacing:'-.01em',marginBottom:12}}>{p.name}</h1>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:28}}>
            <IcPin s={18} c={MU}/><span style={{fontSize:16,color:MU}}>{p.addr}</span>
          </div>
          <p style={{fontSize:18,lineHeight:1.7,color:DK,marginBottom:36,maxWidth:560}}>{p.desc}</p>
          <div className="dpanel" style={{padding:24,maxWidth:560,marginBottom:28}}>
            <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
              <div style={{flexShrink:0,marginTop:2}}><QRMock size={64} color={p.color}/></div>
              <div>
                <div style={{fontSize:15,fontWeight:600,color:DK,marginBottom:4}}>Как получить штамп</div>
                <div style={{fontSize:14,color:MU,lineHeight:1.6}}>Отсканируйте QR-код в заведении через мобильное приложение Чекин, чтобы добавить штамп в коллекцию.</div>
              </div>
            </div>
          </div>
          <button className="dbtn" onClick={()=>go('confirm',{place:p})}>Получить штамп</button>
        </div>
      </div>
    </div>
  </Page>;
}

// ════ STAMP CONFIRM ═══════════════════════════════════════════════════
function DConfirm({go,place}){
  const p=place||PLACES[0];
  const d=new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
  return <Page role="guest" active="places" go={go}>
    <div className="fade" style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',padding:'40px 0 20px'}}>
      <div style={{fontSize:14,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:A,marginBottom:28}}>Новый штамп получен</div>
      <div className="stamp-anim" style={{marginBottom:32}}><Stamp p={p} sz={240}/></div>
      <h1 style={{fontSize:34,fontWeight:700,color:DK,marginBottom:8}}>{p.name}</h1>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:40}}>
        <span className="dbadge">{p.cat}</span>
        <span style={{color:ML}}>·</span>
        <span style={{fontSize:15,color:MU}}>{d}</span>
      </div>
      <div style={{display:'flex',gap:12}}>
        <button className="dbtn" onClick={()=>go('collection')}>В коллекцию</button>
        <button className="dbtn-ghost" onClick={()=>go('places')}>К местам</button>
      </div>
    </div>
  </Page>;
}

// ════ COLLECTION ══════════════════════════════════════════════════════
function DCollection({go}){
  return <Page role="guest" active="collection" go={go}>
    <div className="fade">
      <div className="dhead">
        <div>
          <div className="dh-title">Коллекция</div>
          <div className="dh-sub">{COLL.length} штампа собрано · ещё {PLACES.length-COLL.length} мест ждут вас</div>
        </div>
        <button className="dbtn-ghost" onClick={()=>go('places')}>Найти места</button>
      </div>
      <div className="dgrid">
        {COLL.map((item,i)=>(
          <button key={i} className="dcard" style={{padding:28,display:'flex',flexDirection:'column',alignItems:'center',gap:18,cursor:'pointer'}} onClick={()=>go('card',{stamp:item})}>
            <Stamp p={item} sz={130}/>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:17,fontWeight:600,color:DK,marginBottom:6}}>{item.name}</div>
              <div style={{fontSize:13,color:MU}}>{item.date}</div>
            </div>
          </button>
        ))}
        {/* Locked teaser */}
        {PLACES.filter(p=>!COLL.find(c=>c.id===p.id)).slice(0,2).map(p=>(
          <button key={'l'+p.id} className="dcard" style={{padding:28,display:'flex',flexDirection:'column',alignItems:'center',gap:18,cursor:'pointer',borderStyle:'dashed',background:'transparent',boxShadow:'none'}} onClick={()=>go('place',{place:p})}>
            <div style={{opacity:.2}}><Stamp p={p} sz={130}/></div>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:15,fontWeight:500,color:MU,marginBottom:6}}>{p.name}</div>
              <div style={{fontSize:13,color:ML}}>Ещё не получен</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </Page>;
}

// ════ STAMP CARD ══════════════════════════════════════════════════════
function DCard({go,stamp}){
  const p=stamp||COLL[0];
  const [done,setDone]=uS(false);
  return <Page role="guest" active="collection" go={go}>
    <div className="fade">
      <button className="dback" onClick={()=>go('collection')}>← Коллекция</button>
      <div className="ddetail">
        <div className="ddetail-aside">
          <div className="dpanel" style={{padding:'48px 32px',display:'flex',justifyContent:'center'}}>
            <Stamp p={p} sz={230}/>
          </div>
        </div>
        <div className="ddetail-main" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <span className="dbadge" style={{marginBottom:16,alignSelf:'flex-start'}}>{p.cat}</span>
          <h1 style={{fontSize:38,fontWeight:700,color:DK,marginBottom:16}}>{p.name}</h1>
          <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:36}}>
            <div style={{display:'flex',alignItems:'center',gap:10,fontSize:16,color:MU}}><IcPin s={17} c={MU}/>{p.addr}</div>
            <div style={{display:'flex',alignItems:'center',gap:10,fontSize:16,color:MU}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={MU} strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Получен {p.date}
            </div>
          </div>
          <div style={{display:'flex',gap:12}}>
            <button className="dbtn" onClick={()=>{setDone(true);setTimeout(()=>setDone(false),2200);}}><IcShare/>{done?'✓ Ссылка скопирована':'Поделиться'}</button>
            <button className="dbtn-ghost" onClick={()=>go('place',{place:p})}>О месте</button>
          </div>
        </div>
      </div>
    </div>
  </Page>;
}

// ════ PROFILE ═════════════════════════════════════════════════════════
function DProfile({go,role}){
  const [copied,setCopied]=uS(false);
  return <Page role={role||'guest'} active="profile" go={go}>
    <div className="fade" style={{maxWidth:720,margin:'0 auto'}}>
      <div className="dpanel" style={{padding:'40px',display:'flex',alignItems:'center',gap:28,marginBottom:24}}>
        <div style={{width:88,height:88,borderRadius:'50%',background:DK,display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,fontWeight:700,color:BG,flexShrink:0}}>АЛ</div>
        <div style={{flex:1}}>
          <div style={{fontSize:26,fontWeight:700,color:DK,marginBottom:6}}>@aleksei</div>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'7px 16px',background:BG,borderRadius:30}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:A}}/>
            <span style={{fontSize:14,fontWeight:600,color:DK}}>{COLL.length} штампа</span>
          </div>
        </div>
        <button className="dbtn-ghost" onClick={()=>go('auth')}>Выйти</button>
      </div>
      <div className="dpanel" style={{padding:'28px 32px',marginBottom:24}}>
        <div className="dlabel">Реферальная ссылка</div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{flex:1,fontSize:15,color:MU,fontFamily:'monospace',padding:'12px 16px',background:BG,borderRadius:10,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>checkin.app/ref/aleksei24</span>
          <button className="dbtn-ghost" style={{padding:'12px 18px',color:A,borderColor:A}} onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)}}><IcCopy/>{copied?'Скопировано':'Скопировать'}</button>
        </div>
        <div style={{fontSize:13,color:ML,marginTop:12}}>Приглашайте друзей — за каждого получите особый штамп.</div>
      </div>
      {role!=='owner'&&(
        <div className="dpanel" style={{padding:'28px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:DK,marginBottom:4}}>У вас есть заведение?</div>
            <div style={{fontSize:14,color:MU}}>Создайте штамп и привлекайте гостей.</div>
          </div>
          <button className="dbtn-sm" onClick={()=>go('dashboard',{role:'owner'})}>Кабинет владельца</button>
        </div>
      )}
    </div>
  </Page>;
}

// ════ OWNER: DASHBOARD ════════════════════════════════════════════════
function DDashboard({go}){
  const [del,setDel]=uS(null);
  const total=OWNED.reduce((s,p)=>s+p.n,0);
  return <Page role="owner" active="dashboard" go={go}>
    {del&&(
      <div className="dmodal-bg" onClick={()=>setDel(null)}>
        <div className="dmodal" onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:700,color:DK,marginBottom:8}}>Удалить место?</div>
          <div style={{fontSize:15,color:MU,lineHeight:1.6,marginBottom:28}}>«{del.name}» будет удалено вместе со всеми данными и штампами гостей. Это действие нельзя отменить.</div>
          <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
            <button className="dbtn-ghost" onClick={()=>setDel(null)}>Отмена</button>
            <button className="dbtn-danger" onClick={()=>setDel(null)}>Удалить</button>
          </div>
        </div>
      </div>
    )}
    <div className="fade">
      <div className="dhead">
        <div>
          <div className="dh-title">Мои места</div>
          <div className="dh-sub">{OWNED.length} места · {total} штампов всего</div>
        </div>
        <button className="dbtn" onClick={()=>go('add')}><IcPlus/>Добавить место</button>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {OWNED.map(p=>(
          <div key={p.id} className="dpanel downed">
            <div style={{flexShrink:0,cursor:'pointer'}} onClick={()=>go('analytics',{ownerPlace:p})}><Stamp p={p} sz={76}/></div>
            <div style={{flex:1,minWidth:0,cursor:'pointer'}} onClick={()=>go('analytics',{ownerPlace:p})}>
              <div style={{fontSize:19,fontWeight:600,color:DK,marginBottom:6}}>{p.name}</div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10,fontSize:14,color:MU}}><IcPin s={14} c={MU}/>{p.addr}</div>
              <span className="dbadge">{p.cat}</span>
            </div>
            <div className="downed-stats">
              <div><div className="dstat-val" style={{fontSize:26}}>{p.n}</div><div style={{fontSize:13,color:MU}}>всего</div></div>
              <div><div className="dstat-val" style={{fontSize:26,color:A}}>+12</div><div style={{fontSize:13,color:MU}}>сегодня</div></div>
            </div>
            <div style={{flexShrink:0}}><QRMock size={64} color={p.color}/></div>
            <div style={{display:'flex',flexDirection:'column',gap:8,flexShrink:0}}>
              <button className="dicon-btn" title="QR-код" onClick={()=>go('qr',{ownerPlace:p})}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MU} strokeWidth="1.75"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><line x1="14" y1="14" x2="14" y2="21"/><line x1="18" y1="14" x2="21" y2="14"/><line x1="18" y1="18" x2="21" y2="21"/></svg>
              </button>
              <button className="dicon-btn" title="Редактировать" onClick={()=>go('edit',{ownerPlace:p})}><IcEdit/></button>
              <button className="dicon-btn danger" title="Удалить" onClick={()=>setDel(p)}><IcTrash c="#C0392B"/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Page>;
}

// ════ OWNER: ADD / EDIT (form) ════════════════════════════════════════
function PlaceForm({go,initial,isEdit}){
  const base=initial||{name:'',cat:'Кафе',addr:'',desc:'',color:'#C4513A',shape:'circle'};
  const [form,setForm]=uS({name:base.name,cat:base.cat,addr:base.addr,desc:base.desc||''});
  const cats=['Кафе','Книги','Культура','Бар','Парк','Галерея'];
  const preview={...base,...form};
  return <Page role="owner" active="dashboard" go={go}>
    <div className="fade">
      <button className="dback" onClick={()=>go('dashboard')}>← Мои места</button>
      <div className="dhead"><div><div className="dh-title">{isEdit?'Редактировать место':'Новое место'}</div><div className="dh-sub">{isEdit?base.name:'Шаг 1 из 2 — данные о месте'}</div></div></div>
      <div className="dform">
        <div className="dform-fields">
          <div><label className="dlabel">Название</label><input className="dinput" placeholder="Название вашего места" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
          <div><label className="dlabel">Категория</label><Chips items={cats} value={form.cat} onChange={c=>setForm({...form,cat:c})}/></div>
          <div><label className="dlabel">Адрес</label><input className="dinput" placeholder="ул. Примерная, 1" value={form.addr} onChange={e=>setForm({...form,addr:e.target.value})}/></div>
          <div><label className="dlabel">Описание</label><textarea className="dinput" rows={4} placeholder="Расскажите гостям о месте..." value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/></div>
          <div style={{display:'flex',gap:12,marginTop:8}}>
            {isEdit
              ? <><button className="dbtn" onClick={()=>go('dashboard')}>Сохранить изменения</button><button className="dbtn-ghost" onClick={()=>go('design',{newPlace:preview})}>Изменить штамп</button></>
              : <button className="dbtn" onClick={()=>go('design',{newPlace:preview})}>Далее — дизайн штампа →</button>}
          </div>
        </div>
        <aside className="dform-preview">
          <div className="dlabel">Превью карточки</div>
          <div className="dpanel" style={{padding:20,display:'flex',alignItems:'center',gap:16}}>
            <Stamp p={preview} sz={72}/>
            <div style={{minWidth:0}}>
              <div style={{fontSize:16,fontWeight:600,color:DK,marginBottom:5}}>{form.name||'Название места'}</div>
              <div style={{fontSize:13,color:MU,marginBottom:8}}>{form.addr||'Адрес'}</div>
              <span className="dbadge">{form.cat}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </Page>;
}
function DAdd({go,newPlace}){return <PlaceForm go={go} initial={newPlace} isEdit={false}/>;}
function DEdit({go,ownerPlace}){return <PlaceForm go={go} initial={ownerPlace||OWNED[0]} isEdit={true}/>;}

// ════ OWNER: STAMP DESIGNER ═══════════════════════════════════════════
function DDesign({go,newPlace}){
  const shapes=['circle','octagon','square','ring','hex','diamond'];
  const colors=['#C4513A','#2B4570','#3A6B4A','#7B2D42','#445566','#5B3D7A'];
  const [shape,setShape]=uS((newPlace&&newPlace.shape)||'circle');
  const [color,setColor]=uS((newPlace&&newPlace.color)||'#C4513A');
  const prev={id:'p',name:(newPlace&&newPlace.name)||'Ваш штамп',cat:(newPlace&&newPlace.cat)||'Место',color,shape};
  return <Page role="owner" active="dashboard" go={go}>
    <div className="fade">
      <button className="dback" onClick={()=>go('add',{newPlace:{...newPlace,color,shape}})}>← Данные места</button>
      <div className="dhead"><div><div className="dh-title">Дизайн штампа</div><div className="dh-sub">Шаг 2 из 2 — выберите форму и цвет</div></div></div>
      <div className="dform">
        <div className="dform-fields">
          <div>
            <label className="dlabel">Форма</label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
              {shapes.map(s=>(
                <button key={s} onClick={()=>setShape(s)} style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'18px 0',borderRadius:14,cursor:'pointer',background:shape===s?color+'14':WH,border:shape===s?'2px solid '+color:'2px solid '+BD,transition:'all .15s'}}>
                  <Stamp p={{...prev,shape:s}} sz={56}/>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="dlabel">Цвет</label>
            <div style={{display:'flex',gap:14}}>
              {colors.map(col=>(
                <button key={col} onClick={()=>setColor(col)} style={{width:44,height:44,borderRadius:'50%',background:col,cursor:'pointer',border:'none',boxShadow:color===col?'0 0 0 3px '+WH+', 0 0 0 5.5px '+col:'none',transition:'box-shadow .15s'}}/>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:12,marginTop:8}}>
            <button className="dbtn" onClick={()=>go('qr',{newPlace:{...prev,...(newPlace||{}),color,shape}})}>Создать место и QR-код</button>
          </div>
        </div>
        <aside className="dform-preview">
          <div className="dlabel">Превью штампа</div>
          <div className="dpanel" style={{padding:'40px 24px',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
            <Stamp p={prev} sz={150}/>
            <div style={{fontSize:15,fontWeight:600,color:DK}}>{prev.name}</div>
          </div>
        </aside>
      </div>
    </div>
  </Page>;
}

// ════ OWNER: QR CODE ══════════════════════════════════════════════════
function DQR({go,newPlace,ownerPlace}){
  const p=ownerPlace||newPlace||OWNED[0];
  const isNew=!!newPlace&&!ownerPlace;
  return <Page role="owner" active="dashboard" go={go}>
    <div className="fade" style={{maxWidth:560,margin:'0 auto',textAlign:'center'}}>
      {isNew&&(
        <div style={{marginBottom:28}}>
          <div style={{width:56,height:56,borderRadius:'50%',background:'#3A6B4A',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={WH} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{fontSize:26,fontWeight:700,color:DK,marginBottom:6}}>Место создано!</div>
          <div style={{fontSize:15,color:MU}}>Распечатайте QR-код и разместите его в заведении</div>
        </div>
      )}
      {!isNew&&<button className="dback" style={{margin:'0 auto 20px'}} onClick={()=>go('dashboard')}>← Мои места</button>}
      <div className="dpanel" style={{padding:40,display:'inline-block',marginBottom:28}}>
        <QRMock size={220} color={p.color||DK}/>
        <div style={{marginTop:18,fontSize:18,fontWeight:700,color:DK}}>{p.name}</div>
        <div style={{fontSize:13,color:MU,marginTop:4,fontFamily:'monospace'}}>checkin.app/place/{p.id||'new'}</div>
      </div>
      <div style={{display:'flex',gap:12,justifyContent:'center'}}>
        <button className="dbtn"><IcDownload/>Скачать PDF</button>
        <button className="dbtn-ghost" onClick={()=>go('dashboard')}>{isNew?'К моим местам':'Готово'}</button>
      </div>
    </div>
  </Page>;
}

// ════ OWNER: ANALYTICS ════════════════════════════════════════════════
function DAnalytics({go,ownerPlace}){
  const init=ownerPlace?Math.max(0,OWNED.findIndex(p=>p.id===ownerPlace.id)):0;
  const [sel,setSel]=uS(init);
  const p=OWNED[sel]||OWNED[0];
  const BARS=[{d:'Пн',v:8},{d:'Вт',v:15},{d:'Ср',v:12},{d:'Чт',v:24},{d:'Пт',v:31},{d:'Сб',v:47},{d:'Вс',v:28}];
  const mx=Math.max(...BARS.map(b=>b.v));
  const RECENT=[{u:'@marina_s',t:'сейчас'},{u:'@pavel_k',t:'2 мин назад'},{u:'@lena_art',t:'7 мин назад'},{u:'@igor_m',t:'15 мин назад'},{u:'@sonya_t',t:'23 мин назад'},{u:'@dmitry_v',t:'34 мин назад'}];
  return <Page role="owner" active="analytics" go={go}>
    <div className="fade">
      <div className="dhead"><div><div className="dh-title">Аналитика</div><div className="dh-sub">Статистика по вашим местам</div></div></div>
      <div style={{marginBottom:28}}>
        <Chips items={OWNED.map(o=>o.name)} value={p.name} onChange={n=>setSel(OWNED.findIndex(o=>o.name===n))}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16,marginBottom:24}}>
        {[{l:'Всего штампов',v:p.n},{l:'Сегодня',v:12},{l:'За неделю',v:165},{l:'Уникальных гостей',v:284}].map(s=>(
          <div key={s.l} className="dstat"><div className="dstat-val">{s.v}</div><div className="dstat-lbl">{s.l}</div></div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:24,alignItems:'start'}} className="danalytics-grid">
        {/* Chart */}
        <div className="dpanel" style={{padding:28}}>
          <div style={{fontSize:16,fontWeight:600,color:DK,marginBottom:4}}>Активность за неделю</div>
          <div style={{fontSize:13,color:MU,marginBottom:28}}>Штампов в день</div>
          <div style={{display:'flex',alignItems:'flex-end',gap:14,height:200}}>
            {BARS.map((b,i)=>(
              <div key={b.d} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:10,height:'100%',justifyContent:'flex-end'}}>
                <div style={{fontSize:13,fontWeight:600,color:i===5?p.color:MU}}>{b.v}</div>
                <div style={{width:'100%',borderRadius:'6px 6px 0 0',background:i===5?p.color:p.color+'44',height:(b.v/mx*100)+'%',minHeight:6,transition:'height .3s'}}/>
                <span style={{fontSize:13,color:MU}}>{b.d}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Recent */}
        <div className="dpanel" style={{padding:'28px 0 8px'}}>
          <div style={{fontSize:16,fontWeight:600,color:DK,padding:'0 28px',marginBottom:18}}>Последние штампы</div>
          {RECENT.map((r,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 28px',borderTop:i?'1px solid '+BD:'none'}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:p.color+'1f',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:p.color,flexShrink:0}}>{r.u[1].toUpperCase()}</div>
              <div style={{flex:1,fontSize:15,fontWeight:500,color:DK}}>{r.u}</div>
              <span style={{fontSize:13,color:ML,whiteSpace:'nowrap'}}>{r.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Page>;
}

Object.assign(window,{
  DAuth,DPlaces,DPlace,DConfirm,DCollection,DCard,DProfile,
  DDashboard,DAdd,DEdit,DDesign,DQR,DAnalytics,
});
