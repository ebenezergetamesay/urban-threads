import {Link} from 'react-router-dom';import {MapPin,Clock,Send,Wallet} from 'lucide-react';import {BRAND} from '../config.js';
const googleMapsUrl = BRAND.googleMapsUrl || (BRAND.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.location)}` : '#');
export const Section=({title,link,to,children,className=''})=><section className={`wrap mt-20 ${className}`}>
  <div className="mb-6 flex items-end justify-between"><h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>{link&&<Link to={to} className="text-sm font-semibold underline underline-offset-4">{link}</Link>}</div>{children}</section>;
export const Payments=()=><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{BRAND.payments.map(p=><div key={p.name} className="border border-ink/15 bg-white p-4"><Wallet size={18} className="text-forest"/><p className="mt-2 font-semibold">{p.name}</p><p className="text-xs text-ink/60">{p.note}</p></div>)}
  <p className="text-xs text-ink/50 sm:col-span-2 lg:col-span-4">Demo only: no payments are processed on this site. Customers pay after confirming their order on Telegram.</p></div>;
export const Location=()=><div className="grid gap-6 md:grid-cols-2">
  <div className="space-y-3 text-sm"><p className="flex gap-2 font-semibold"><MapPin size={18}/>{BRAND.location}</p><p className="flex gap-2"><Clock size={18}/><span>{BRAND.hours.map(h=><span key={h} className="block">{h}</span>)}</span></p>
    <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold underline">View on Google Maps</a></div>
  {BRAND.mapEmbedUrl?<iframe title="Map" src={BRAND.mapEmbedUrl} className="h-64 w-full border-0" loading="lazy"/>
  :<div className="flex h-64 items-center justify-center border-2 border-dashed border-ink/25 bg-stone p-6 text-center text-sm text-ink/60">MAP PLACEHOLDER<br/>Insert the real client's Google Maps embed link in src/config.js (mapEmbedUrl)</div>}</div>;
export const TelegramCTA=()=><div className="bg-forest p-8 text-white sm:p-12"><h2 className="text-3xl font-bold sm:text-4xl">Order in one message.</h2><p className="mt-2 max-w-md text-white/70">Pick your pieces, send the order to our Telegram, and we confirm size, price and delivery with you.</p>
  <a href={`https://t.me/${BRAND.telegram}`} className="btn-light mt-6"><Send size={16}/>Chat on Telegram @{BRAND.telegram}</a></div>;
