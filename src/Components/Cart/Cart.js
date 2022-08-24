import { useEffect, useState } from 'react';
import Product from './Product/Product';
import './Cart.scss';

const Cart = ({ toggleCart }) => {
  const [productData, setProductData] = useState([]);

  let totalSumPrice = 0;

  const deletedList = e => {
    setProductData(productData =>
      productData.filter(({ product_id }) => product_id !== Number(e.target.id))
    );
    fetch('http://10.58.0.218:8000/carts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: Number(e.target.id),
    });
  };

  const goToPay = () =>
    fetch(' http://518f-211-106-114-186.jp.ngrok.io/cart/2 ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        userId: productData,
      }),
    }).then(response => response.json());

  const productList = productData.map((product, idx) => {
    totalSumPrice += product.price * product.quantity;
    return (
      <Product
        key={idx}
        idx={idx}
        product={product}
        deletedList={deletedList}
        productData={productData}
        setProductData={setProductData}
      />
    );
  });

  useEffect(() => {
    fetch('http://10.58.0.218:8000/carts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(setProductData);
  }, []);

  return (
    <div className="cart" onMouseLeave={toggleCart}>
      {productList.length === 0 ? (
        <div className="empty" onMouseLeave={toggleCart}>
          <p className="emptyP">카트가 비어있습니다.</p>
        </div>
      ) : (
        <>
          <div className="naviLocation">
            <div className="titleArea">카트</div>
            <div className="sizeArea">사이즈</div>
            <div className="countArea">수량</div>
            <i className="fi fi-br-cross" onClick={toggleCart} />
          </div>
          {productList}
          <div className="cartUnder">
            <div className="underArea">
              <div className="notice">
                <span>전 제품 무료 배송 혜택을 즐겨보세요.</span>
              </div>
              <div className="price">
                <p>소계 (세금 포함)</p>
                <span>₩ {totalSumPrice.toLocaleString('ko-KR')}</span>
              </div>
              <div className="payment">
                <button onClick={goToPay}>결제하기</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
