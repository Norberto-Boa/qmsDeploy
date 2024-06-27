import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import styles from "./store.module.css";
import homeStyles from "../Homepage/Homepage.module.css";
import img1 from "../../Assets/img1.png";
import img2 from "../../Assets/img2.png";
import img3 from "../../Assets/img3.png";
import TimerIcon from '@mui/icons-material/Timer';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allQueues, getSingle, joinQueue } from '../../../redux/actions/LayoutAction';
import axios from 'axios';
import Url from '../../../services/BaseUrl';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
import { useTranslation } from 'react-i18next';

const StorePage = () => {
  const { t } = useTranslation();
  const [loc, setLoc] = useState({ lat: 0, long: 0 });
  const [inQueue, setInQueue] = useState(false);
  const [counter, setCounter] = useState(0);
  const [shop, setShop] = useState({});
  const userShop = localStorage.getItem('user_shop') ?? " ";

  let location = useLocation();
  let dispatch = useDispatch();
  useEffect(() => {
    let id = location.pathname.split("/")[2];
    dispatch(setLoader());
    dispatch(getSingle(id))
      .then((res) => {
        setShop(res.data);
        dispatch(UnsetLoader());
      });
  }, [location.pathname, dispatch]);

  let Details = useSelector((state) => state.LayoutReducer).single;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLoc({ lat: position.coords.latitude, long: position.coords.longitude });
  }

  function distance(lat1, lat2, lon1, lon2) {
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return (c * r);
  }

  let d = distance(28.7536971, 28.648037, 77.5045989, 77.441118);

  let navigate = useNavigate();
  const join = () => {
    dispatch(setLoader());
    if (!inQueue) {
      dispatch(joinQueue(location.pathname.split("/")[2]))
        .then(() => {
          navigate("/");
        });
    } else {
      var today = new Date();
      var time = parseInt(today.getHours()) * 60 + parseInt(today.getMinutes());
      let userid = localStorage.getItem("userid");
      axios.post(Url + "store/removeuser", {
        shopid: Details._id,
        time,
        counter,
        userid
      })
        .then((res) => {
          console.log(res);
          dispatch(setLoader());
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let [arr, setArr] = useState([0]);
  let [bT, setBT] = useState(0);

  const findWait = () => {
    let a = new Array(Details.counter);
    for (let i = 0; i < Details.counter; i++) {
      a[i] = Details.ShopCounter[i] * Details.avgtime[i];
    }
    a.sort();
    setArr(a);
  };

  const checkQueue = () => {
    let user = localStorage.getItem("userid");
    console.log(user, user.toString());
    setInQueue(false);
    for (let i = 0; i < Details.queue.length; i++) {
      if (Details.queue.length && Details.queue[i]._id === user.toString()) {
        setCounter(Details.queue[i].counter + 1);
        setInQueue(true);
        break;
      } else {
        setInQueue(false);
      }
    }
  };

  useEffect(() => {
    findWait();
    let x = Details.avgtime.sort();
    setBT(x[0]);
    checkQueue();
  }, [Details]);

  return (
    <>
      <Navbar />
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className="flex flex-col lg:flex-row py-6">
          <div className="flex-1 p-4">
            <h1 className="text-2xl font-bold mb-2">{Details.name ? Details.name : t("store_name")}</h1>
            <div className="flex flex-wrap">
              <div className="p-4">
                <div className="text-center">
                  <img src={img1} alt="counters" className={homeStyles.icons} />
                  <div className={homeStyles.roundNo}>{Details.counter}</div>
                  <div className="text-center w-full">{t("counters")}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-center">
                  <TimerIcon className="text-gray-900 inline-block relative top-1.5" sx={{ fontSize: 40 }} />
                  <span className={`${homeStyles.yellowCapsule} relative bottom-1.5 p-1`}>
                    {arr[0] ? arr[0] : 0} {t("min")}
                  </span>
                  <div className="text-center w-full">{t("waiting_time")}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-center">
                  <img src={img2} alt="counters" className={homeStyles.icons} />
                  <div className={homeStyles.roundNo}>{Details.queue.length}</div>
                  <div className="text-center w-full">{t("customers")}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-center">
                  <img src={img3} alt="counters" className={homeStyles.icons} />
                  <span className={`${homeStyles.yellowCapsule} relative bottom-2.5 p-1`}>
                    {bT} {t("mins")}
                  </span>
                  <div className="text-center w-full">{t("billing_time")}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <AccessTimeIcon className="text-2xl" /> {t("open")} {Details.from ? Details.from : 9}.00AM-{Details.to ? Details.to : 6}.00PM
            </div>
            <div className="mt-4">
              {inQueue && (
                <div>
                  <h1 className="text-xl">{t("counter_allocated")}: {counter}</h1>
                </div>
              )}
              <h1 className="text-xl mt-4">{t("address")}</h1>
              <p className="w-11/12">
                {Details.Address ? Details.Address : t("address_placeholder")}
              </p>
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="map" dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.467007802244!2d77.49981541508355!3d28.675673582400844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf30885b1e2a5%3A0x9983675e24c6638b!2sAKGEC%3A%20Ajay%20Kumar%20Garg%20Engineering%20College%2C%20Ghaziabad!5e0!3m2!1sen!2sin!4v1652256701829!5m2!1sen!2sin' width='100%' height='400' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>" }} />
          </div>
        </div>
      </div>
      <div className='flex mx-auto'>
        {userShop === shop._id ?
          <a
            href={"/QueueManagement/create-store"}
            className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 text-center px-3 mx-auto'
          >
            {t("update_store")}
          </a>
          :
          <button className={inQueue ? homeStyles.leaveButton : homeStyles.enterButton} style={{ width: "20%", marginLeft: "40%", marginTop: "10px" }} onClick={() => join()}>
            {inQueue ? t("leave_queue") : t("join_queue")}
          </button>
        }
      </div>
      <p style={{ textAlign: "center", fontSize: "14px" }}>{t("ensure_near_store")}</p>
    </>
  );
};

export default StorePage;
