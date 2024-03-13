import React, { useState, useEffect } from "react";

interface CountdownProps {
  countdown: boolean;
  setCountdown: (countdown: boolean) => void;
}

const CountdownButton: React.FC<CountdownProps> = ({
  countdown,
  setCountdown,
}) => {
  const [timer, setTimer] = useState<number>(60);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (countdown && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [countdown, timer]);

  useEffect(() => {
    if (countdown && timer === 0) {
      setTimer(60);
      setCountdown(false);
    }
  }, [countdown, setCountdown, timer]);

  return (
    <button
      className={`bg-gray-400 hover:bg-gray-500 ml-auto px-5 py-2.5
        text-center text-white font-medium rounded-lg text-sm focus:outline-none mt-5 mr-4`}
      disabled={true}
    >
      Attendez {timer} seconds
    </button>
  );
};

export default CountdownButton;
