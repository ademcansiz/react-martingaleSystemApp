import { useState,useEffect } from 'react';


function App() {

  const [bahis,setBahis]=useState();
  const [butce,setButce]=useState();
  const [firstButce,setFirstButce]=useState();
  const [bahisText, setBahisText] = useState("");
  const [butceText, setButceText] = useState("");
  const [secilen,setSecilen]=useState();
  const [isDisable,setIsDisable]=useState(false);
  const [oyun,setOyun]=useState(false);
  const [randomNumber, setRandomNumber] = useState();


  useEffect(()=>{
    setRandomNumber(Math.floor(Math.random() * 2) + 1);
  },[])

  const temizle = ()=>{
    setBahis(0)
    setButce(0)
    setFirstButce(0)  
    setSecilen(null)
    setBahisText("")
    setButceText("")
    setOyun(false)
    setIsDisable(false)

  }

  // Bahis ve Bütçe değerlerini alma
  const onChangeBahis = event =>{
    setBahis(parseInt( event.target.value,10));
    setBahisText(event.target.value);
  }
  const onChangeButce = event =>{
    setButce(parseInt(event.target.value, 10));
    setFirstButce(parseInt(event.target.value,10 ));
    setButceText(event.target.value)
  }


  //Bahis Oyna Butonu kazanma ve kaybetme ihtimalleri
  const onClickBahis = () =>{
    if (bahisText !=="" && butceText !== "") {
          setIsDisable(true)
          setRandomNumber(Math.floor(Math.random() * 2) + 1);
          if (butce<bahis) {
            if ((butce - firstButce)<0) {
              alert("Bütçeniz oynayacağınız bahis için yetersizdir \n " + (firstButce -butce ) + " TL zararınız vardır...")
            }
              
              temizle()    
          }
          else{
            setOyun(true);
            if (randomNumber===secilen) {
              setButce(butce+bahis)
              alert("Tebrikler ! "+(bahis+(butce-firstButce)) + " TL kazandınız...")
              temizle()
            }
            else{
              alert(bahis +  " TL Kaybettiniz...")
                setButce(butce-bahis)
                setBahisText(bahis*2)
                setBahis((bahis*2))
                setSecilen(null)
              }
          }
    }
    else{
      alert("Kasa ve Bahis alanlarını eksiksiz doldurunuz...")
    }
  }

  //Seçilen numara değerlerini atamak
  const onClicka = () =>{
    setSecilen(1);
  }
  const onClickb = () =>{
    setSecilen(2);

  }

  return (
    <div className=" flex flex-col justify-center items-center p-8">
      <div className='flex flex-col p-4 rounded-md'>
        <div>
          <input disabled={isDisable} className='text-violet-600 p-1 m-2 rounded-md outline-none focus:outline-violet-900'  onChange={onChangeButce} value={butceText} placeholder='Kasa'></input>   
        </div>
        <input disabled={isDisable} className='text-violet-600 p-1 m-2 rounded-md outline-none focus:outline-violet-900' onChange={onChangeBahis} value={bahisText}  placeholder='Bahis Tutarı'></input>
      </div> 

      <div className='flex gap-4 justify-center items-center '>
        <button className={`text-xl p-2 rounded-full px-4 text-white ${secilen===1 ? 'bg-violet-900 ' : 'bg-violet-600'}`} onClick={onClicka}>1</button>
        <button  className={`text-xl p-2 rounded-full px-4 text-white ${secilen===2 ? 'bg-violet-900 ' : 'bg-violet-600'}`} onClick={onClickb}>2</button>
      </div>

      {console.log('Üretilen Sayı : ' + randomNumber)}

      <button className='m-6 bg-violet-700 text-white p-2 text-md rounded-xl px-8' onClick={onClickBahis}>Bahis Oyna</button>

      <div className='border border-violet-900 p-4 w-[30%] text-center rounded-md text-white'>
        <p className='flex'>Bütçe : {butce}</p>
        <p className='flex'>Bahis : {bahis}</p>
        <p className='flex'>Kâr - Zarar : {oyun === true ? butce-firstButce : 0}</p>
      </div>

    </div>
  );
}

export default App;
