import {useQuery} from '@apollo/client';
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import AsideCategories from '../components/asideCategories';
import {WISHLIST} from '../apollo/client/queries';
import ProductsGrid from '../components/productsGrid';
import ProductItem from '../components/productItem';

export default function Wishlist() {
  const wishlist = useQuery(WISHLIST);

  return (
    <Page>
      <Title title="Wishlist" />
      <section className="wishlist">
        <aside>
          <AsideCategories />
        </aside>
        <div className="main">
          {wishlist && wishlist.data && wishlist.data.wishlist.products && wishlist.data.wishlist.products.length === 0  && <EmptySection name="cart" />}
          <ProductsGrid>
            {wishlist && wishlist.data && wishlist.data.wishlist && wishlist.data.wishlist.products.map((product) => (
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
        .wishlist {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .wishlist .main {
          flex-grow: 1;
          padding-left: 30px;
        }
      `}</style>
    </Page>
  );
}
