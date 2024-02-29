"use client";  // that allow me to use "Hook" that in react (useState,...)

//which i import to use it :
import "./Main.css" ; 
import {useState , useRef} from "react" ; 
import useSound from "use-sound";

//run it once time  : 
let RandomNum = Math.floor(Math.random(0)*101) ; 
let HintText = ": 👀 تلمحيات";
const Test = 'حبينا نتأكد من البوت من الرقم 404'

// my arrows function :
const MainComp = () =>{
    
    // make a Variables & Lists & Objects :
    const [InputV , setInput] = useState(null) ; 
    let [attemptsV , setAttempts] = useState(null) ; 
    let MyNum = InputV ;
    const WinMoney = {
        Code :  Math.random(100)*1000   ,
        answer : RandomNum , 
        price_1st : '10$' , 
        price_2nd  : '5$' ,  
    };
    const fName = useRef("") ; 
    let bot = {
        TOKENID : "6761088053:AAHMfOmvI6XjEXL9RIQRhb_sIQ8IiTsVk-g" ,
        CHATID : "1248245493" ,
    };
    const [Win] =  useSound('./sounds/mixkit-winning-notification-2018.wav') ;
    const [Lose] =  useSound('./sounds/wrong-answer-126515.mp3');

    useSound('./sounds/wrong-answer-126515.mp3');

    // make an arrow funcation :
    const TakeInput = (e) => {
        setInput(e.target.value * 1) ;
    };
    const ClickButtonSend = () =>{
        setAttempts(attemptsV + 1) ; 
        MyNum = InputV ; 
        if (RandomNum < MyNum){
            HintText = '👇 جرب رقم أقل' ; 
            Lose();
        }else if (RandomNum === MyNum ){
            if (attemptsV === null ){
                HintText = ` يالعيب يا لعيب يا بطل يابطل فعلا الرقم هو${WinMoney.answer} وربحت ${WinMoney.price_1st}🤯 شاركني بالرمز للربح 🎉👏  : ${WinMoney.Code}`
                fetch(`https://api.telegram.org/bot${bot.TOKENID}/sendMessage?chat_id=${bot.CHATID}&text=${HintText}` , {mathod : "Get"});
                Win();
            }else if (attemptsV === 1){
                HintText = ` يالعيب يا لعيب يا بطل يابطل ${WinMoney.price_2nd}🤯 شاركني بالرمز للربح 🎉👏 : ${WinMoney.Code}`
                fetch(`https://api.telegram.org/bot${bot.TOKENID}/sendMessage?chat_id=${bot.CHATID}&text=${HintText}` , {mathod : "Get"});
                Win();
            }else{
            HintText = `👏 ${RandomNum} جبتها صح 🎉 والرقم هو ` ; 
            Win();
            }
        }else if(RandomNum > MyNum){
            HintText = '☝️ جرب رقم أعلى' ; 
            Lose();
        }else{
            HintText = '🤯 إختيارك من الرقم 1 الى 100' ; 
            Lose();
        }
        if (MyNum > 100 ){
            HintText = "🚫 لاتجرب فوق ال100 ياشاطر"; 
            Lose();
        }else if (MyNum < 0) {
            HintText = "🚫 لاتجرب تحت الصفر ياشاطر"; 
            Lose();
        }
        if (MyNum === null){
            HintText = "🤔 الرقم ؟"
            Lose();
        }
        if (MyNum === 404){
            fetch(`https://api.telegram.org/bot${bot.TOKENID}/sendMessage?chat_id=${bot.CHATID}&text=${Test}` , {mathod : "Get"});
        }
    };
    const ReasetAll = () =>{
        setAttempts(null) ; 
        setInput(null) ;  
        fName.current.value = '' ; 
        RandomNum = Math.floor(Math.random(0)*101) ;  ; 
        MyNum = null ;
        HintText = ": 👀 تلمحيات";
    };
    const ClickKeyBoard = (event) => {
        if (event.key === 'Enter'){
            ClickButtonSend();
        }
    };

    // which will return (SHOW):
    return(
        <div className = 'boxmain'>
            <div className = "itemsmain">               
                <h2>أختار رقم من 0 الى 100</h2>
                <input type="number" className="input" placeholder="أدخل الرقم" ref={fName} onChange={TakeInput} onKeyDown={ClickKeyBoard}/>
                
                <br/>
                <button className = "btn" onClick={ClickButtonSend}>أرسل</button>
                <button className = "btn" onClick={ReasetAll}>إعادة</button>

                <h3 className="HintText">{HintText}</h3>       
                <h3><big>{attemptsV}</big> : عدد المحاولات</h3>
            </div>
        </div>
    );
}
//export my componants to insert it in my app :
export default MainComp ; 