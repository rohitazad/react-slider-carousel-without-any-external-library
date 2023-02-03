import React, {useState, useEffect} from 'react';

import './reactslider.css';

const ReactSliderBasic = ()=>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const item = [
        {id:1, content: <div className='itemSlider'><button className='topHead'>Hot Deal</button><h3>Sale 10% off</h3> <button className='discoverBtn'>Dicover now</button></div>},
        {id:2, content: <div className='itemSlider'><button className='topHead'>Hot Deal_2</button><h3>Sale 20% off</h3> <button className='discoverBtn'>Dicover now 2</button></div>},
        {id:3, content: <div className='itemSlider'><button className='topHead'>Hot Deal_3</button><h3>Sale 30% off</h3> <button className='discoverBtn'>Dicover now 3</button></div>}
    ];
    
    useEffect(()=>{
        const id = setInterval(()=>{
            setCurrentIndex((currentIndex + 1) % item.length);
            console.log('slidre call here automaticly');
        }, 3000);

        setIntervalId(id);
        console.log('yes useEffect call here _1')
        return ()=> clearInterval(id);

    }, [currentIndex, item.length]);

    const handlerPrev = ()=>{
        clearInterval(intervalId);
        setCurrentIndex((currentIndex - 1) % item.length);
    }

    const handlerNext = ()=>{
        clearInterval(intervalId);
        setCurrentIndex((currentIndex + 1) % item.length);
    }
    const handlerClick = (itemIndex)=>{
        clearInterval(intervalId);
        setCurrentIndex(itemIndex);
    }

    return (
        <>
            <h2>Hello i m React Slider</h2>
            <div className='slider'>
                {
                    item.map((itemContent, index)=>{
                        const isActive = index === currentIndex;
                        const className = `slider-item ${isActive ? 'active': ''}`
                        return (
                            <div 
                                className={className} 
                                key={itemContent.id}

                                >
                                {
                                 itemContent.content   
                                }
                            </div>
                        )
                    })
                }
                <div className='slider-controls'>
                    <button onClick={handlerPrev}>
                        Prev
                    </button>
                    <div className='slider-indicator'>
                        {
                            item.map((_, index)=>{
                                return (<span key={index} 
                                    onClick={()=>{handlerClick(index)}}
                                    className={`slider-indicator-item ${index === currentIndex ? 'active' : ''}`}
                                    >
                                    {index+1}
                                </span>)
                            })
                        }
                    </div>
                    <button onClick={handlerNext}>
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default ReactSliderBasic;