import React, {useCallback, useMemo} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const { items, cart, totals, isModalOpen, totalAmount } = store.getState();

  const callbacks = {
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onRemoveItem: useCallback((code) => {
      store.removeFromCart(code)
    }, []),
    onShowCart: useCallback(() => {
      store.openModal();
    }, []),
    hideCart: useCallback(() => {
      store.closeModal();
    }, []),
  };

  return (
    <>
    {!isModalOpen &&
      <Layout isModalOpen={isModalOpen} head={<h1>Магазин</h1>}>
        <Controls cart={cart} totals={totals} onShowCart={callbacks.onShowCart}/>
        <List items={items} onItemAdd={callbacks.addToCart}/>
      </Layout>}
    {isModalOpen && <Modal cart={cart} totalAmount={totalAmount} onClose={callbacks.hideCart} onRemove={callbacks.onRemoveItem}/>}
    </>
  );
}

export default App;
