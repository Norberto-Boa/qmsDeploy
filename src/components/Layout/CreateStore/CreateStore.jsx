import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import styles from "./create.module.css"
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import img1 from "../../Assets/img1.png"
import img2 from "../../Assets/img2.png"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import homeStyles from "../Homepage/Homepage.module.css"
import img3 from "../../Assets/img3.png"
import TimerIcon from '@mui/icons-material/Timer';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports';
import { addStoreDetails, checkStore } from '../../../redux/actions/LayoutAction';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
import { message } from 'antd';



const CreateStore = () => {
    let navigate = useNavigate()
    const [strName, setStrName] = useState("");
    const [ctr, setCtr] = useState(0);
    const [billTime, setBillTime] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [ShopCounter, setShopCounter] = useState([]);
    const [countertime, setCountertime] = useState([]);
    const [avgtime, setAvgtime] = useState([]);
    const [about, setAbout] = useState("");
    const [loc, setLoc] = useState({
        lat: 0,
        long: 0
    });
    const [storeDetails, setStoreDetails] = useState([])

    let dispatch = useDispatch();

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




    const funSub = () => {
        let a = new Array(ctr);
        for (let i = 0; i < ctr; ++i) a[i] = 0;

        console.log(a);
        console.log(strName, parseInt(billTime), parseInt(from), parseInt(to), parseInt(ctr), loc.lat.toString(), loc.long.toString(), about);
        dispatch(setLoader())
        dispatch(addStoreDetails(strName, parseInt(ctr), about, a, a, a, parseFloat(loc.lat), parseFloat(loc.long)))
            .then((res) => {
                dispatch(UnsetLoader())
                navigate(`/store/${res.data._id}`);
                // message.success("Store Created!");
            })
            .catch(() => {

                // message.success("Store Created!")

                dispatch(UnsetLoader())

            })
    }

    useEffect(() => {
        let user = localStorage.getItem("userid")
        if (user === null) {
            navigate("/")
        }
        dispatch(setLoader())
        dispatch(checkStore())
            .then((res) => {
                dispatch(UnsetLoader())
                console.log(storeDetails.name)
                console.log(res.data);
                setStoreDetails(res.data)
                console.log(storeDetails);
                setStrName(res.data.name)
                setAbout(res.data.Address)
                setCtr(res.data.counter)
                setLoc({
                    lat: res.data.latti,
                    long: res.data.long
                })

            })
            .catch((err) => {
                console.log(err.status)
                dispatch(UnsetLoader())
                setStoreDetails([])
            })
    }, [])

    return (
        <>
            <Navbar />
            <div className="container justify-between items-center flex mx-auto">
                <div className={"w-1/2 mt-8"}>
                    <div className="space-y-6 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                        <h1 className="text-3xl font-bold mb-4">Edit Store Details</h1>

                        <div className="flex items-center space-x-3">
                            <StoreMallDirectoryIcon className="text-3xl text-gray-700" />
                            <input
                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                placeholder="Store Name"
                                value={strName}
                                onChange={(e) => setStrName(e.target.value)}
                            />
                        </div>

                        <div className="w-full">
                            <select
                                className="w-full border-2 border-gray-700 rounded-lg px-4 py-3 text-gray-700 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                aria-label="Default select example"
                            >
                                <option selected>Store type</option>
                                <option value="1">General store</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-3">
                            <img src={img1} alt="counters" className="w-10 h-10" />
                            <input
                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                placeholder="Number of counters"
                                value={ctr}
                                onChange={(e) => setCtr(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-3 gap-4">
                            <LocationOnIcon className="text-3xl text-gray-700" />
                            <button
                                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:ring focus:ring-blue-200"
                                onClick={getLocation}
                            >
                                Get coordinates
                            </button>
                            <p className="text-gray-600">{loc.lat}, {loc.long}</p>
                        </div>



                        <div className="flex items-center space-x-3">
                            <img src={img2} alt="counters" className="w-10 h-10" />
                            <input
                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                placeholder="Billing Time"
                                value={billTime}
                                onChange={(e) => setBillTime(e.target.value)}
                            />
                        </div>

                        <p className="text-sm text-gray-500 ml-3">Waiting time will be calculated automatically.</p>

                        <div className="flex items-center space-x-3">
                            <AccessTimeIcon className="text-3xl text-gray-700" />
                            <input
                                className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                placeholder="From"
                                value={from}
                                onChange={e => setFrom(e.target.value)}
                            />
                            <input
                                className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                placeholder="To"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>

                        <div className="flex items-start space-x-3">
                            <InfoIcon className="text-3xl text-gray-700 mt-2" />
                            <textarea
                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
                                placeholder="About"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            ></textarea>
                        </div>
                    </div>


                    <div className="flex space-x-4 mt-4">
                        <button
                            className={`flex-grow bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:ring focus:ring-blue-200`}
                            onClick={() => funSub()}
                        >
                            {storeDetails.name ? "Update" : "Create"}
                        </button>

                        <button
                            className={`flex-grow bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:ring focus:ring-blue-200`}
                            onClick={() => navigate("/view-queue/id")}
                        >
                            View queue
                        </button>
                    </div>

                    <button
                        className={`w-full mt-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:ring focus:ring-blue-200`}
                        onClick={() => navigate("/chart")}
                    >
                        View Store Analytics
                    </button>

                    {/* <button className={homeStyles.enterButton} style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }} onClick={() => funSub()}>
                        {storeDetails.name ? "Update" : "Create"}
                    </button>
                    <button className={homeStyles.enterButton} style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }} onClick={() => navigate("/view-queue/id")}>
                        View queue
                    </button>
                    <button className={homeStyles.enterButton} style={{ width: "50%", marginLeft: "15%", marginTop: "10px" }} onClick={() => navigate("/chart")}>
                        View Store Analytics
                    </button> */}
                </div>


                <div className={styles.box}>
                    <h1>Store Preview</h1>
                    <div className={styles.mobile}>
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <td className={styles.left}>
                                        <h1 className={homeStyles.mainHead} style={{ margin: "0" }}>{strName !== "" ? strName : "Store Name"}</h1>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: "10px" }}>
                                                        <div>
                                                            <img src={img1} alt="counters" className={homeStyles.icons} /><div className={homeStyles.roundNo}>{ctr ? ctr : "0"}</div>
                                                            <div style={{ textAlign: "center", width: "100%" }}>Counters</div>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: "10px" }}>
                                                        <div>
                                                            <TimerIcon style={{ position: "relative", color: "#192839", fontSize: "38px", display: "inline-block", top: "6px" }} /><span className={homeStyles.yellowCapsule} style={{ margin: "0", position: "relative", bottom: "6px", padding: "2px 5px" }}>
                                                                Xhr XXmin XXXsec
                                                            </span>
                                                            <div style={{ textAlign: "center", width: "100%" }}>Waiting time</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: "10px" }}>
                                                        <div>
                                                            <img src={img2} alt="counters" className={homeStyles.icons} /><div className={homeStyles.roundNo}>X</div>
                                                            <div style={{ textAlign: "center", width: "100%" }}>Customers</div>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: "10px" }}>
                                                        <div>
                                                            <img src={img3} alt="counters" className={homeStyles.icons} /><span className={homeStyles.yellowCapsule} style={{ margin: "0", position: "relative", bottom: "10px", padding: "2px 5px" }}>
                                                                {billTime ? billTime : "0"} min
                                                            </span>
                                                            <div style={{ textAlign: "center", width: "100%" }}>Billing time</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <AccessTimeIcon fontSize='large' style={{ position: "relative", top: "10px" }} /> Open {from ? from : "9"}.00AM-{to ? to : "6"}.00PM

                                        <div>
                                            <h1>Address</h1>
                                            <p style={{ width: "90%" }}>{about ? about : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur feugiat ex sed gravida. Proin eu orci varius, dictum erat ac, ullamcorper arcu. Aliquam erat volutpat.Nam sagittis leo ut nibh vehicula, in venenatis velit laoreet. "} </p>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                        <button className={homeStyles.enterButton} style={{ width: "40%", marginLeft: "30%", marginTop: "10px" }} onClick={() => navigate("/")}>
                            Join Queue
                        </button>
                        <p style={{ textAlign: "center", fontSize: "14px" }}>Ensure to be physically near the store.</p>
                    </div>
                    <button className={homeStyles.enterButton} style={{ width: "50%", marginLeft: "15%", marginTop: "10px", backgroundColor: "#FF8898", boxShadow: "0px 4px 15px #FF8898", borderColor: "#FF8898" }}>
                        Close Store
                    </button>
                    <br />
                    <br />

                </div>

            </div>
        </>
    )
}

export default CreateStore