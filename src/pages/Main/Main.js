import React, { useState, useEffect } from 'react';
import './Main.scss';
import Product from './Proudct';
import Filter from './Filter';
import Option from './Option';

const Main = () => {
  const [data, setData] = useState([]);
  const [link, setLink] = useState([]);
  const [filterBln, setFliterBln] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/data/Maindata.json')
      .then(response => {
        return response.json();
      })
      .then(result => {
        setData(result);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/data/link.json')
      .then(response => {
        return response.json();
      })
      .then(result => {
        setLink(result);
      });
  }, []);

  const filterChange = bln => {
    setFliterBln(bln);
  };

  return (
    <div>
      <div className="main">
        <h2 className="title">향수</h2>
        <nav className="lnb">
          <ul className="lnbInner">
            {link.map((item, idx) => {
              return (
                <li key={idx}>
                  <a href={item.link}>{item.title}</a>
                </li>
              );
            })}
          </ul>
          <Filter filterChange={filterChange} />
          <div className={filterBln ? 'filterMenu on' : 'filterMenu'}>
            <Option />
          </div>
        </nav>
        {data.map((item, idx) => {
          return <Product item={item} key={idx} />;
        })}
      </div>

      <div className="giftBunddleWrap">
        <div className="giftBunddle">
          <div className="leftGiftBunddle">
            <div className="giftTitle">기프트 번들</div>
            <div className="text">
              받는 분과 기념일에 어울리는 의미있는 선물이 될 수 있도록 세심하게
              구성된 함께 사용하면 좋은 제품들
            </div>
            <button type="button" className="giftBunddleBtn">
              기프트 번들 보기
            </button>
          </div>
          <div className="imgWrap">
            <img
              className="img"
              src="/image/MainImg/mainImg7.png"
              alt="상품이미지"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
