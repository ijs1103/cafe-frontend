import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import {createUploadLink} from "apollo-upload-client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token: any) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
};
export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
};

const httpLink = createUploadLink({
    // uri: "http://localhost:5000/graphql",
    uri: "https://coffee-shop-ijs1103.herokuapp.com/graphql"
});
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: localStorage.getItem(TOKEN),
        }
    };
});
const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(`GraphQL Error`, graphQLErrors);
    }
    if (networkError) {
      console.log("Network Error", networkError);
    }
});
export const client = new ApolloClient({
    link: authLink.concat(onErrorLink).concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    seeCoffeeShops: {
                        ...offsetLimitPagination(),
                    },
                    searchShops: {
                        ...offsetLimitPagination(),
                    }
                }
            }
        }
    })
});


 

  
