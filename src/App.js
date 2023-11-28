import React, { useState, useEffect } from 'react';
import './App.css';
import cookie from './cookie.png';

function App() {
  const [initialChislo, setInitialChislo] = useState(
    parseInt(localStorage.getItem('chislo')) || 0
  );
  const [clickCount, setClickCount] = useState(initialChislo);
  const [grannyHired, setGrannyHired] = useState(
    localStorage.getItem('grannyHired') === 'true' || false
  );
  const [formulaPurchased, setFormulaPurchased] = useState(
    localStorage.getItem('formulaPurchased') === 'true' || false
  );
  const [grannyPurchased, setGrannyPurchased] = useState(
    localStorage.getItem('grannyPurchased') === 'true' || false
  );
  const [farmPurchased, setFarmPurchased] = useState(
    localStorage.getItem('farmPurchased') === 'true' || false
  );
  const [formulaClicked, setFormulaClicked] = useState(false);
  const [grannyClicked, setGrannyClicked] = useState(false);
  const [farmClicked, setFarmClicked] = useState(false);

  useEffect(() => {
    localStorage.setItem('chislo', clickCount.toString());
    localStorage.setItem('grannyHired', grannyHired.toString());
    localStorage.setItem('formulaPurchased', formulaPurchased.toString());
    localStorage.setItem('grannyPurchased', grannyPurchased.toString());
    localStorage.setItem('farmPurchased', farmPurchased.toString());
  }, [clickCount, grannyHired, formulaPurchased, grannyPurchased, farmPurchased]);

  useEffect(() => {
    if (farmPurchased) {
      const farmInterval2 = setInterval(() => {
        setClickCount((prevCount) => prevCount + 10);
      }, 5000);

      return () => {
        clearInterval(farmInterval2);
      };
    }
  }, [farmPurchased]);

  function clickImg1() {
    setClickCount(clickCount + 2);
  }

  function resetCoins() {
    setClickCount(0);
    setGrannyHired(false);
    setFormulaPurchased(false);
    setGrannyPurchased(false);
    setFarmPurchased(false);
    setFormulaClicked(false);
    setGrannyClicked(false);
    setFarmClicked(false);

    localStorage.removeItem('chislo');
    localStorage.removeItem('grannyHired');
    localStorage.removeItem('formulaPurchased');
    localStorage.removeItem('grannyPurchased');
    localStorage.removeItem('farmPurchased');

    window.location.reload();
  }

  function clickImg() {
    if (formulaPurchased) {
      setClickCount(clickCount + 2);
    } else {
      setClickCount(clickCount + 1);
    }
  }

  function purchaseFormula() {
    if (!formulaPurchased && clickCount >= 10) {
      setClickCount(clickCount - 10);
      setFormulaPurchased(true);
      setFormulaClicked(true);
    }
  }

  function hireGranny() {
    if (!grannyHired && clickCount >= 15) {
      setClickCount(clickCount - 15);
      setGrannyHired(true);
      setGrannyPurchased(true);
      setGrannyClicked(true);

      const farmInterval1 = setInterval(() => {
        setClickCount((prevCount) => prevCount + 1);
      }, 3000);
    }
  }

  useEffect(() => {
    const grannyInterval1 = setInterval(() => {
      if (grannyHired) {
        setClickCount((prevCount) => prevCount + 1);
      }
    }, 3000);

    return () => {
      clearInterval(grannyInterval1);
    };
  }, [clickCount, grannyHired]);

  function purchaseFarm() {
    if (!farmPurchased && clickCount >= 30) {
      setClickCount(clickCount - 30);
      setFarmPurchased(true);
      setFarmClicked(true);
    }
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="main-content">
          <button className="nachalo" onClick={resetCoins}>
            Начать заново
          </button>
          <h2>Кликай на печеньку</h2>
          <img className="image" id="img-cookie" src={cookie} onClick={clickImg} />
          <p>Монеты {clickCount}</p>
        </div>
        <div className="side-bar">
          <div className="magazine">
            <h3>Магазин</h3>
            <button
              className={`formulaclass ${formulaPurchased || formulaClicked ? 'clicked' : ''}`}
              onClick={() => {
                if (clickCount >= 10) {
                  clickImg1();
                  purchaseFormula();
                }
              }}
            >
              Изучить выгодную формулу
            </button>
            <h5>Удваивает приток новых монет</h5>
            <h6>Стоимость: 10 монет.</h6>
            <h6 id="formul1">{formulaPurchased ? 'Приобретено' : 'Не приобретено'}</h6>

            <button
              className={`formulaclass ${grannyPurchased || grannyClicked ? 'clicked' : ''}`}
              onClick={hireGranny}
            >
              Нанять бабулю
            </button>
            <h5>Каждые 3 секунды продает 1 печенку</h5>
            <h6>Стоимость: 15 монет.</h6>
            <h6 id="granny1">{grannyPurchased ? 'Приобретено' : 'Не приобретено'}</h6>

            <button
              className={`formulaclass ${farmPurchased || farmClicked ? 'clicked' : ''}`}
              onClick={purchaseFarm}
            >
              Ферма печенек
            </button>
            <h5>Каждые 5 секунд продает 10 печенек</h5>
            <h6>Стоимость: 30 монет.</h6>
            <h6 id="ferma1">{farmPurchased ? 'Приобретено' : 'Не приобретено'}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;