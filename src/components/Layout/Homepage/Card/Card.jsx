import React, { useEffect, useState } from 'react'
import styles from "../Homepage.module.css"
import img1 from "../../../Assets/img1.png"
import img2 from "../../../Assets/img2.png"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TimerIcon from '@mui/icons-material/Timer';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    let user = localStorage.getItem("userid")
    if (user === null) {
      navigate("/login")
    }
  }, [])
  // console.log(props)
  // let arr=[0];
  let [arr, setArr] = useState([0])
  const [inQueue, setInQueue] = useState(false)

  const [timer, setTimer] = useState(0)

  // let dispatch = useDispatch();
  const open = (id) => {
    // dispatch(getSingle(id))
    navigate("/store/" + id);
  }


  useEffect(() => {
    findWait()
    checkQueue()
  }, [props])
  const findWait = () => {
    let a = new Array(props.n.counter)
    for (let i = 0; i < props.n.counter; i++) {
      a[i] = props.n.ShopCounter[i] * props.n.avgtime[i]
      // setArr(arr=>[...arr,props.n.ShopCounter[i]*props.n.avgtime[i]])
    }
    a.sort();
    setArr(a)
    setTimer(a[0] * 60)
  }
  const checkQueue = () => {
    let user = localStorage.getItem("userid")
    setInQueue(false)

    for (let i = 0; i < props.n.queue.length; i++) {
      if (user !== null && props.n.queue[i]._id === user.toString()) {
        setInQueue(true)
        break
      }
      else {
        setInQueue(false)
      }
    }
  }
  useEffect(() => {
    setInterval(() => {
      setTimer(timer => timer - 1)
    }, 1000)
  }, [])
  return (
    <div className={styles.card}>
      <h1 className={styles.head}>{props.n.name}</h1>
      <div className='flex w-full justify-center gap-8 mt-2'>
        <div className='flex flex-col justify-center items-center'>
          <img src={img1} alt="counters" className={styles.icons} /><div className={styles.roundNo}>{props.n.counter}</div>
          <div style={{ textAlign: "center", width: "100%" }}>Counters</div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <img src={img2} alt="counters" className={styles.icons} /><div className={styles.roundNo}>{props.n.queue.length}</div>
          <div style={{ textAlign: "center", width: "100%" }}>Customers</div>
        </div>
      </div>
      <div className='flex gap-2 items-center justify-center mb-2'>
        <LocationOnIcon fontSize='small' /> Address of the store here...
      </div>
      <div className='flex gap-2 items-center justify-center mb-2'>
        <TimerIcon fontSize='small' /> Waiting Time
      </div>
      <div className={styles.yellowCapsule}>
        {/* {arr[0]} */}
        {timer > 0 ? <p>
          {Math.floor(timer / 60)} mins:{Math.floor(timer % 60)} secs
        </p> : <p>
          0 mins
        </p>}
      </div>
      <button className={inQueue ? styles.leaveButton : styles.enterButton} onClick={() => open(props.n._id)}>
        {inQueue ? "Leave Queue" : "Join Queue"}
      </button>
    </div>
  )
}

export default Card