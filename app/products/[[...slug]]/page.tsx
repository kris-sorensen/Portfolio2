import React from "react";

interface Props {
  params: {
    slug: string[];
  };
  searchParams: { sortOrder: string };
}

const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  console.log(`products page`);
  console.log(`slug`, slug);
  console.log(`sortOrder`, sortOrder);
  return (
    <div>
      ProductPage {slug} {sortOrder}
    </div>
  );
};

export default ProductPage;
