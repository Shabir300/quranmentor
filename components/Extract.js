import React from 'react'

const Extract = () => {
  return (
    <div>
        
<ul className="flex flex-col gap-1 mt-24 max-h-[50vh] overflow-y-scroll">


    {visibleUsersSet.map((user) => (
      
      
      <li
      key={user.email}
      className="flex flex-row pb-2 items-center gap-5 border-b border-black/20  pl-4"
        >
        <div className='w-10 h-auto'>

          <img
            src={user.ProfilePic}
            alt="Profile Pic"
            className="rounded-full w-full "
            />

        </div>

      {/* <sl-avatar
          image={user.ProfilePic}
          label="Teacher"
        ></sl-avatar> */}

        <div className="flex flex-col w-full ">
          <div className='flex flex-row justify-between mr-5'>

            <Link href='/teacher'>

              <div className='mr-16'>
                <p className="font-[georgia]  text-lg">{user.FullName}</p>
              </div>

            </Link>


    


          </div>

            <p className="font-helvetica  text-md">{user.Headline}</p>
            
            <p className="font-thin text-sm mt-2 ">{user.About.substring(0, 100)}</p>

          <div className="flex flex-row gap-4">


          </div>

          <div className='flex gap-2 '>

            <button
              className=' h-fit w-fit text-[#36ac5e] border border-[#36ac5e] px-3 py-1 rounded-full'
              style={{ width: 'fit-content', marginTop: '1rem' }}
              >
              <a href={`mailto:${user.Email}`} className="font-thin text-lg">
                <MdEmail  />
              </a>

            </button>

            

            <button
              className=' h-fit w-fit text-[#36ac5e] border border-[#36ac5e] px-3 py-1 rounded-full'
              onClick={() => sendWhatsappMessage(user.Phone)}
              style={{width: 'fit-content', marginTop: '1rem',}}
              >

              <a href="" className='font-thin text-lg'><FaWhatsapp /></a>

            </button>

            
            <button
              className='h-fit w-fit  text-[#36ac5e] border border-[#36ac5e] px-3 py-1 rounded-full'
              onClick={() => makeCall(user.Phone)}
              style={{ width: 'fit-content', marginTop: '1rem' }}
              
              >
              <span className="font-thin text-lg"><FiPhoneCall  /></span>

            </button>

          </div>

        </div>
      </li>
    ))}
  </ul>
  
  </div>
  )
}

export default Extract