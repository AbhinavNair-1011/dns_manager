import React, { useContext, useEffect, useState } from 'react'
import "./dnsList.css"
import CloseButton from './closeButton/CloseButton'
import { AuthContext } from '../../store/authContext'

const DnsList = () => {
   
   
    const {domainData,setDomainData}= useContext(AuthContext)
   


  return (
   <ul className='dns-ul'>
    {domainData.length>0 ? domainData.map((data,index)=>(
        <li key={index} id={data ? data.hostedZoneId: "1"} className="dns-list">
                { data!=null ? data.data.map((item,index)=>(
                    
                   <div key={index} className='dns-list-container'>
                   
                    <p className='dns-list-name'>Domain Name : {item.Name}</p>
                    <p className='dns-list-type'>Type : {item.Type}</p>
                    <p className="dns-list-ttl">TTL : {item.TTL}</p>
                    <div className='dns-list-rrDiv'>
                        {item.ResourceRecords.map((rr,index)=>(
                            <p key={index}className='dns-list-rr'>Resource Records : {rr.Value}</p>
                        ))} 
                    </div>

                    </div>
                )) : "NO RECORD ADDED"} 
                <CloseButton/>
        </li>

    )

    ) : <p className='noRecord'>NO RECORD ADDED</p> }
   </ul>
  )
}

export default DnsList