import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";

const Row = ({ data, scrollValue, flag }) => {
  const dispatch = useDispatch();
  console.log(data.itemPhoto);

  const Row = useRef();
  useEffect(() => {
    Row.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <section
      ref={Row}
      className={`row_container scrollbar-hide gap-8 ${
        flag ? "" : "flex-wrap "
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 500 }}
            // key={item.itemPhoto}
            className="card_div  w-400 mx-auto h-[18rem] min-w-[300px] md:w-[340px] my-12 backdrop-blur-lg rounded-lg p-2 hover:drop-shadow-lg flex flex-col justify-between items-center"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-[12rem] h-[12rem] -mt-16 drop-shadow-2xl"
                whileHover={{ scale: 1.3 }}
              >
                <img
                  src={item.itemPhoto}
                  alt="food pic"
                  className="h-[12rem] w-[12rem] object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={(e) =>
                  dispatch(
                    addItem({
                      name: item.name,
                      price: item.price,
                      category: item.category,
                      description: item.desc,
                      image: item.itemPhoto,
                      // quantity:
                    })
                  )
                }
                className="flex items-center justify-center w-8 h-8 rounded-full bg-color_orange cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex items-end justify-end flex-col gap-1">
              <p className="to-textColor font-semibold md:text-lg text-base">
                {item.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item.category} </p>
              <p className="mt-1 text-sm text-gray-500">{item.desc} </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-lg text-red-500">$ </span>
                  {item.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default Row;
