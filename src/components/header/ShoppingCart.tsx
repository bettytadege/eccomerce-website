
import { PiShoppingCartSimpleThin } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function ShoppingCart() {
  const { userData } = useAuth(); 
  const userId = userData?.id;
  return (
    <>
    <div className="">
        <Link to={`/cart/${userId}`}><PiShoppingCartSimpleThin size={25} /></Link>
    </div>
    </>
  )
}

export default ShoppingCart