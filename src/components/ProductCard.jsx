import {Link} from 'react-router-dom';import {COLOR_HEX,etb} from '../data/products.js';
export function ProductImage({p,big}){
  if(p.images?.[0])return <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" loading="lazy"/>;
  const bg=COLOR_HEX[p.tone]||'#999',dark=!['White','Sand'].includes(p.tone);
  return <div className="flex h-full w-full items-end p-4" style={{background:`linear-gradient(160deg,${bg},${bg}cc)`}} role="img" aria-label={p.name}>
    <span className={`font-display font-extrabold leading-none ${big?'text-5xl sm:text-7xl':'text-xl'} ${dark?'text-white/25':'text-ink/20'}`}>{p.category.toUpperCase()}</span></div>;
}
export default function ProductCard({p}){
  return <Link to={`/product/${p.id}`} className="group block">
    <div className="relative aspect-[4/5] overflow-hidden bg-stone">
      <div className="h-full transition duration-500 group-hover:scale-105"><ProductImage p={p}/></div>
      <div className="absolute left-2 top-2 flex flex-col items-start gap-1 text-[11px] font-semibold">
        {p.onSale&&<span className="bg-gold px-2 py-1">Sale</span>}{!p.inStock&&<span className="bg-white px-2 py-1">Sold out</span>}</div>
    </div>
    <h3 className="mt-3 text-sm font-semibold sm:text-base">{p.name}</h3>
    <p className="text-xs text-ink/60">{p.gender} · {p.category}</p>
    <p className="mt-1 text-sm"><span className="font-semibold">{etb(p.price)}</span>{p.oldPrice&&<s className="ml-2 text-ink/40">{etb(p.oldPrice)}</s>}</p>
    <div className="mt-2 flex gap-1">{p.colors.map(c=><span key={c} title={c} className="h-3 w-3 rounded-full border border-ink/20" style={{background:COLOR_HEX[c]}}/>)}</div>
  </Link>;
}
export const Grid=({list})=><div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">{list.map(p=><ProductCard key={p.id} p={p}/>)}</div>;
