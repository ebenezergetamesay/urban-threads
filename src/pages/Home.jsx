import {Link} from 'react-router-dom';import {PRODUCTS,CATEGORIES,COLOR_HEX} from '../data/products.js';import {Grid,ProductImage} from '../components/ProductCard.jsx';import {Section,Payments,Location,TelegramCTA} from '../components/Blocks.jsx';import {BRAND} from '../config.js';
const reviews=[['Selam T.','The Bomber Jacket fits perfectly. Delivery to Bole was fast.'],['Dawit M.','Great quality chinos and easy ordering through Telegram.'],['Hana G.','Lovely silk blouse. They helped me pick the right size.']];
export default function Home(){
  const f=k=>PRODUCTS.filter(p=>p[k]);const offers=f('onSale');const picks=PRODUCTS.filter(p=>p.trending).slice(0,2);
  return <>
  <section className="wrap grid gap-3 pt-3 md:grid-cols-5 md:pt-6">
    <div className="flex flex-col justify-end bg-ink p-6 text-white md:col-span-3 md:min-h-[560px] md:p-12">
      <h1 className="mt-3 text-6xl font-extrabold leading-[0.9] sm:text-8xl">Find Your Style</h1>
      <p className="mt-5 max-w-sm text-white/70">Considered everyday pieces from {BRAND.location.split(',')[0]}, Addis Ababa.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link to="/shop" className="btn-light">Shop Collection</Link><Link to="/shop" className="btn border border-white/60 hover:bg-white hover:text-ink">Explore Our Collection</Link></div></div>
    <div className="grid grid-cols-2 gap-3 md:col-span-2 md:grid-cols-1">{picks.map(p=><Link key={p.id} to={`/product/${p.id}`} className="relative aspect-square overflow-hidden md:aspect-auto"><ProductImage p={p} big/><span className="absolute bottom-3 right-3 bg-white px-3 py-1 text-xs font-semibold">{p.name}</span></Link>)}</div>
  </section>
  <Section title="Our Collection" link="View all" to="/shop"><Grid list={PRODUCTS.slice(0,4)}/></Section>
  <Section title="Popular styles" link="Shop all" to="/shop"><Grid list={PRODUCTS.filter(p=>p.trending).slice(0,4)}/></Section>
  <Section title="Shop by category"><div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{CATEGORIES.map((c,i)=><Link key={c} to={`/shop?cat=${encodeURIComponent(c)}`} className="flex aspect-[4/3] items-end p-3 font-display text-lg font-bold text-white transition hover:opacity-80" style={{background:Object.values(COLOR_HEX)[(i*3)%10]}}>{c}</Link>)}</div></Section>
  <Section title="Trending now"><Grid list={f('trending').slice(0,4)}/></Section>
  <Section title="Special offers" link="All offers" to="/shop?sale=1"><Grid list={offers.slice(0,4)}/></Section>
  
  <Section title="Visit the store"><Location/></Section>
  <Section title="How to pay"><Payments/></Section>
  <section className="wrap mt-20"><TelegramCTA/></section></>;
}
