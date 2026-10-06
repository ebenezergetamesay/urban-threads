import {useState} from 'react';import {Link} from 'react-router-dom';import {Trash2,Minus,Plus,Send} from 'lucide-react';
import {useCart,lineKey} from '../context/CartContext.jsx';import {etb} from '../data/products.js';import {BRAND} from '../config.js';import {ProductImage} from '../components/ProductCard.jsx';import {Payments} from '../components/Blocks.jsx';
export default function Cart(){
  const {items,dispatch,subtotal}=useCart();const [f,setF]=useState({name:'',phone:'',method:'Pickup',address:'',notes:''});const [err,setErr]=useState('');
  const delivery=f.method==='Delivery'&&subtotal<5000&&subtotal>0?200:0;const total=subtotal+delivery;
  const set=k=>e=>setF({...f,[k]:e.target.value});
  const message=()=>[`New order — ${BRAND.name}`,`Name: ${f.name}`,`Phone: ${f.phone}`,'',...items.map((l,i)=>`${i+1}. ${l.name} | Size ${l.size} | ${l.color} | x${l.qty} | ${etb(l.price*l.qty)}`),'',`Subtotal: ${etb(subtotal)}`,delivery?`Delivery: ${etb(delivery)}`:null,`Total: ${etb(total)}`,`Method: ${f.method}`,f.method==='Delivery'?`Address: ${f.address}`:null,f.notes?`Notes: ${f.notes}`:null].filter(x=>x!==null).join('\n');
  const send=e=>{e.preventDefault();if(!f.name||!f.phone||(f.method==='Delivery'&&!f.address)){setErr('Please fill in your name, phone number'+(f.method==='Delivery'?' and delivery address.':'.'));return}setErr('');window.open(`https://t.me/${BRAND.telegram}?text=${encodeURIComponent(message())}`,'_blank')};
  if(!items.length)return <div className="wrap py-24 text-center"><h1 className="text-4xl font-bold">Your cart is empty</h1><Link to="/shop" className="btn-dark mt-6">Continue shopping</Link></div>;
  return <div className="wrap py-10"><h1 className="text-4xl font-bold sm:text-5xl">Cart</h1>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_420px]"><div className="divide-y divide-ink/10">{items.map(l=>{const k=lineKey(l);return <div key={k} className="flex gap-4 py-4"><div className="h-28 w-24 shrink-0"><ProductImage p={{...l,category:'',tone:l.color}}/></div>
      <div className="flex-1"><p className="font-semibold">{l.name}</p><p className="text-sm text-ink/60">Size {l.size} · {l.color}</p><p className="mt-1 text-sm">{etb(l.price)}</p>
        <div className="mt-3 inline-flex items-center border border-ink/25 bg-white"><button className="p-2" aria-label="Less" onClick={()=>dispatch({type:'qty',key:k,d:-1})}><Minus size={14}/></button><span className="w-8 text-center text-sm">{l.qty}</span><button className="p-2" aria-label="More" onClick={()=>dispatch({type:'qty',key:k,d:1})}><Plus size={14}/></button></div></div>
      <div className="flex flex-col items-end justify-between"><button onClick={()=>dispatch({type:'remove',key:k})} aria-label="Remove"><Trash2 size={18}/></button><p className="font-semibold">{etb(l.price*l.qty)}</p></div></div>})}
      <div className="pt-4"><Link to="/shop" className="text-sm underline">Continue shopping</Link></div></div>
    <form onSubmit={send} className="space-y-4 bg-white p-6"><h2 className="text-2xl font-bold">Order details</h2>
      <input className="input" placeholder="Full name" value={f.name} onChange={set('name')}/><input className="input" placeholder="Phone number" value={f.phone} onChange={set('phone')}/>
      <div className="grid grid-cols-2 gap-2">{['Pickup','Delivery'].map(m=><button type="button" key={m} onClick={()=>setF({...f,method:m})} className={`border py-3 text-sm ${f.method===m?'border-ink bg-ink text-white':'border-ink/25'}`}>{m}</button>)}</div>
      {f.method==='Delivery'&&<input className="input" placeholder="Delivery address" value={f.address} onChange={set('address')}/>}
      <textarea className="input" rows="3" placeholder="Additional notes" value={f.notes} onChange={set('notes')}/>
      <div className="space-y-1 border-t border-ink/10 pt-4 text-sm"><p className="flex justify-between"><span>Subtotal</span>{etb(subtotal)}</p><p className="flex justify-between"><span>Delivery (free over ETB 5,000)</span>{f.method==='Delivery'?etb(delivery):'—'}</p><p className="flex justify-between text-lg font-bold"><span>Total</span>{etb(total)}</p></div>
      {err&&<p className="text-sm text-red-700">{err}</p>}
      <button className="btn-dark w-full"><Send size={16}/>Send order on Telegram</button>
      <details className="text-xs text-ink/60"><summary className="cursor-pointer">Preview order message</summary><pre className="mt-2 whitespace-pre-wrap">{message()}</pre></details></form></div>
    <h2 className="mb-4 mt-16 text-2xl font-bold">Payment after confirmation</h2><Payments/></div>;
}
