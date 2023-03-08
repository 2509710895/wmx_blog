import React, { useMemo, useEffect } from 'react'
import './StarSky.css'
export default function StarSky() {

    const starCount = 150
    const stars = []
    let starsRef;
    let starSkyRef;
    for (let i = 0; i < starCount; i++) {
        stars.push(i)
    }

    const starArr = useMemo(() => {
        return []
    }, [])

    useEffect(() => {
        console.log(starArr);
        // 旋转星空
        /*let speed = 0.2 + (Math.random() * 1);
        let distance = 800 + (Math.random() * 300)
        starArr.forEach(item => {
            item.style.transformOrigin = `0 0 ${distance}px`
            item.style.transform = `translate3d(0,0,-${distance}px) rotateY(${(Math.random() * 360)}deg)
             rotateX(${(Math.random() * -50)}deg) scale(${speed},${speed})`
        })*/
        const wwidth = window.screen.width
        const hheight = window.screen.height
        console.log(wwidth, hheight);
        starSkyRef.style.height = `${(hheight / wwidth) * 100 + 3}vw`
        starsRef.style.height = `${(hheight / wwidth) * 100}vw`
        starArr.forEach((item, index) => {

            let top = (Math.random() * (hheight / wwidth) * 100 - 5.5)
            let left = (Math.random() * 100)
            item.style.top = `${top}vw`
            item.style.left = `${left}vw`
            if (index % 3 === 1) {
                item.style.animationDelay = `0.8s`;
            } else if (index % 3 === 2) {
                item.style.animationDelay = `1.7s`;
            } else {
            }
            if (index % 4 === 1) {
                if (index % 3 === 0) {
                    item.style.width = `1px`;
                    item.style.height = `1px`;
                    item.style.boxShadow = `0px 0px 3px #dcdf2f`;
                } else {
                    item.style.width = `2px`;
                    item.style.height = `2px`;
                    item.style.boxShadow = `0px 0px 4px #dcdf2f`;
                }
            } else if (index % 4 === 2) {
                item.style.width = `3px`;
                item.style.height = `3px`;
                item.style.boxShadow = `0px 0px 6px #dcdf2f`;
            } else if (index % 4 === 3) {
                item.style.width = `4px`;
                item.style.height = `4px`;
                item.style.boxShadow = `0px 0px 6px #dcdf2f`;
            } else {

            }
        })
    }, [starsRef, starSkyRef])


    return (
        <div id='starSky' ref={(r) => { starSkyRef = r }}>
            <div className='stars' ref={(r) => { starsRef = r }}>
                {
                    stars.map((star) => {
                        return <div key={star} ref={(r) => { if (r) starArr.push(r) }} className='star'></div>
                    })
                }
            </div>
        </div>
    )
}
