import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
    fragment PhotoFragment on CoffeeShopPhoto{
        id
        url
        CoffeeShopId
    }
`;
export const CATEGORY_FRAGMENT = gql`
    fragment CategoryFragment on Category{
        id
        name
        slug
        totalShops
    }
`;