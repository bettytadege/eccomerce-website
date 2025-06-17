import { CgProfile } from "react-icons/cg";
import { Card } from "../ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuth } from "firebase/auth";


function ProfileMenu({ setOpen }) {
  const { userData } = useAuth();
  const navigate = useNavigate();
 
 
  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="relative ">
        <div className="absolute right-6 top-2">
          <Card className="w-[300px] py-4 ">
            <div className="flex gap-5 text-xs items-center mx-5 text">
              <CgProfile size={27} opacity={0.5} />
              <span className="text-gray-500">{userData.email}</span>
            </div>
            <hr className=" mx-5 mt-2" />
            <ul className="space-y-2 text-sm w-full px-3">
              <li className="hover:bg-[#F5F5F5] py-2.5 w-full transition-all duration-200">
                <button
                  className="px-6"
                  onClick={() => {
                    navigate(`/profile/editprofile`);
                    setOpen(false);
                  }}
                >
                  Profile
                </button>
              </li>
              <li className="hover:bg-[#F5F5F5] py-2.5  transition-all duration-200">
                <Link to="" className=" px-6">
                  Settings
                </Link>
              </li>
              <li className="hover:bg-[#F5F5F5] py-2.5 w-full transition-all duration-200">
                <button className=" px-6" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </Card>
        </div>
      </div>

    </>
  );
}

export default ProfileMenu;
