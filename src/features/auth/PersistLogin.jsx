import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom"
import usePersist from '../../hooks/usePersist';
import { useRefreshMutation } from './authApiSlice'
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken)
  const [persist] = usePersist();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, {
    isUninitialized,
    isSuccess,
    isLoading,
    isError,
    error,
  }] = useRefreshMutation();


  // note: persist is happen after login

  useEffect(() => {

    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (error) {
        console.error(error)
      }
    }

    if (!token && persist) verifyRefreshToken();

    // eslint-disable-next-line
  }, [])

  // run and await the refresh

  let content;

  // failed paths
  if (!persist) { // persist: no
    console.log('no persist')
    content = <Outlet />
  } else if (isLoading) { //persist: yes, token: no
    console.log('loading')
    content = <p>Loading...</p>
  } else if (isError) { //persist: yes, token: no
    console.log('error')
    console.log({ error })
    content = (
      <p className='errmsg'>
        {error.data?.message}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  }

  // success paths
  else if (isSuccess && trueSuccess) {
    console.log('success')
    content = <Outlet />
  } else if (token && isUninitialized) {
    console.log('token and uninit')
    console.log(isUninitialized)
    content = <Outlet />
  }

  return (
    content
  )
}

export default PersistLogin