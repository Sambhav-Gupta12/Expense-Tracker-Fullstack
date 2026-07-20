import React from 'react'
import ProfileCard from './ProfileCard'
import PreferenceCard from './PreferenceCard'
import PrivacyCard from './PrivacyCard'

function Profile() {
  return (
    <div className='w-full h-full rounded-r-2xl bg-[#30302e] overflow-y-auto no-scrollbar px-2 pb-15 md:pb-0'>
      <div className="text-xl text-white ml-12 pt-3.5 font-semibold">Profile & Setting</div>
      <div className="text-[#b0b0ac] ml-12 mb-3.5">Manage your account and preferences</div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 max-w-6xl mx-auto">

        <ProfileCard />

        <div className="flex flex-col gap-5">
          <PreferenceCard />
          <PrivacyCard />
        </div>

      </div>
    </div>
  )
}

export default Profile