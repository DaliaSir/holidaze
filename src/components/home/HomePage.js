import topBanner from "../../images/top-banner-mao-yuqing.jpg";
import bottomBanner from "../../images/bottom-banner-sharon-christina-rorvik.jpg";
import planeImage from "../../images/plane.svg";
import planeTail from "../../images/plane-tail2.svg";
import Heading from "../layout/Heading";
import SearchAccommodations from "./SearchAccommodations";
import BestSellers from "./BestSellers";
import CategoryLinks from "./CategoryLinks";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function HomePage() {
  document.title = `Holidaze | Home`;
  return (
    <div className="home-container">
      <div className="top-banner" style={{ backgroundImage: `url(${topBanner})` }}>
        <div className="top-banner__search-container">
          <Heading size="1" content="Find a Place to stay in Bergen" />
          <div className="top-banner__search-container--service">
            <p>safe and easy booking</p>
            <span className="dot"></span>
            <p>24/7 customer service</p>
            <span className="dot"></span>
            <p>no booking fees</p>
          </div>
          <div className="top-banner__search-container--search-bar">
            <SearchAccommodations />
          </div>
          <div className="top-banner__search-container--link">
            <Link to="/accommodations" className="btn">View all Accommodations</Link>
          </div>
        </div>
      </div>

      <div className="category-container">
        <Heading size="2" content="Where would you spend your holiday?" />
        <CategoryLinks />
      </div>

      <div className="subscribe-banner">
        <div className="subscribe-banner__text">
          <p>Get en extra 20% off for your next holiday</p>
        </div>
        <div className="subscribe-banner__plane-tail" style={{ backgroundImage: `url(${planeTail})` }}></div>
        <div className="subscribe-banner__subscribe">
          <input type="email" className="form-control" placeholder="name@example.com" />
          <Button>Subscribe</Button>
        </div>
        <div className="subscribe-banner__plane" style={{ backgroundImage: `url(${planeImage})` }}></div>
      </div>

      <div className="best-sellers">
        <Heading size="2" content="Our Best Sellers" />
        <BestSellers />
      </div>

      <div className="bottom-banner" style={{ backgroundImage: `url(${bottomBanner})` }}>
        <div className="bottom-banner__text-container">
          <div className="bottom-banner__text-container--text">
            <p>Discover <br /> Bergen</p>
          </div>
          <div className="bottom-banner__text-container--link">
            <Link to="/accommodations" className="btn">Book a place to stay</Link>
          </div>
        </div>
      </div>
    </div>
  );

}