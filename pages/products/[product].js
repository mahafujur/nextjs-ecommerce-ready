import {useRouter} from 'next/router';

import Page from '../../components/page';
import React from "react";
import ProductSectionSearch from "../../components/productSectionSearch";

export default function Category() {
  const router = useRouter();
  const { product } = router.query;
  return (
    <Page>
      <ProductSectionSearch
        product={product}
      />
    </Page>
  );
}
