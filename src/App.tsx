import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import CreateShop from "./screens/CreateShop";
//import SeeShops from "./screens/SeeShops";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { client, darkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
function App() {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/add" component={CreateShop} />
              {/* <Route path="/shop/:id" component={SeeShops} /> */}
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