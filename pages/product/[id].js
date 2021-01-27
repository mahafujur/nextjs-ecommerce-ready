import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
  FaCartArrowDown,
  FaCartPlus,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown'
import StarRatings from 'react-star-ratings';
import { PRODUCTS_BY_ID, CART, WISHLIST } from '../../apollo/client/queries';
import Page from '../../components/page';
import ErrorAlert from '../../components/alerts/error';
import { toggleCart, toggleWishlist } from '../../utils/toggleProductStates';

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const cart = useQuery(CART);
  const wishlist = useQuery(WISHLIST);

  const { data, loading, error } = useQuery(PRODUCTS_BY_ID, {
    variables: {
      id,
    },
  });

  if ((error || !data?.product) && !loading) {
    return (
      <Page title="Quantum E-commerce - Products">
        <ErrorAlert message="This product is not found!"></ErrorAlert>
      </Page>
    );
  } else if (loading) {
    return (
      <Page title="Quantum E-commerce - Products">
        <p>Loading...</p>
      </Page>
    );
  }

  return (
    <Page title="Quantum E-commerce - Products">
      <article>
        <div className="top-buttons">
          <button
            className="add-wishlist"
            onClick={() => toggleWishlist(data && data.product)}
          >
            {wishlist?.data?.wishlist?.products.includes(
              data.product.id
            ) && <FaHeart size={20} color="#D8D8D8" />}
            {!wishlist?.data?.wishlist?.products.includes(
              data.product.id
            ) && <FaRegHeart size={20} color="#D8D8D8" />}
          </button>
        </div>

        <div className="product-img">
          <img src={data?.product?.data?.image?.url || ''} width="320" height="230" />
        </div>

        <h1 className="product-name">{data?.product?.data.name}</h1>

        <h3 className="product-description">
          <ReactMarkdown>
              {data?.product?.data?.description?.markdown}
          </ReactMarkdown>
        </h3>

        <div className="rating">
          <StarRatings
            rating={parseFloat(data?.product?.data?.rating)}
            starRatedColor="#F9AD3D"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="1px"
          />
        </div>

        <div className="price">
          <p className="price-value">${data?.product?.data?.price}</p>
          <button
            className="add-cart"
            onClick={() => toggleCart(data && data.product && data.product.id ?  data.product : null)}
          >
            {cart?.data?.cart?.products.includes(data?.product?.id) && (
              <FaCartArrowDown size={24} color="#D8D8D8" />
            )}
            {!cart?.data?.cart?.products.includes(data?.product?.id) && (
              <FaCartPlus size={24} color="#D8D8D8" />
            )}
          </button>
        </div>

        <style jsx>{`
          article {
            display: flex;
            align-items: center;
            flex-direction: column;
            box-sizing: border-box;
            height: 100%;
            width: 100%;
            padding: 24px;
            background: white;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
            border-radius: 6px;
          }
          .top-buttons {
            margin-bottom: 24px;
            align-self: flex-end;
          }
          .top-buttons .add-wishlist {
            background: none;
            border: none;
          }
          .top-buttons .add-wishlist:focus {
            outline: none;
          }
          .product-img {
            margin-bottom: 28px;
          }
          .product-name {
            width: 80%;
            line-height: 20px;
            text-decoration: none;
            font-weight: 500;
            font-size: 22px;
            text-align: center;
            color: #666666;
            margin-bottom: 28px;
          }
          .product-description {
            width: 40%;
            line-height: 22px;
            text-decoration: none;
            font-weight: 400;
            font-size: 14px;
            text-align: center;
            color: #666666;
            margin-bottom: 24px;
          }
          .rating {
            margin-bottom: 18px;
          }
          .price {
            display: flex;
            align-items: center;
            font-weight: 900;
            font-size: 20px;
            color: #666666;
            margin-bottom: 20px;
          }
          .price .add-cart {
            background: none;
            border: none;
            margin-left: 5px;
          }
          .price .add-cart:focus {
            outline: none;
          }
          @media (max-width: 1000px) {
            .product-img {
              width: 225px;
              height: 180px;
              margin-bottom: 28px;
            }
            .product-name {
              width: 80%;
              line-height: 20px;
              text-decoration: none;
              font-weight: 500;
              font-size: 18px;
              text-align: center;
              color: #666666;
              margin-bottom: 18px;
            }
            .product-description {
              width: 80%;
              line-height: 22px;
              text-decoration: none;
              font-weight: 400;
              font-size: 14px;
              text-align: center;
              color: #666666;
              margin-bottom: 18px;
            }
          }
        `}</style>
      </article>
    </Page>
  );
}
