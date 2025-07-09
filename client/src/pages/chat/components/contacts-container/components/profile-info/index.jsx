import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/store';
import { getColor } from '@/lib/utils';
import { HOST, LOGOUT_ROUTE } from '@/utils/constants';
import { FiEdit2 } from 'react-icons/fi';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useNavigate } from 'react-router-dom';
import { IoPowerSharp } from 'react-icons/io5';
import { apiClient } from '@/lib/api-client';

function ProfileInfo() {
        const {userInfo, setUserInfo} = useAppStore();
        const navigate = useNavigate();

        const logout = async() => {
            try{
                const response = await apiClient.post(
                    LOGOUT_ROUTE,
                    {},
                    {withCredentials: true}
                );

                if(response.status === 200){
                    navigate('/auth');
                    setUserInfo(null);
                }
            }catch(err){
                console.log(err);
            }
        }

return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33] border-t border-gray-700 shadow-lg">
        <div className="flex gap-3 items-center justify-center">
            <div className="w-12 h-12 relative">
                <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                    {userInfo.image ? (
                        <AvatarImage
                            src={`${HOST}/${userInfo.image}`}
                            alt="Profile"
                            className="object-cover w-full h-full bg-black"
                        />
                    ) : (
                        <div className={`h-12 w-12 text-lg border-[1px] flex items-center justify-center font-semibold ${getColor(userInfo.selectedColor)}`}>
                            {userInfo.firstName ? userInfo.firstName.charAt(0).toUpperCase() : userInfo.email.charAt(0).toUpperCase()}
                        </div>
                    )}
                </Avatar>
            </div>
            <div>
                {userInfo.firstName && userInfo.lastName 
                    ? `${userInfo.firstName} ${userInfo.lastName}`
                    : "Unknown User"}
            </div>
        </div>
        <div className="flex gap-5">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FiEdit2 className='text-purple-500 text-xl font-medium'
                        onClick={() => navigate('/profile')}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#2a2b33] text-white p-2 rounded-md shadow-lg">
                        <p>Edit Profile</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
                        <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <IoPowerSharp className='text-purple-500 text-xl font-medium'
                        onClick={logout}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#2a2b33] text-white p-2 rounded-md shadow-lg">
                        <p>Logout</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
)
}

export default ProfileInfo