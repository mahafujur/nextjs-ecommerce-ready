import AsideCategories from './asideCategories';
import PromoCard from './promoCard';
import HeaderBarProducts from './headerBarProducts';
import React from "react";
import ProductsSearch from "./productsSearch";

export default function ProductSectionSearch({ product }) {
  return (
    <section id="product">
      <aside>
        <AsideCategories />
        <PromoCard />
      </aside>
      <div className="main">
        <HeaderBarProducts />
         <ProductsSearch
           product={product}
         />
      </div>

      <style jsx>{`
        #product {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        #product .main {
          flex-grow: 1;
          padding-left: 30px;
        }
        @media (max-width: 900px) {
          #product .main {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
