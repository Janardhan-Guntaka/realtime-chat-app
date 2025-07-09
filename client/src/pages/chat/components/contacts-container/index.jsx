import React, { useEffect } from 'react'
import ProfileInfo from './components/profile-info';
import NewDM from './components/new-dm';
import { apiClient } from '@/lib/api-client';
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNEL_ROUTE } from '@/utils/constants';
import { useAppStore } from '@/store';
import ContactList from '@/components/contact-list';
import CreateChannel from './components/create-channel';

const ContactsContainer = () => {

  const { setDirectMessagesContacts, directMessagesContacts, channels, setChannels } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true
      });
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts);
      }
    };

      const getChannels = async () => {
      const response = await apiClient.get(GET_USER_CHANNEL_ROUTE, {
        withCredentials: true
      });
      if (response.data.channels) {
        setChannels(response.data.channels);
      }
    };

    getChannels();
    getContacts();
  }, [setChannels, setDirectMessagesContacts])

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className='pt-3'>
        <Logo />
      </div>
      <div className='my-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text="Direct Messages " />
          <NewDM />
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <ContactList contacts = {directMessagesContacts} />
        </div>
      </div>
      <div className='my-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text="Channels" />
          <CreateChannel />
        </div>
                <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <ContactList contacts = {channels} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ContactsContainer




const Logo = () => (
  <div className="flex p-5 justify-start items-center gap-3">
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chat-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a16ee8" />
          <stop offset="1" stopColor="#ff006e" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#chat-gradient)" />
      <ellipse cx="24" cy="24" rx="14" ry="10" fill="#fff" opacity="0.9" />
      <ellipse cx="19" cy="24" rx="2.5" ry="2.5" fill="#a16ee8" />
      <ellipse cx="29" cy="24" rx="2.5" ry="2.5" fill="#a16ee8" />
      <path
        d="M24 34c4 0 7-2 7-2"
        stroke="#ff006e"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
    <span className="text-3xl font-extrabold bg-gradient-to-r from-[#a16ee8] to-[#ff006e] bg-clip-text text-transparent tracking-tight">
      Texty
    </span>
  </div>
);



const Title = ({ text }) => {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm'>
      {text}
    </h6>
  )
}