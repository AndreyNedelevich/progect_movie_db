import React, {FC}from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"





import {SlideItem} from "./SlideItem";
import './SlideMovies.css'
import {IMovie} from "../../interfaces";



const SampleNextArrow = (props:any) => {
    const { onClick } = props
    return (
        <div className='control-btn' onClick={onClick}>
            <button className='next'>
                <i className='fa fa-chevron-right'></i>
            </button>
        </div>
    )
}
const SamplePrevArrow = (props:any) => {
    const { onClick } = props
    return (
        <div className='control-btn' onClick={onClick}>
            <button className='prev'>
                <i className='fa fa-chevron-left'></i>
            </button>
        </div>
    )
}

interface IProps{
    nowPlayining:IMovie[]|[]
}


const SliderMovie:FC<IProps> = ({nowPlayining}) => {



    const settings = {
        autoplay: true,
        autoplaySpeed: 9500,
        pauseOnHover: true,
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }

    return (
        <div className='homeContainer'>
            <Slider {...settings}>
                {nowPlayining.map((item) => {
                    return (
                        <>
                            <SlideItem key={item.id} item={item} />
                        </>
                    )
                })}
            </Slider>
        </div>
    );
};

export {SliderMovie };