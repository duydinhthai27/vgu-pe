import React from 'react'
import Header from '././Header/Header.jsx'
import Carousel from '././Carousel/Carousel.jsx'
import Card from '././Carousel/Card.jsx'
import Category from '././Category/Category.jsx'
import Title from '././Title/Title.jsx'
import Search from '././Search bar/Search.jsx'
import Delivery from '././Delivery/Delivery.jsx'
import Swipe from '././Swiper/Swipe.jsx'
import Text from '././Carousel/Text.jsx'
import Topbooks from '././Top-Rated/Topbook.jsx'
import Final from '././PageEnd/Final.jsx'
import Contact from '././PageEnd/Contact.jsx'
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1361039443l/41865.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1449868701l/11127.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1346072396l/30.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1388212715l/6185.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1327872220l/24213.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1328559506l/13335037.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1327869409l/7624.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1520093244l/22628.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1432730315l/256683.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1390789015l/8127.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://ew.com/thmb/VXjN75rLOO9xspAhdZ_7P2hfO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/harry01english-05b4fdcc910a4ae199b34d9cb99e3db6.jpg" />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://images.gr-assets.com/books/1327881361l/320.jpg" />
      )
    }
  ];
  return (
    <div>
      <Header></Header>
      <div className="space"
                style={{ height: '150px' }}>
            
            </div>  
      <Swipe ></Swipe>
      <Title></Title>
      <div className="container">
        <Category></Category>
      </div>
      <Delivery></Delivery>
      <Text></Text>
        <Carousel 
            cards={cards}
            height="700px"
            width="60%"
            margin="20px auto"
            offset={5}
            showArrows={false}>
          
        </Carousel>
        <Topbooks></Topbooks>
        <Final></Final>
        <Contact></Contact>
    </div>
  )
}

export default Home
