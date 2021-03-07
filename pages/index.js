import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";

import Waves from "../components/waves";
import Content from "../components/content";

export default function Home() {
  const workTime = 25 * 60;
  const breakTime = 5 * 60;

  const [time, setTime] = useState(workTime);
  // 作業中か休憩中か
  const [isWorking, setIsWorking] = useState(true);
  // 再生中かどうか
  const [isPlaying, setIsPlaying] = useState(true);

  const intervalRef = useRef();

  const handleTime = () => {
    if (time <= 0) {
      setTime(isWorking ? breakTime : workTime);
      setIsWorking(!isWorking);
      return;
    }
    setTime(time - 1);
  };

  const handleTimeRef = useRef(handleTime);

  const play = () => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      handleTimeRef.current();
    }, 1000);
  };

  const stop = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  useEffect(() => {
    handleTimeRef.current = handleTime;
  }, [handleTime]);

  useEffect(() => {
    play();
    return () => {
      stop();
    };
  }, []);

  return (
    <>
      <Head>
        <title>pomodoro.c</title>
      </Head>
      <Waves
        time={time}
        maxTime={isWorking ? workTime : breakTime}
        isWorking={isWorking}
        isPlaying={isPlaying}
      />
      <Content time={time} isPlaying={isPlaying} handleClick={handleClick} />
    </>
  );
}
