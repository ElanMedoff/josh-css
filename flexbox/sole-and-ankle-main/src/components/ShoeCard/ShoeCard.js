import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {(variant === "new-release" || variant === "on-sale") && (
          <VariantWrapper>
            <Variant variant={variant}>
              {variant === "new-release" ? "Just released!" : "Sale!"}
            </Variant>
          </VariantWrapper>
        )}
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <RowWrapper>
          <Row>
            <Name>{name}</Name>
            <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          </Row>
          <Row>
            <Price variant={variant}>{formatPrice(price)}</Price>
            {variant === "on-sale" && (
              <SalePrice>{formatPrice(price)}</SalePrice>
            )}
          </Row>
        </RowWrapper>
      </Wrapper>
    </Link>
  );
};

const VariantWrapper = styled.div`
  position: relative;
`;

const Variant = styled.div`
  padding: 8px 16px;
  font-size: 0.5rem;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
  background-color: ${(p) => (p.variant === "new-release" ? "purple" : "red")};
  position: absolute;
  top: 8px;
  right: -8px;
  border-radius: 4px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 250px;
  max-width: 400px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div``;

const Image = styled.img`
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  flex: 4;

  &:last-of-type {
    flex: 1;
  }
`;

const Name = styled.h3`
  font-size: 0.95rem;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(p) => (p.variant === "on-sale" ? "line-through" : "")};
  color: ${(p) => (p.variant === "on-sale" ? COLORS.gray[500] : "inherit")};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
