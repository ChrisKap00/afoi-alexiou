import React, { useEffect, useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import { Card } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  //   const location = useLocation();

  const nextSlide = () => {
    if (slideIndex !== 9) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === 9) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(9);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    setInterval(() => {
      nextSlide();
      console.log(slideIndex);
    }, 1000);
  }, []);

  return (
    <Card elevation={10} className="container-slider">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((obj, index) => (
        <div
          key={index}
          className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
        >
          <img src={require("../../assets/images/home-antallaktika.jpg")} />
        </div>
      ))}
      {/* <BtnSlider moveSlide={nextSlide} direction={"next"} /> */}
      {/* <BtnSlider moveSlide={prevSlide} direction={"prev"} /> */}

      <div className="container-dots">
        {Array.from({ length: 9 }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </Card>
  );
}
