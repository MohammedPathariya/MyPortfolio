import React, { useState } from 'react';
import {
  FaLaptopCode,
  FaFutbol,
  FaMusic,
  FaBook,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Logo.css';

const iconList = [
  { icon: <FaLaptopCode />, label: "Coding", toast: "💻 Coding mode: building ideas into reality." },
  { icon: <FaFutbol />, label: "Football", toast: "⚽ Game on! Data plays midfield, ideas score goals." },
  { icon: <FaMusic />, label: "Music", toast: "🎧 Tuning in to data vibes and lo-fi logic." },
  { icon: <FaBook />, label: "Reading", toast: "📚 Just another chapter in the story of code." },
];

const Logo = () => {
  const [index, setIndex] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    const nextIndex = (index + 1) % iconList.length;
    setIndex(nextIndex);

    toast(iconList[nextIndex].toast, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => setClicked(false), 400);
  };

  return (
    <>
      <div
        className={`logo-container ${clicked ? 'clicked' : ''}`}
        onClick={handleClick}
        title={`Currently showing: ${iconList[index].label}`}
      >
        <div className="logo-icon-wrapper">
          {iconList[index].icon}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Logo;
