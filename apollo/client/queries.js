import { gql } from '@apollo/client';

export const GET_DRAWER_STATE = gql`
  query isDrawerOpen {
    isDrawerOpen @client
  }
`;

export const SORT_PRODUCT_SECTION = gql`
  query sortProductSection {
    sortProductSection @client
  }
`;

export const CART = gql`
  query cart {
    cart @client {
      products
      cartCount
    }
  }
`;

export const WISHLIST = gql`
  query wishlist {
    wishlist @client {
      products
      wishlistCount
    }
  }
`;

export const CART_COUNT = gql`
  query cart {
    cart @client {
      cartCount
    }
  }
`;

export const WISHLIST_COUNT = gql`
  query wishlist {
    wishlist @client {
      wishlistCount
    }
  }
`;

export const VIEWER = gql`
  query ViewerQuery {
    viewer {
      id
      name
      email
    }
  }
`;
export const VIEWERIs = gql`
  query isLoggedIn {
    isLoggedIn @client {
      isLoggedIn
    }
  }
`;

// export const PRODUCTS = gql`
//   query ProductsQuery($field: String!, $order: String!, $category: String) {
//     products(sort: { field: $field, order: $order }, category: $category) {
//       id
//       name
//       description
//       img_url
//       price
//       rating
//     }
//   }
// `;

export const PRODUCTS = gql`
  query ProductsQuery($sort: Products_input_sort_payload) {
    products(sort: $sort) {
      id
      data {
        name
        price
        rating
        image {
          url
        }
      description {
          text
        }
    }
  }
  }
`;

export const PRODUCTS_BY_CATEGORY = gql`
  query ProductsQueryByCategory($category: String) {
    categories(where: {name: {eq: $category}}) {
      products {
        id
        data {
          name
          price
          rating
          image {
            url
          }
        description {
            text
          }
        
        }
     }
    }
  }
`;

export const PRODUCTS_BY_ID = gql`
  query productsById($id: String!) {
    product(_id: $id) {
      id
        data {
          name
          price
          rating
          image {
            url
          }
        description {
            text
          }
        
        }
    }
  }
`;
export const PRODUCTS_SEARCH = gql`
query Products($name:String) {
  products(where: {name: {contains: $name}}) {
    data {
      description {
        text
      }
      image {
        url
      }
      name
      price
      rating
    }
    id
  }
}
`

export const PRODUCTS_BY_IDS = gql`
  query productsByIds($id: [ID]!) {
    productsById(id: $id) {
      id
      name
      description
      img_url
      price
      rating
    }
  }
`;

export const PRODUCTS_BY_IDS_PRICE = gql`
  query productsByIds($id: [ID]!) {
    productsById(id: $id) {
      price
    }
  }
`;

export const CATEGORIES = gql`
  query CategoriesQuery {
    categories {
      id
      data {
        name
        label
        icon {
          url
        }
      }
    }
  }
`;

export const  USER= gql`
  query ViewerQuery($id:String) {
  user(_id: $id) {
    id
    data {
      email
    }
 }
}
`;
