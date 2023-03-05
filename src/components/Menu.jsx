import { useState } from "react";
import { motion } from "framer-motion";
import { GiConverseShoe } from "react-icons/gi";
import { Category, shoesData } from "../utils/data";
import Row from "./Row";
const Menu = ({data}) => {
  const [filter, setFilter] = useState("running");
  return (
    <>
      <div className="menu_div">
       <div className="osm">
       {Category &&
          Category.map((category) => (
            <motion.div
              whileTap={{ scale: 0.6 }}
              onClick={() => setFilter(category.category)}
              key={category.id}
              className={`card_div ${
                filter === category.category
                  ? "  bg-color_teal"
                  : "bg-color_orange  "
              } group w-24 hover:bg-color_teal min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center justify-center gap-3 `}
            >
              <div
                className={`${
                  filter === category.category
                    ? "   bg-color_green  "
                    : "bg-color_skin"
                } shadow-lg w-10 h-10 rounded-full bg-color_green group-hover:bg-color_green flex items-center justify-center`}
              >
                <GiConverseShoe className="text-white" />
              </div>
              <p className="text-white"> {category.name}</p>
            </motion.div>
          ))}
       </div>
      </div>
      <div className="">
        <Row data={data?.filter((n) => n.category == filter)} />
      </div>
    </>
  );
};

export default Menu;
