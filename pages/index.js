import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>pomodoro.c</title>
      </Head>

    
      <main className={styles.main}>
        <h1 className={styles.title}>
          pomodoro.c
        </h1>
        <p>
          {timeTalker()}
        </p>
        <div className={styles.footer}>
        <a href="https://twitter.com/kisihara_c">🐦</a>
        </div>
      </main>
    </div>

  )
}

//メイン　秒数を返します
let timeTalker = (props) => {

  //time:そのまま表示されます
  //workingOrNot:25分カウント時true、5分カウント時falseのブール値です
  //setOrNot:初回起動時のみ使われ、以降ずっとfalseです
  //初回判定しないと1秒ごとにコールバックが増え続け減少が加速します
  const [time, setTime] = useState(10);
  const [workingOrNot, setWorkingOrNot] = useState(false);
  const [setOrNot, setSetOrNot] = useState(false);

  //初回判定
  if(setOrNot===false){
    setInterval(()=>{setTime(time=>time-1)},1000);
    setSetOrNot(true);
  }
  
  //0秒判定　時間を２種類切り替えます
  if(time === 0){
    if(workingOrNot===true){
      setWorkingOrNot(false);
      setTime(300)
    }else{
      setWorkingOrNot(true);
      setTime(1500)
    }
  }

  let timeDateToString = (n) =>{
    let r;
    if(n<60){
      r = n;
    }else{
      r = Math.floor(n / 60) + " : " + (n % 60);
    }
    return r;
    
  }

  return timeDateToString(time);
}