import React from 'react';
import Button from '../UI/Button.jsx';

// import HomePromotion from './HomePromotion.jsx';
// const HomePromotion = (props) => {
const HomePromotion = ({whatever1, whatever2}) => {
    // no lifecycle methods
    // no refs

    const promotion = {img:'/images/featured/featured_home_3.jpg',
            lineOne:'Up To 40% Off', lineTwo:'On Second Hand Guitars',
            linkTitle:'Shop Now', linkTo:'/shop'}

    const renderPromotion = () => {
        return promotion ?
        <div    className='home_promotion_img'
                style={{background:`white url(${promotion.img})`}}>
            <div className="tag title">{promotion.lineOne}</div>
            <div className="tag low_title">{promotion.lineTwo}</div>
            <div>
                <Button type='default'
                        title={promotion.linkTitle}
                        linkTo={promotion.linkTo}
                        addStyles={{margin:'10px 0 0 0'}}/>
            </div>
        </div>
        :null
    }

    return (
        <div    className="home_promotion">
            {renderPromotion()}
        </div>
    );
};


export default HomePromotion;