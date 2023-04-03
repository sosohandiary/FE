import React, { useEffect } from "react";
import styled from "styled-components";
import jQuery from "jquery";
import Slider from "react-slick";

const TestAnimation = () => {
  useEffect(() => {
    jQuery(document).ready(function ($) {
      $(".slides").slick({
        centerMode: true,
        slidesToShow: 5,
        infinite: true,
        arrows: true,
        dots: false,
        slidesToScroll: 1,
        appendArrows: ".slider-nav",
        prevArrow:
          '<button type="button" class="slick-prev"><span class="sr-text">Previous</span><img class="prev" aria-hidden="true" width="25px" src="https://assets.codepen.io/588944/noun-arrow-1920806-1a1a1a.svg" /></button>',
        nextArrow:
          '<button type="button" class="slick-next"><span class="sr-text">Next</span><img class="next" aria-hidden="true" width="25px" src="https://assets.codepen.io/588944/noun-arrow-1920806-1a1a1a.svg" /></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      $(".slick-current").addClass("active");
      $(".slick-current").next(".slick-slide").addClass("next1");
      $(".slick-current").prev(".slick-slide").addClass("prev1");
      $(".slick-slide.next1").next(".slick-slide").addClass("next2");
      $(".slick-slide.prev1").prev(".slick-slide").addClass("prev2");

      // On before slide change
      $(".slides").on(
        "beforeChange",
        function (event, { slideCount: count }, currentSlide, nextSlide) {
          let selectors = [nextSlide, nextSlide - count, nextSlide + count]
            .map((n) => `[data-slick-index="${n}"]`)
            .join(", ");
          $(".slick-slide")
            .removeClass("active")
            .removeClass("next1")
            .removeClass("next2")
            .removeClass("prev1")
            .removeClass("prev2");
          $(selectors).addClass("active");
          $(".slick-slide.active").next(".slick-slide").addClass("next1");
          $(".slick-slide.active").prev(".slick-slide").addClass("prev1");
          $(".slick-slide.next1").next(".slick-slide").addClass("next2");
          $(".slick-slide.prev1").prev(".slick-slide").addClass("prev2");
        }
      );

      $("a[data-slide]").click(function (e) {
        e.preventDefault();
        var slideno = $(this).data("slide");
        $(".slides").slick("slickGoTo", slideno - 1);
      });
    });
  }, []);

  return (
    <AllStyle>
      <div className="area">
        <div className="slider">
          <div className="slides">
            <div className="slide">
              <div className="slide-inner">
                <a href="#" data-slide="1">
                  <img
                    alt="a black and white kitten playing with a flower"
                    src="https://assets.codepen.io/588944/cat-gb04944831_640.jpg"
                  />
                </a>
                <h2 className="slide-title">Slide title</h2>
                <p className="slide-description">
                  this is the information about the slide
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="slide-inner">
                <a href="#" data-slide="2">
                  <img
                    alt="two white kittens, one is tine and the other one is slightly larger"
                    src="https://assets.codepen.io/588944/cat-gd4350781a_640.jpg"
                  />
                </a>
                <h2 className="slide-title">Slide title 2</h2>
                <p className="slide-description">
                  this is information about a different slide
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="slide-inner">
                <a href="#" data-slide="3">
                  <img
                    alt="a brown and white kitten with its tongue out"
                    src="https://assets.codepen.io/588944/cat-geac5f2757_640.jpg"
                  />
                </a>
                <h2 className="slide-title">
                  Slide title 3 - This one is longer
                </h2>
                <p className="slide-description">
                  this is the information about the slide, there is also more
                  information here than there has been for previous slides.
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="slide-inner">
                <a href="#" data-slide="4">
                  <img
                    alt="a brown and white kitten looking back over its shoulder at the camera"
                    src="https://assets.codepen.io/588944/cat-gc9ffc7124_640.jpg"
                  />
                </a>
                <h2 className="slide-title">Slide title 4</h2>
                <p className="slide-description">
                  this is information about a different slide
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="slide-inner">
                <a href="#" data-slide="5">
                  <img
                    alt="a tiny kitten in a tree"
                    src="https://assets.codepen.io/588944/cat-g1c5bdfbad_640.jpg"
                  />
                </a>
                <h2 className="slide-title">Slide title 5</h2>
                <p className="slide-description">
                  this is the information about the slide
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="slide-inner">
                <a href="#" data-slide="6">
                  <img
                    alt="a white kitten looking back at us. Its head is upside down"
                    src="https://assets.codepen.io/588944/kitten-gf1939c82f_640.jpg"
                  />
                </a>
                <h2 className="slide-title">Slide title 6</h2>
                <p className="slide-description">
                  this is information about a different slide
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="slide-inner">
                <a href="#" data-slide="7">
                  <img
                    alt="a brown tabby kitten with blue eyes looking / roaring at some daisies"
                    src="https://assets.codepen.io/588944/kitty-g1aa5c8416_640.jpg"
                  />
                </a>
                <h2 className="slide-title">Slide title 7</h2>
                <p className="slide-description">
                  this is information about a different slide
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="slide-inner">
                <a href="#" data-slide="8">
                  <img
                    alt="a grey kitten in a wicker basket. Its ears are down and it looks sad"
                    src="https://assets.codepen.io/588944/kitten-gd3a42934d_640.jpg"
                  />
                </a>
                <h2 className="slide-title">Slide title 8</h2>
                <p className="slide-description">
                  this is information about a different slide
                </p>
              </div>
            </div>
          </div>
          <div className="slider-nav"></div>
        </div>
      </div>
    </AllStyle>
  );
};

export default TestAnimation;

const AllStyle = styled.div`
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: #1a1a1a;
    font-family: sans-serif;
    color: #f5f5f5;
  }

  .area {
    margin: auto;
    display: block;
    width: 100%;
  }

  .slick-list {
    overflow: visible;
  }

  .slick-slide {
    opacity: 0;
    transition: opacity 0.2s ease;
    &.prev1,
    &.prev2,
    &.active,
    &.next1,
    &.next2 {
      opacity: 1;
    }
    .slide-inner {
      transform: scale(0.7) translatey(70%);
      transition: all 0.5s ease;
    }
    &.next1 {
      .slide-inner {
        transition: all 0.5s ease;
        transform: scale(0.9) translatex(2.6%) translatey(2%);
      }
    }
    &.prev1 {
      .slide-inner {
        transition: all 0.5s ease;
        transform: scale(0.9) translatex(-2.6%) translatey(2%);
      }
    }
    &.next2,
    &.prev2 {
      .slide-inner {
        transform: scale(0.9) translatey(50%);
        transition: all 0.5s ease;
      }
    }
    .slide-title,
    .slide-description {
      opacity: 0;
      text-align: center;
      width: 150%;
      margin-left: -25%;
    }
    .slide-title {
      margin-top: 10%;
      margin-bottom: 15px;
    }
    .slide-description {
      margin-top: 0;
    }
    img {
      width: 100%;
      height: 15vw;
      object-fit: cover;
    }
    &.active {
      .slide-title,
      .slide-description {
        opacity: 1;
        transition: all 0.2s ease 0.3s;
      }
      .slide-inner {
        transform: scale(1) translatey(0%);
      }
    }
    &:focus {
      outline: none;
    }
    a {
      display: block;
      transition: all 0.2s ease;
    }

    a:focus {
      outline: none;
      box-shadow: 0 0 5px 1px #f5f5f533;
    }
  }

  .slick-list {
    width: 120vw;
    margin-left: -10vw;
    padding: 0 !important;
  }

  .slider-nav {
    text-align: center;
    padding-top: 10px;
    position: relative;
    z-index: 2;
    button {
      margin: 0 10px;
      background: transparent;
      border: none;
      transition: all 0.2s ease;
      position: relative;
      z-index: 2;
      opacity: 0.8;
    }
    img {
      border: 4px solid #f5f5f5;
      padding: 7px;
      background: #f5f5f5;
      border-radius: 50%;
    }
    img.prev {
      transform: rotate(180deg);
    }
    .sr-text {
      border: 0;
      clip: rect(1px, 1px, 1px, 1px);
      -webkit-clip-path: inset(50%);
      clip-path: inset(50%);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute !important;
      width: 1px;
      word-wrap: normal !important;
    }
    .slick-prev:hover {
      transform: translatex(-5px);
      opacity: 1;
      outline: none;
    }
    .slick-next:hover {
      transform: translatex(5px);
      opacity: 1;
    }
    .slick-prev:focus,
    .slick-next:focus {
      opacity: 1;
      outline: none;
    }
  }

  @media (max-width: 1024px) {
    .slick-slide img {
      height: 30vw;
    }
  }

  @media (max-width: 767px) {
    .slick-list {
      width: auto;
      margin-left: 0;
      padding: 0 50px !important;
    }
    .slide-inner {
      .slide-title,
      .slide-description {
        width: 100%;
        margin-left: 0;
      }
    }
    .slick-slide img {
      height: 70vw;
    }
  }
`;
