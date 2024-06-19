import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import styles from "./Homepage.module.css"
import Card from './Card/Card';
import ListElement from './ListElement';
import { SearchBar } from '../Header/SearchBar';
import { useDispatch } from 'react-redux';
import { allQueues, getNearby, getSingle } from '../../../redux/actions/LayoutAction';
import { useSelector } from 'react-redux/es/exports';
import Loader from '../Loaders/GifLoader';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const HomePage = () => {
  const [loc, setLoc] = useState({
    lat: 0,
    long: 0
  });

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("userid")
    console.log(user);
    if (user === null) {
      navigate("/login")
    }
  }, [])

  const [state, setState] = useState([])
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(parseFloat(loc.lat), parseFloat(loc.long));
      dispatch(getNearby(parseFloat(loc.lat), parseFloat(loc.long)))

    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    setLoc({ lat: position.coords.latitude, long: position.coords.longitude });
  }
  const dispatch = useDispatch();
  const nearby = useSelector((state) => state.LayoutReducer).nearby;
  const queues = useSelector(state => state.LayoutReducer).allQueues;

  useEffect(() => {
    console.log("here");
    getLocation()
    console.log(parseFloat(loc.lat), parseFloat(loc.long))
    dispatch(setLoader())
    dispatch(getNearby(parseFloat(loc.lat), parseFloat(loc.long)))
      .then(() => {
        dispatch(UnsetLoader())
      })
  }, [navigator.geolocation])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNearby = nearby.filter(n => {
    // Replace this condition with your actual filtering logic
    return n.shop.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    console.log("called");
    dispatch(setLoader())

    dispatch(allQueues())
      .then((res) => {
        console.log(res)
        setState(res)
        dispatch(UnsetLoader())

      })

  }, [])

  useEffect(() => {
    console.log(queues);
  }, [queues])

  const [store, setStore] = useState({ _id: '0', timeleft: '0' })


  return (
    <>
      <Navbar />
      <Header
        name={"Nearby Stores"}
      />

      <div className='max-w-7xl px-2 sm:px-6 lg:px-8 py-4 mx-auto'>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className=" max-w-7xl px-2 sm:px-6 lg:px-8 justify-center mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
        {filteredNearby.length === 0 ?
          (nearby.length === 0 ?
            <button onClick={getLocation}>Show Nearby</button>
            : <div>No results found.</div>)
          : filteredNearby.map(n => <Card key={n.id} n={n.shop} />)
        }
      </div>
      <Header
        name={"Queues Joined"}
      />
      <div>
        {queues.length === 0 ?
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-4'>
            <div className="px-2 py-2 border border-zinc-100 shadow-lg rounded-lg flex justify-between font-bold">Join some queues!!!</div>
          </div>
          :
          <></>
        }
        {state.map(x => {
          return <ListElement x={x} state={state} setState={setState} />
        })}
        {/* <ListElement/>
            <ListElement/>
            <ListElement/>
            <ListElement/> */}
      </div>

    </>
  )
}

export default HomePage