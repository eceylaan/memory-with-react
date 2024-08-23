import { useState } from "react";
import "./App.css";

let dotSet = ["🧝🏻‍♀️", "🧝‍♂️", "🧙🏻‍♂️", "🧔🏻‍♀️", "👨‍🌾", "👑", "💍", "🏹", "🦄", "⚔️", "🔮", "🍞", "🔱", "👁️", "🕷️", "🌲🌳", "🧟‍♀️", "🏰"];
dotSet = [...dotSet, ...dotSet];
//dotSet dizisini kendisiyle birlestirerek dizideki elemanlarin iki katina cikarilmasini saglar.
//Baska bi deyisle, dotSet dizisindeki tum elemanlar bi kez daha diziye eklenir.

// karıştırma kodu
dotSet.sort(() => Math.random() - 0.5);

function App() {
  const [matchedPairs, setMatchedPairs] = useState([]); // eslenen ciftler iicn
  const [clickedDots, setClickedDots] = useState([]); // tiklanan emojiler icin

  function handleClick(index) {
    if (clickedDots.length < 2) {
      //Bu kod kullanicinin en fazla iki emoji secebilmesini sagliyo.
      //Eger clickedDots dizisinde 2'den fazla oge varsa (yani zaten 2 emoji secilmisse),
      //yeni bir emoji secimi yapilmasina izin verilmiyore. iki emoji karsilastirildiktan sonra
      //baska secim yapilmasini engellemek icin kullaniyoruz yani.
      const emoji = dotSet[index];
      setClickedDots([...clickedDots, { emoji, index }]); // indexiyle birlikte yeni arraye atiyore

      if (clickedDots.length === 1 && clickedDots[0].emoji === emoji && clickedDots[0].index !== index) {
        //eger tiklanan 2.emoji 1.emoji ile ayniysa eslesmis cifler arrayinin icine atiyore
        setMatchedPairs([...matchedPairs, emoji]);
      }

      //bura birz uzun once
      //clickedDots.length === 1: kullanicinin ilk secimi oldugunu ve 2.secimini yapmaya calistini kontrol ediyrz
      //clickedDots[0].emoji === emoji: burda sectigi ikinci emojinin, daha once sectigi ilk emojiyle ayni olduunu kontrol edyrx
      //clickedDots[0].index !== index: burda kullanicinin aynı indeksi (yani ayni dotu) iki kez tıklamadıgını kontrol edyrz.
      //Yani, kullanicinin iki farkli yerdeki ayni emojiyi sectiginden emin olduran kod.
      //sonra da iste bu kontrolleri yaptiktan sonra eslesmis ciftler arrayine gonderiyorz

      console.log(clickedDots);
      setTimeout(() => {
        setClickedDots([]);
      }, 2000);
      //bekletme fonksiyonu icindeki kod altta yazan milisaniye sonra calisiyo (parametresi aslinda)
      //parametre olarak verilen fonksiyonlara call-back fonk deniyo aslinda mapler feln callback fonk ztn
    }
  }

  return (
    <>
      <header>
        <p>Memory Game</p>
        <div>
          <Restart />
          <NewGame />
        </div>
      </header>

      <div className="container">
        {dotSet.map((x, i) => (
          <Dot
            key={i}
            emoji={x}
            handleClick={() => handleClick(i)}
            isSelected={clickedDots.some((dot) => dot.index === i)}
            //eger clickedDots dizisinde bu emojiye karsilik gelen bir indeks varsa,
            //bu emoji secili anlamına geliyo. some fonksiyonu, clickedDots dizisinde belirtilen indeksi kontrol ediyo
            //some fonksiyonu, JavaScript'te dizi üzerinde çalışan bir yöntemdir. Bu fonksiyon, dizideki en az bir öğenin
            //belirli bir koşulu sağlayıp sağlamadığını kontrol eder ve bu koşul sağlanıyorsa true, aksi takdirde false döner.
            isMatched={matchedPairs.includes(x)}
          />
        ))}
      </div>
    </>
  );
}

function Dot({ emoji, isSelected, isMatched, handleClick }) {
  let dotClassName = "dot";

  if (isSelected) {
    dotClassName += " selected";
  }

  if (isMatched) {
    dotClassName += " matched";
  }

  return (
    <div className={dotClassName} onClick={handleClick}>
      <span>{isSelected || isMatched ? emoji : "?"}</span>
    </div>
  );
}

function Restart() {
  return <button className="rs">Restart</button>;
}

function NewGame() {
  return <button className="ng">New Game</button>;
}

export default App;
