import ShoePic from "../assets/shoe_pic.png";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import Row from "../components/Row";
import { shoesData } from "../utils/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { GiConverseShoe } from "react-icons/gi";
import { FaShoePrints } from "react-icons/fa";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";

const Home = () => {
  const [scrollValue, setScrollValue] = useState(0);
  // console.log(scrollValue);
  const items = useSelector((state) => state);
  const displayItems = items.displayItems[0];
  // console.log(items)
  return (
    <section>
      <div className="hero_bg_div">
        <div className="hero_text">
          <img src={Logo} alt="logo" />
          <p>
            Step into greatness with our unbeatable selection of stylish and
            comfortable shoes - the perfect match for every heroic stride!
          </p>
          <NavLink to="" className="link">
            LINK
          </NavLink>
        </div>
        <img className="hero_bg animated" src={ShoePic} alt="" />
      </div>
      <div className="row_mainDiv">
        <div className="row_title">
          <div className="row_title_div1">
            <GiConverseShoe className="icon_shoe" />
            <h1>
              Featured <span> Shoes</span>
            </h1>
          </div>
          <div>
            <motion.div
              onClick={() =>
                setScrollValue((prevScrollValue) => prevScrollValue - 200)
              }
              whileTap={{ scale: 0.75 }}
              className="icon"
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              onClick={() =>
                setScrollValue((prevScrollValue) => prevScrollValue + 200)
              }
              whileTap={{ scale: 0.75 }}
              className="icon"
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <Row data={displayItems} scrollValue={scrollValue} flag={true} />
      </div>

      <div className="row_title">
        <div className="row_title_div1">
          <GiConverseShoe className="icon_shoe" />
          <h1>
            Our <span> Colletions</span>
          </h1>
        </div>
        <div>
          <NavLink>
            <motion.div whileTap={{ scale: 0.75 }} className="icon">
              <FaShoePrints className="text-lg text-white" />
              <p className="mx-2">SEE ALL</p>
            </motion.div>
          </NavLink>
        </div>
      </div>
      <div>
        <Menu flag={true} data={displayItems} />
      </div>
    </section>
  );
};

export default Home;
