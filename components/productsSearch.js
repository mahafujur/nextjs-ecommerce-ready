import {useQuery} from '@apollo/client';
import ProductItem from './productItem';
import {PRODUCTS_SEARCH} from '../apollo/client/queries';
import ProductsGrid from './productsGrid';

export default function ProductsSearch({product}) {

  const {data, loading, error} = useQuery(PRODUCTS_SEARCH, {
    variables: {
      name: product,
    }
  });

  if (loading)
    return (
      <>
        <p className="loading">Loading...</p>
        <style jsx>{`
          .loading {
            width: 100%;
            text-align: center;
            align-self: center;
            font-size: 18px;
          }
        `}</style>
      </>
    );

  return (
    <ProductsGrid>
      {data?.products && Array.isArray(data?.products) ? data?.products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product?.data?.name}
            rating={product?.data?.rating}
            img_url={product?.data?.image?.url}
            price={product?.data?.price}
            product={product}
          />
        ))
        :

        <div>No Item Found</div>}
    </ProductsGrid>
  );
}
