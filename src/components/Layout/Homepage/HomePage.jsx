import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './Homepage.module.css';
import Card from './Card/Card';
import ListElement from './ListElement';
import { useDispatch, useSelector } from 'react-redux';
import { allQueues, getNearby } from '../../../redux/actions/LayoutAction';
import Loader from '../Loaders/GifLoader';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  const [loc, setLoc] = useState({ lat: 0, long: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("userid");
    if (user === null) {
      navigate("/login");
    }
  }, [navigate]);

  const dispatch = useDispatch();
  const nearby = useSelector((state) => state.LayoutReducer.nearby);
  const queues = useSelector(state => state.LayoutReducer.allQueues);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    const showPosition = (position) => {
      setLoc({ lat: position.coords.latitude, long: position.coords.longitude });
      dispatch(getNearby(position.coords.latitude, position.coords.longitude));
    };

    getLocation();
    dispatch(setLoader());
    dispatch(getNearby(loc.lat, loc.long))
      .then(() => {
        dispatch(UnsetLoader());
      });
  }, [dispatch, loc.lat, loc.long]);

  useEffect(() => {
    dispatch(setLoader());
    dispatch(allQueues())
      .then((res) => {
        setState(res);
        dispatch(UnsetLoader());
      });
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredNearby = nearby.filter(n =>
    n.shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [state, setState] = useState([]);
  const [store, setStore] = useState({ _id: '0', timeleft: '0' });

  return (
    <>
      <Navbar />
      <Header name={t('nearby_stores')} />

      <div className='max-w-7xl px-2 sm:px-6 lg:px-8 py-4 mx-auto'>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={t('search')}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8 justify-center mx-auto grid lg:grid-cols-4 lg:justify-between md:grid-cols-3 sm:grid-cols-2 gap-8">
        {filteredNearby.length === 0 ? (
          nearby.length === 0 ? (
            <button onClick={() => dispatch(getNearby(loc.lat, loc.long))}>{t('show_nearby')}</button>
          ) : (
            <div>{t('no_results_found')}</div>
          )
        ) : (
          filteredNearby.map(n => <Card key={n.id} n={n.shop} />)
        )}
      </div>
      <Header name={t('queues_joined')} />
      <div>
        {queues.length === 0 ? (
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-4'>
            <div className="px-2 py-2 border border-zinc-100 shadow-lg rounded-lg flex justify-between font-bold">{t('join_some_queues')}</div>
          </div>
        ) : (
          state.map(x => <ListElement key={x._id} x={x} state={state} setState={setState} />)
        )}
      </div>
    </>
  );
};

export default HomePage;
