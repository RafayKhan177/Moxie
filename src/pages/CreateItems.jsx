import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";

import { Loader } from "../components/Index";
import { Category } from "../utils/data";

import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const CreateItems = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageAsset, setimageAsset] = useState();

  const [alertStatus, setAlertStatus] = useState("danger");
  const [loading, setLoading] = useState("");
  const [fields, setFields] = useState(true);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await firebase.addItemData(name, desc, price, category, imageAsset);
    // navigate("/Moxie");
  };
  return (
    <div className="w-full h-auto my-20 border-8 flex items-center justify-center min-h-screen overflow-x-hidden bg-slate-200">
      <div className="w-[90] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold${
              alertStatus === "danger"
                ? " bg-red-400  text-red-800"
                : " bg-emerald-400  text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Gimme title..."
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:to-gray-500 text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border-b-2 outline-none text-base w-full bg-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option
              value="other"
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white"
            >
              Select Category
            </option>
            <option value="other">Other</option>
            {Category &&
              Category.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-0 capitalize bg-white text-headingColor"
                  value={item.category}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click Here To Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload image"
                      accept="image/*"
                      onChange={(e) => setimageAsset(e.target.files[0])}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset && URL.createObjectURL(imageAsset)}
                      alt="item image"
                      className="w-full h-full object-cover"
                    />
                    {/* <button
                      type="button"
                      //   onClick={deleteImage}
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                    >
                      <MdDelete className="text-white" />
                      Delete
                    </button> */}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl " />
            <input
              required
              name=""
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="Description"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 to-textColor"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl " />
            <input
              required
              name=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 to-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateItems;
