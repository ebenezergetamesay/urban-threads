import {createContext,useContext,useEffect,useReducer} from 'react';
const Ctx=createContext();
export const lineKey=l=>`${l.id}|${l.size}|${l.color}`;
function reducer(s,a){
  switch(a.type){
    case 'add':{const k=lineKey(a.item);const f=s.find(l=>lineKey(l)===k);
      return f?s.map(l=>lineKey(l)===k?{...l,qty:l.qty+a.item.qty}:l):[...s,a.item];}
    case 'qty':return s.map(l=>lineKey(l)===a.key?{...l,qty:Math.max(1,l.qty+a.d)}:l);
    case 'remove':return s.filter(l=>lineKey(l)!==a.key);
    case 'clear':return [];
    default:return s;}
}
export function CartProvider({children}){
  const [items,dispatch]=useReducer(reducer,[],()=>{try{return JSON.parse(localStorage.getItem('ut-cart'))||[]}catch{return []}});
  useEffect(()=>{try{localStorage.setItem('ut-cart',JSON.stringify(items))}catch{}},[items]);
  const count=items.reduce((n,l)=>n+l.qty,0),subtotal=items.reduce((n,l)=>n+l.qty*l.price,0);
  return <Ctx.Provider value={{items,dispatch,count,subtotal}}>{children}</Ctx.Provider>;
}
export const useCart=()=>useContext(Ctx);
