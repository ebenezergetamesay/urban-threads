import {Phone,Send} from 'lucide-react';import {BRAND} from '../config.js';import {Location,Payments,TelegramCTA} from '../components/Blocks.jsx';
export const About=()=><div className="wrap max-w-3xl py-14"><h1 className="text-5xl font-extrabold">About {BRAND.name}</h1>
  <p className="mt-6 text-lg text-ink/80">{BRAND.name} is a fictional fashion label created to show what a modern online clothing store can look like. Clean cuts, honest prices and ordering that works the way customers already talk: on Telegram.</p>
  <p className="mt-4 text-ink/70">Replace this page with your shop's real story: when you opened, what you sell, and why customers trust you.</p>
  <h2 className="mb-4 mt-12 text-2xl font-bold">Where to find us</h2><Location/><div className="mt-12"><TelegramCTA/></div></div>;
export function Contact(){
  return <div className="wrap py-14"><h1 className="text-5xl font-extrabold">Contact</h1>
    <div className="mt-8 grid gap-10 md:grid-cols-2"><div className="space-y-4 text-sm"><p className="flex gap-2"><Phone size={18}/>{BRAND.phone}</p><a className="flex gap-2 underline" href={`https://t.me/${BRAND.telegram}`}><Send size={18}/>@{BRAND.telegram}</a>
      <p>{BRAND.socials.map(s=><a key={s.name} href={s.url} className="mr-4 underline">{s.name}</a>)}</p></div></div>
    <h2 className="mb-4 mt-14 text-2xl font-bold">Visit us</h2><Location/><h2 className="mb-4 mt-14 text-2xl font-bold">Payment options</h2><Payments/></div>;
}
