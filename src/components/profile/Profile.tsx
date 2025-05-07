
import { IoPersonOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Profile() {
   const{isLoggedIn}=useAuth()
  return (
    <>
    <div className="">

        <Link to={isLoggedIn ?`profile`:'/signin'}>

        <IoPersonOutline size={25} opacity={0.7} />
  
        </Link>
    </div>
    </>
  )
}

export default Profile