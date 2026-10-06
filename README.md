# URBAN THREADS (fictional demo store)
Run: `npm install && npm run dev` · Build: `npm run build`

## Customise for a real shop
- **Business name, tagline, phone, Telegram, hours, social links, payment info, map**: `src/config.js` (Telegram username without @; map = Google Maps embed URL)
- **Logo**: text logo lives in `src/components/Layout.jsx` (Navbar + Footer). Swap the text for `<img src="/logo.svg">` and put the file in `public/`
- **Products, prices, sizes, colors, stock, flags**: `src/data/products.js` (rows array: name, category, gender, price, old price, flags F/N/T, colors, stock). Add `COLOR_HEX` entries for new colors; sizes are set per category in `sizeOf`
- **Product photos**: add files to `public/img/` and set `images:['/img/name.jpg']` per product. Until then, color tiles are shown
- **Announcement bar and delivery fee**: `Layout.jsx` and `Cart.jsx`
- **Reviews and About text**: `Home.jsx`, `Info.jsx` (replace the fictional reviews with real ones only)
