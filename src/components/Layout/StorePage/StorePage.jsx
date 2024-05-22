import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import SearchBar from '../SearchBar/SearchBar'
// import Geocode from "react-geocode";
// import axios from 'axios';
import styles from "./store.module.css"
import homeStyles from "../Homepage/Homepage.module.css"
import img1 from "../../Assets/img1.png"
import img2 from "../../Assets/img2.png"
import img3 from "../../Assets/img3.png"
import TimerIcon from '@mui/icons-material/Timer';
import { useNavigate } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { allQueues, getSingle, joinQueue } from '../../../redux/actions/LayoutAction'
import axios from 'axios'
import Url from '../../../services/BaseUrl'
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions'

const StorePage = () => {
  const [loc, setLoc] = useState({
    lat: 0,
    long: 0
  });
  const [inQueue, setInQueue] = useState(false)
  const [counter, setCounter] = useState(0)

  // let Details = {about:"",billingTime:0,counter:0,frm:9,id:0,latitude:"0",longitude:"0",name:"",peopleCount:0,to:6,waitingTime:0}
  let location = useLocation();
  let dispatch = useDispatch();
  useEffect(() => {
    let id = location.pathname.split("/")[2]
    console.log(`this is the ${id}`);
    dispatch(setLoader())
    dispatch(getSingle(id))
      .then(() => {
        dispatch(UnsetLoader())
      })

  }, [])




  let Details = useSelector((state) => state.LayoutReducer).single

  //  console.log(Details);

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

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return (c * r);
  }

  let d = distance(28.7536971, 28.648037, 77.5045989, 77.441118)
  //shiwalastart
  // const [loc,setLoc]= useState({
  //     lat: 0,
  //     long: 0
  //  });
  //  const [src,setSrc]= useState("");
  // function getLocation() {

  // }
  // function showPosition(position) {
  //     setLoc({lat: position.coords.latitude, long: position.coords.longitude});

  //     axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=28.6457856,77.4144&sensor=false&key=AIzaSyCSn980AvnRr57-fDNNoWF_ozWG-8fMF5w")
  //     .then(res=>{
  //       console.log(res.data.results[0].formatted_address);
  //     setSrc("https://www.google.com/maps/embed/v1/place?key=AIzaSyCSn980AvnRr57-fDNNoWF_ozWG-8fMF5w&center="+position.coords.latitude+","+position.coords.longitude+"&q="+res.data.results[0].formatted_address+"&zoom=9")

  //     })
  //     .catch(err=>{
  //       console.log(err);
  //     })
  // }
  // useEffect(()=>{
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     console.log( "Geolocation is not supported by this browser.");
  //   }
  //shiwalaend
  // Geocode.setApiKey("AIzaSyCSn980AvnRr57-fDNNoWF_ozWG-8fMF5w");
  // Geocode.fromLatLng(loc.lat, loc.long).then(
  //   (response) => {
  //     const address = response.results[0].formatted_address;
  //     let city, state, country;
  //     for (let i = 0; i < response.results[0].address_components.length; i++) {
  //       for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
  //         switch (response.results[0].address_components[i].types[j]) {
  //           case "locality":
  //             city = response.results[0].address_components[i].long_name;
  //             break;
  //           case "administrative_area_level_1":
  //             state = response.results[0].address_components[i].long_name;
  //             break;
  //           case "country":
  //             country = response.results[0].address_components[i].long_name;
  //             break;
  //         }
  //       }
  //     }
  //     console.log(city, state, country);
  //     console.log(address);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
  // fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+loc.lat+","+loc.long+"&sensor=false&key=AIzaSyCSn980AvnRr57-fDNNoWF_ozWG-8fMF5w")

  let navigate = useNavigate()
  const join = () => {
    dispatch(setLoader())

    if (!inQueue) {
      dispatch(joinQueue(location.pathname.split("/")[2]))
        .then(() => {
          navigate("/")
        })

    } else {

      var today = new Date();
      var time = parseInt(parseInt(today.getHours()) * 60 + parseInt(today.getMinutes()));
      let userid = localStorage.getItem("userid")

      axios
        .post(Url + "store/removeuser", {
          shopid: Details._id,
          time,
          counter,
          userid
        })
        .then((res) => {
          console.log(res);
          dispatch(setLoader())
          navigate("/")
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }
  let [arr, setArr] = useState([0])
  let [bT, setBT] = useState(0)
  const findWait = () => {
    let a = new Array(Details.counter)
    for (let i = 0; i < Details.counter; i++) {
      a[i] = Details.ShopCounter[i] * Details.avgtime[i]
    }
    a.sort();
    console.log(a);
    setArr(a)
  }

  const checkQueue = () => {

    let user = localStorage.getItem("userid")
    console.log(user, user.toString());
    setInQueue(false)
    for (let i = 0; i < Details.queue.length; i++) {

      if (Details.queue.length && Details.queue[i]._id === user.toString()) {
        setCounter(Details.queue[i].counter + 1)
        setInQueue(true)
        break
      }
      else {
        setInQueue(false)
      }
    }

    // dispatch(UnsetLoader())
  }
  useEffect(() => {
    // dispatch(setLoader())

    findWait()
    let x = Details.avgtime.sort()
    setBT(x[0])
    checkQueue()
  }, [Details])
  return (
    <>
      <Navbar />
      <SearchBar />
      {/* <h3>Get current location of Customer: <button type="submit" onClick={getLocation}>Try</button> </h3>
      <div>{loc.lat},{loc.long}, {d} kms</div> */}
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.left}>
              <h1 className={homeStyles.mainHead} style={{ margin: "0" }}>{Details.name ? Details.name : "Store Name"}</h1>
              <table>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px" }}>
                      <div>
                        <img src={img1} alt="counters" className={homeStyles.icons} /><div className={homeStyles.roundNo}>{Details.counter}</div>
                        <div style={{ textAlign: "center", width: "100%" }}>Counters</div>
                      </div>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <div>
                        <TimerIcon style={{ position: "relative", color: "#192839", fontSize: "38px", display: "inline-block", top: "6px" }} /><span className={homeStyles.yellowCapsule} style={{ margin: "0", position: "relative", bottom: "6px", padding: "2px 5px" }}>
                          {arr[0] ? arr[0] : 0} min
                        </span>
                        <div style={{ textAlign: "center", width: "100%" }}>Waiting time</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px" }}>
                      <div>
                        <img src={img2} alt="counters" className={homeStyles.icons} /><div className={homeStyles.roundNo}>{Details.queue.length}</div>
                        <div style={{ textAlign: "center", width: "100%" }}>Customers</div>
                      </div>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <div>
                        <img src={img3} alt="counters" className={homeStyles.icons} /><span className={homeStyles.yellowCapsule} style={{ margin: "0", position: "relative", bottom: "10px", padding: "2px 5px" }}>
                          {bT} mins
                        </span>
                        <div style={{ textAlign: "center", width: "100%" }}>Billing time</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <AccessTimeIcon fontSize='large' style={{ position: "relative", top: "10px" }} /> Open {Details.from ? Details.from : 9}.00AM-{Details.to ? Details.to : 6}.00PM
              <div>

                <br></br>
                {inQueue ? <div>
                  <h1>Counter alloted:{counter}</h1>
                </div> : <></>}
                <br></br>
                <h1>Address</h1>
                <p style={{ width: "90%" }}>{Details.Address ? Details.Address : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur feugiat ex sed gravida. Proin eu orci varius, dictum erat ac, ullamcorper arcu. Aliquam erat volutpat.Nam sagittis leo "} </p>
              </div>
            </td>


            <td className={styles.right}>
              <div className="map" dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.467007802244!2d77.49981541508355!3d28.675673582400844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf30885b1e2a5%3A0x9983675e24c6638b!2sAKGEC%3A%20Ajay%20Kumar%20Garg%20Engineering%20College%2C%20Ghaziabad!5e0!3m2!1sen!2sin!4v1652256701829!5m2!1sen!2sin' width='100%' height='400' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>" }} />
            </td>
          </tr>
        </tbody>
      </table>

      <button className={inQueue ? homeStyles.leaveButton : homeStyles.enterButton} style={{ width: "20%", marginLeft: "40%", marginTop: "10px" }} onClick={() => join()}>
        {inQueue ? "Leave Queue" : "Join Queue"}
      </button>
      <p style={{ textAlign: "center", fontSize: "14px" }}>Ensure to be physically near the store.</p>
    </>
  )
}

export default StorePage