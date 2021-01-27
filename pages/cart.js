import {useLazyQuery, useQuery} from '@apollo/client';
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import FinishOrderCart from '../components/finishOrderCart';
import ProductItem from '../components/productItem';
import { CART, PRODUCTS_BY_IDS } from '../apollo/client/queries';
import ProductsGrid from '../components/productsGrid';
import {useEffect} from 'react';

export default function Profile() {

  const cart = useQuery(CART);

  // const [ProductApi,{ data, loading, error }] = useLazyQuery(PRODUCTS_BY_IDS);
  //
  // useEffect(()=>{
  //   if(cart && cart.data && cart.data.cart.products){
  //     ProductApi({
  //       variables: {
  //         id: cart && cart.data && cart.data.cart.products,
  //       },
  //     })
  //   }
  // },[cart])

  // console.log(data,'>>>>.');
  // if (loading) return <></>;
  //
  // if (error)
  //   return (
  //     <Page>
  //       <Title title="Cart" />
  //       <EmptySection name="cart" />
  //     </Page>
  //   );

  return (
    <Page>
      <Title title="Cart" />
      <section className="cart">
        <aside>{cart && cart.data && cart.data.cart.products.length != 0 && <FinishOrderCart />}</aside>
        <div className="main">
          {cart && cart.data && cart.data.cart.length === 0  && <EmptySection name="cart" />}
          <ProductsGrid>
            {cart && cart.data  && cart.data.cart.products.length  && cart.data.cart.products.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.data.name}
                rating={product.data.rating}
                img_url={product.data.image.url}
                price={product.data.price}
                product={product}
              />
            ))}
          </ProductsGrid>
        </div>
      </section>

      <style jsx>{`
        .cart {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .cart .main {
          flex-grow: 1;
          padding-left: 30px;
        }
        .cart aside {
          max-width: 280px;
        }

        @media (max-width: 1100px) {
          .cart {
            flex-direction: column;
            justify-content: space-between;
          }
          .cart aside {
            flex-grow: 1;
            max-width: 100%;
          }
          .cart .main {
            padding-left: 0px;
          }
        }
      `}</style>
    </Page>
  );
}
