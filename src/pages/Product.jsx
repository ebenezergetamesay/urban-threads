import {useState} from 'react';import {Link,useParams} from 'react-router-dom';import {Send,Minus,Plus,Check} from 'lucide-react';
import {PRODUCTS,COLOR_HEX,etb} from '../data/products.js';import {Grid,ProductImage} from '../components/ProductCard.jsx';import {useCart} from '../context/CartContext.jsx';import {BRAND} from '../config.js';
export default function Product(){
  const {id}=useParams();const p=PRODUCTS.find(x=>x.id===+id);const {dispatch}=useCart();
  const [size,setSize]=useState('');const [color,setColor]=useState(p?.colors[0]);const [qty,setQty]=useState(1);const [added,setAdded]=useState(false);const [err,setErr]=useState('');
  if(!p)return <div className="wrap py-24"><p>Product not found.</p><Link to="/shop" className="underline">Back to shop</Link></div>;
  const chosen=size||(p.sizes.length===1?p.sizes[0]:'');
  const need=()=>{if(!chosen){setErr('Please select a size.');return false}setErr('');return true};
  const add=()=>{if(!need())return;dispatch({type:'add',item:{id:p.id,name:p.name,price:p.price,size:chosen,color,qty,tone:color}});setAdded(true);setTimeout(()=>setAdded(false),1800)};
  const msg=`Hello ${BRAND.name}! I want to order:\n${p.name}\nSize: ${chosen}\nColor: ${color}\nQty: ${qty}\nPrice: ${etb(p.price*qty)}`;
  const related=PRODUCTS.filter(x=>x.category===p.category&&x.id!==p.id).concat(PRODUCTS.filter(x=>x.gender===p.gender&&x.category!==p.category)).slice(0,4);
  return <div className="wrap py-8"><Link to="/shop" className="text-sm underline">← Back to shop</Link>
    <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-14">
      <div className="grid gap-3"><div className="aspect-[4/5]"><ProductImage p={{...p,tone:color}} big/></div>
        <div className="grid grid-cols-3 gap-3">{p.colors.slice(0,3).map(c=><button key={c} onClick={()=>setColor(c)} className="aspect-square" aria-label={c}><ProductImage p={{...p,tone:c}}/></button>)}</div></div>
      <div><p className="text-sm text-ink/60">{p.gender} · {p.category}</p><h1 className="mt-1 text-4xl font-bold">{p.name}</h1>
        <p className="mt-3 text-2xl font-semibold">{etb(p.price)}{p.oldPrice&&<s className="ml-3 text-base font-normal text-ink/40">{etb(p.oldPrice)}</s>}</p>
        <p className={`mt-2 text-sm ${p.inStock?'text-forest':'text-red-700'}`}>{p.inStock?(p.stock<=5?`Only ${p.stock} left`:'In stock'):'Out of stock'}</p>
        <p className="mt-5 max-w-prose text-ink/70">{p.description}</p>
        <p className="mt-6 text-sm font-semibold">Color: {color}</p><div className="mt-2 flex gap-2">{p.colors.map(c=><button key={c} aria-label={c} onClick={()=>setColor(c)} className={`h-9 w-9 rounded-full border-2 ${c===color?'border-gold ring-2 ring-ink':'border-ink/20'}`} style={{background:COLOR_HEX[c]}}/>)}</div>
        <p className="mt-6 text-sm font-semibold">Size</p><div className="mt-2 flex flex-wrap gap-2">{p.sizes.map(z=><button key={z} onClick={()=>{setSize(z);setErr('')}} className={`min-w-12 border px-4 py-2 text-sm ${chosen===z?'border-ink bg-ink text-white':'border-ink/25 bg-white'}`}>{z}</button>)}</div>
        {err&&<p className="mt-2 text-sm text-red-700">{err}</p>}
        <div className="mt-6 inline-flex items-center border border-ink/25 bg-white"><button className="p-3" onClick={()=>setQty(Math.max(1,qty-1))} aria-label="Less"><Minus size={16}/></button><span className="w-10 text-center">{qty}</span><button className="p-3" onClick={()=>setQty(qty+1)} aria-label="More"><Plus size={16}/></button></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2"><button disabled={!p.inStock} onClick={add} className="btn-dark disabled:opacity-40">{added?<><Check size={16}/>Added to cart</>:'Add to cart'}</button>
          <a onClick={e=>{if(!need()||!p.inStock)e.preventDefault()}} href={`https://t.me/${BRAND.telegram}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer" className="btn-line"><Send size={16}/>Order on Telegram</a></div></div></div>
    <h2 className="mb-6 mt-20 text-3xl font-bold">You may also like</h2><Grid list={related}/></div>;
}
