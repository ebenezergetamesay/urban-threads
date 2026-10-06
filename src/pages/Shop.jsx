import {useMemo,useState} from 'react';import {useSearchParams} from 'react-router-dom';import {SlidersHorizontal} from 'lucide-react';
import {PRODUCTS,CATEGORIES,COLOR_HEX} from '../data/products.js';import {Grid} from '../components/ProductCard.jsx';
const ALL_SIZES=[...new Set(PRODUCTS.flatMap(p=>p.sizes))];const toggle=(a,v)=>a.includes(v)?a.filter(x=>x!==v):[...a,v];
function Filters({s,set}){
  const chip=(on)=>`border px-3 py-1 text-xs ${on?'border-ink bg-ink text-white':'border-ink/20 bg-white'}`;
  return <div className="space-y-6">
    <input className="input" placeholder="Search products" value={s.q} onChange={e=>set({q:e.target.value})}/>
    <div><p className="mb-2 text-sm font-semibold">Category</p><div className="flex flex-wrap gap-2">{CATEGORIES.map(c=><button key={c} className={chip(s.cat===c)} onClick={()=>set({cat:s.cat===c?'':c})}>{c}</button>)}</div></div>
    <div><p className="mb-2 text-sm font-semibold">Size</p><div className="flex flex-wrap gap-2">{ALL_SIZES.map(z=><button key={z} className={chip(s.sizes.includes(z))} onClick={()=>set({sizes:toggle(s.sizes,z)})}>{z}</button>)}</div></div>
    <div><p className="mb-2 text-sm font-semibold">Color</p><div className="flex flex-wrap gap-2">{Object.entries(COLOR_HEX).map(([c,h])=><button key={c} title={c} aria-label={c} onClick={()=>set({colors:toggle(s.colors,c)})} className={`h-7 w-7 rounded-full border-2 ${s.colors.includes(c)?'border-gold ring-2 ring-ink':'border-ink/20'}`} style={{background:h}}/>)}</div></div>
    <div><p className="mb-2 text-sm font-semibold">Max price: ETB {s.max.toLocaleString()}</p><input type="range" min="500" max="9000" step="100" value={s.max} onChange={e=>set({max:+e.target.value})} className="w-full accent-forest"/></div>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.sale} onChange={e=>set({sale:e.target.checked})}/>On sale only</label>
  </div>;
}
export default function Shop(){
  const [qs]=useSearchParams();const [open,setOpen]=useState(false);
  const initialSort=['low','high'].includes(qs.get('sort'))?qs.get('sort'):'low';
  const [s,setS]=useState({q:'',cat:qs.get('cat')||'',sizes:[],colors:[],max:9000,sale:qs.get('sale')==='1',sort:initialSort});
  const set=o=>setS(v=>({...v,...o}));
  const list=useMemo(()=>{
    let l=PRODUCTS.filter(p=>(!s.q||p.name.toLowerCase().includes(s.q.toLowerCase()))&&(!s.cat||p.category===s.cat||p.gender===s.cat)&&(!s.sizes.length||s.sizes.some(z=>p.sizes.includes(z)))&&(!s.colors.length||s.colors.some(c=>p.colors.includes(c)))&&p.price<=s.max&&(!s.sale||p.onSale));
    const sortMap={low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price};
    const by=sortMap[s.sort]||sortMap.low;
    return [...l].sort(by);},[s]);
  return <div className="wrap py-10"><h1 className="text-4xl font-bold sm:text-5xl">Shop</h1>
    <div className="mt-6 flex items-center justify-between gap-3"><button className="btn-line lg:hidden" onClick={()=>setOpen(!open)}><SlidersHorizontal size={16}/>Filters</button><p className="hidden text-sm text-ink/60 lg:block">{list.length} products</p>
      <select className="input w-auto" value={s.sort} onChange={e=>set({sort:e.target.value})} aria-label="Sort"><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div>
    <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]"><aside className={`${open?'block':'hidden'} lg:block`}><Filters s={s} set={set}/></aside>
      {list.length?<Grid list={list}/>:<p className="py-20 text-center text-ink/60">No products match. Try removing a filter.</p>}</div></div>;
}
