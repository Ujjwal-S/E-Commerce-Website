import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />  {/* idhar pe question mark laga ke hamne yah baat batayi ki yeh 'id' optional hai, toh yeh wali link --> sirf `/cart/` pe bhi chalegi aur --> id ke saath `/cart/1`  bhi chalegi */}
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
