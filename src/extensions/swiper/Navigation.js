import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Swiper from "react-id-swiper"
import img1 from "../../assets/img/slider/banner-7.jpg"
import img2 from "../../assets/img/slider/banner-2.jpg"
import img3 from "../../assets/img/slider/banner-3.jpg"
import img4 from "../../assets/img/slider/banner-4.jpg"
import img5 from "../../assets/img/slider/banner-5.jpg"
const params = {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
}
class NavigationSwiper extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
        </CardHeader>
        <CardBody>
          <Swiper {...params}>
            <div>
              <img src={img1} alt="swiper 1" className="img-fluid" />
            </div>
            <div>
              <img src={img2} alt="swiper 2" className="img-fluid" />
            </div>
            <div>
              <img src={img3} alt="swiper 3" className="img-fluid" />
            </div>
            <div>
              <img src={img4} alt="swiper 4" className="img-fluid" />
            </div>
            <div>
              <img src={img5} alt="swiper 5" className="img-fluid" />
            </div>
          </Swiper>
        </CardBody>
      </Card>
    )
  }
}
export default NavigationSwiper
