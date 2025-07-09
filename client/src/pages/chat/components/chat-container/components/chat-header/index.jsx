import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import { RiCloseFill } from 'react-icons/ri';

function ChatHeader() {
    const { closeChat, selectedChatData, selectedChatType } = useAppStore();

    return (
        <div className="h-[10vh] border-b-2 border-[#2f303b] flex justify-center items-center px-20">
            <div className="flex gap-5 items-center w-full justify-between">
                <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 relative">
                        {
                            selectedChatType === "contact" ? (
                        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                            {selectedChatData?.image ? (
                                <AvatarImage
                                    src={`${HOST}/${selectedChatData.image}`}
                                    alt="Profile"
                                    className="object-cover w-full h-full bg-black"
                                />
                            ) : (
                                <div
                                    className={`h-12 w-12 text-lg border-[1px] flex items-center justify-center font-semibold 
                                        ${getColor(selectedChatData?.color)}`}
                                >
                                    {selectedChatData?.firstName
                                        ? selectedChatData.firstName.charAt(0).toUpperCase()
                                        : selectedChatData?.email?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </Avatar>
                            ) :

                            (
                            <div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'>
                                #
                            </div>
                            )
                        }

                    </div>
                    <div>
                        {selectedChatType==="channel" && selectedChatData.name}
                        {selectedChatType === "contact"
                            ? (
                                selectedChatData.firstName && selectedChatData.lastName
                                    ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                                    : selectedChatData.email
                            )
                            : selectedChatData.email
                        }
                    </div>
                </div>
                <button
                    className="text-neutral-500 focus:border-none focus:outline-none duration-300 transition-all"
                    onClick={closeChat}
                >
                    <RiCloseFill className="text-3xl" />
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;