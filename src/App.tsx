import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import CreateShop from "./screens/CreateShop";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { client, darkModeVar,isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
import SeeShops from "./screens/SeeShops";
import Profile from "./screens/Profile";
import SearchShops from "./screens/SearchShops";
function App() {
  const darkMode = useReactiveVar(darkModeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              {!isLoggedIn && <Route path="/login" component={Login} />}
              {!isLoggedIn && <Route path="/signup" component={SignUp} />}
              {isLoggedIn && <Route path="/add" component={CreateShop} />}
              <Route path="/shops" component={SeeShops} />
              {isLoggedIn && <Route path={`/users/:username`} component={Profile} />}
              <Route path={`/search/:keyword`} component={SearchShops} />
              <Redirect from="*" to="/" />
            </Switch>
            <Footer />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}
export default App;