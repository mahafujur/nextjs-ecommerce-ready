import { useQuery } from '@apollo/client';
import ProductItem from './productItem';
import EmptySection from './emptySection';
import { PRODUCTS, SORT_PRODUCT_SECTION, PRODUCTS_BY_CATEGORY} from '../apollo/client/queries';
import ProductsGrid from './productsGrid';
import offlineProducts from '../db/offlineData/products';

export default function Products({ category }) {
  const {data: sortQueryResult} = useQuery(SORT_PRODUCT_SECTION);

  if (category) {
    var { data : dataByCategory , loading, error } = useQuery(PRODUCTS_BY_CATEGORY, {
      variables: {
        category: category,
      },
    });
  }
  else if (!category) {
    var { data, loading, error } = useQuery(PRODUCTS,{
      variables:{
        sort: {
          price: sortQueryResult?.sortProductSection[0]==='price'? sortQueryResult?.sortProductSection[1] : undefined,
          rating: sortQueryResult?.sortProductSection[0]==='rating'? sortQueryResult?.sortProductSection[1] : undefined,
        }
      }
    });
  }

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

  // // Offline data
  //
  if ((!data?.products && !dataByCategory?.categories[0]?.products) || error)
    return (
      <ProductsGrid>
        {offlineProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            rating={product.rating}
            img_url={product.img_url}
            price={product.price}
            product={product}
          />
        ))}
      </ProductsGrid>
    );

  // if (error) return <EmptySection />;

  // if (!data.products) return <EmptySection />;

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
      )) :

      dataByCategory?.categories[0]?.products && Array.isArray(dataByCategory?.categories[0]?.products) ? dataByCategory?.categories[0]?.products.map((product) => (
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
      : null}
    </ProductsGrid>
  );
}
