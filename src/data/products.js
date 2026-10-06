// Central product data. Replace rows with real stock. Add photo URLs in `images` (e.g. ['/img/shirt1.jpg']).
export const COLOR_HEX={Black:'#16181c',White:'#f2f2ee',Navy:'#1f2a44',Olive:'#5b6340',Sand:'#d3c4a8',Camel:'#a8794a',Blue:'#4a6fa5',Burgundy:'#6d1f2b',Grey:'#8a8d91',Green:'#1f3a34'};
export const CATEGORIES=["Men's","Women's",'Shirts','T-Shirts','Jeans','Trousers','Jackets','Shoes','Bags','Accessories'];
const S={cl:['S','M','L','XL'],bt:['28','30','32','34','36'],sh:['40','41','42','43','44','45'],one:['One size']};
const sizeOf=c=>({Jeans:S.bt,Trousers:S.bt,Shoes:S.sh,Bags:S.one,Accessories:S.one})[c]||S.cl;
// [name, category, gender, price, oldPrice|0, flags(T=trending), colors, stock]
const rows=[
['Addis Oxford Shirt','Shirts',"Men's",1850,0,'T',['White','Blue','Sand'],12],
['Merkato Linen Shirt','Shirts',"Men's",2100,2600,'',['Sand','Olive'],8],
['Entoto Flannel Shirt','Shirts',"Men's",1750,0,'',['Burgundy','Navy'],0],
['Bole Silk Blouse','Shirts',"Women's",2400,0,'T',['White','Burgundy'],9],
['Everyday Crew Tee','T-Shirts',"Men's",750,0,'T',['Black','White','Grey','Olive'],40],
['Oversized Street Tee','T-Shirts',"Men's",950,1200,'T',['Black','Sand'],22],
['Habesha Line Tee','T-Shirts',"Women's",850,0,'',['White','Green'],18],
['Cropped Rib Tee','T-Shirts',"Women's",700,0,'',['Black','Sand','Burgundy'],25],
['Straight Indigo Jeans','Jeans',"Men's",2800,0,'T',['Blue','Black'],14],
['Slim Black Jeans','Jeans',"Men's",2600,3200,'',['Black'],10],
['High-Rise Mom Jeans','Jeans',"Women's",2900,0,'T',['Blue','Grey'],11],
['Wide-Leg Denim','Jeans',"Women's",3100,0,'',['Blue','Black'],6],
['Tailored Chinos','Trousers',"Men's",2300,0,'T',['Sand','Navy','Olive'],16],
['Pleated Office Trousers','Trousers',"Men's",2500,0,'',['Grey','Black'],9],
['Flow Palazzo Pants','Trousers',"Women's",2200,2700,'',['Black','Camel'],13],
['Bomber Jacket','Jackets',"Men's",4800,0,'T',['Olive','Black'],7],
['Wool-Blend Overcoat','Jackets',"Women's",7200,8500,'T',['Camel','Grey'],4],
['Denim Trucker Jacket','Jackets',"Men's",4200,0,'',['Blue'],8],
['Light Windbreaker','Jackets',"Women's",3600,0,'',['Navy','Sand'],0],
['City Leather Sneakers','Shoes',"Men's",4600,0,'T',['White','Black'],15],
['Suede Chelsea Boots','Shoes',"Men's",6500,7800,'',['Camel','Black'],5],
['Minimal Slide Sandals','Shoes',"Women's",1900,0,'',['Sand','Black'],20],
['Leather Tote Bag','Bags',"Women's",5200,0,'T',['Camel','Black','Burgundy'],6],
['Canvas Daypack','Bags',"Men's",2400,0,'',['Olive','Black'],17],
['Woven Belt','Accessories',"Men's",900,0,'',['Black','Camel'],30],
['Silk Scarf','Accessories',"Women's",1300,1600,'',['Burgundy','Green','Sand'],14],
];
const desc=n=>`${n} — a demo product with a clean cut and everyday comfort. Replace this text with your real product description, fabric and care details.`;
export const PRODUCTS=rows.map(([name,category,gender,price,old,f,colors,stock],i)=>({
  id:i+1,name,category,gender,price,oldPrice:old||null,onSale:!!old,trending:f.includes('T'),
  colors,sizes:sizeOf(category),stock,inStock:stock>0,images:[],description:desc(name),tone:colors[0]}));
export const etb=n=>`ETB ${n.toLocaleString('en-US')}`;
