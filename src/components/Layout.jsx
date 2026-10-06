import {useState,useEffect} from 'react';import {Link,NavLink,Outlet,useLocation} from 'react-router-dom';
import {Menu,X,ShoppingBag,Send,Phone,MapPin} from 'lucide-react';import {BRAND} from '../config.js';import {useCart} from '../context/CartContext.jsx';
const links=[['/','Home'],['/shop','Shop'],['/collections','Collections'],['/about','About'],['/contact','Contact']];
export function Navbar(){
  const [open,setOpen]=useState(false);const {count}=useCart();
  return <header className="sticky top-0 z-40 bg-mist/95 backdrop-blur">
    <div className="bg-forest py-2 text-center text-xs text-white">Free delivery in Addis Ababa on orders over ETB 5,000 · Demo store</div>
    <div className="wrap flex h-16 items-center justify-between border-b border-ink/10">
      <button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
      <Link to="/" className="font-display text-xl font-extrabold tracking-[0.18em]">{BRAND.name}</Link>
      <nav className="hidden gap-8 text-sm font-medium md:flex">{links.map(([to,l])=><NavLink key={to} to={to} className={({isActive})=>`underline-offset-8 ${isActive?'underline':'hover:underline'}`}>{l}</NavLink>)}</nav>
      <Link to="/cart" className="relative" aria-label="Cart"><ShoppingBag/>{count>0&&<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold">{count}</span>}</Link>
    </div>
    {open&&<nav className="wrap flex flex-col gap-4 border-b border-ink/10 bg-mist py-5 md:hidden">{links.map(([to,l])=><Link key={to} to={to} onClick={()=>setOpen(false)} className="font-display text-2xl font-bold">{l}</Link>)}</nav>}
  </header>;
}
export function Footer(){
  return <footer className="mt-24 bg-ink text-white"><div className="wrap grid gap-10 py-14 md:grid-cols-4">
    <div className="md:col-span-2"><p className="font-display text-2xl font-extrabold tracking-[0.18em]">{BRAND.name}</p><p className="mt-3 max-w-sm text-sm text-white/60">{BRAND.tagline}. Demo website: all products, prices and reviews are fictional.</p></div>
    <div className="space-y-2 text-sm"><p className="font-semibold">Visit and contact</p><p className="flex gap-2 text-white/70"><MapPin size={16}/>{BRAND.location}</p><p className="flex gap-2 text-white/70"><Phone size={16}/>{BRAND.phone}</p><a className="flex gap-2 text-white/70 hover:text-gold" href={`https://t.me/${BRAND.telegram}`}><Send size={16}/>@{BRAND.telegram}</a></div>
    <div className="space-y-2 text-sm"><p className="font-semibold">Follow</p>{BRAND.socials.map(s=><a key={s.name} href={s.url} className="block text-white/70 hover:text-gold">{s.name}</a>)}</div>
  </div><p className="border-t border-white/10 py-4 text-center text-xs text-white/40">© {new Date().getFullYear()} {BRAND.name} · fictional demo</p></footer>;
}
export default function Layout(){const {pathname}=useLocation();useEffect(()=>window.scrollTo(0,0),[pathname]);return <><Navbar/><main><Outlet/></main><Footer/></>;}
