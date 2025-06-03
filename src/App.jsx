import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './util/store/CartContext.jsx';
import Cart from './components/Cart.jsx';
import { UserProgressContextProvider } from './util/store/userProgress.jsx';

function App() {
  return (
    <>
    <UserProgressContextProvider>
    <CartContextProvider>
    <Header />
    <Meals />
    <Cart />
    </CartContextProvider>
    </UserProgressContextProvider>
    </>
  );
}

export default App;
