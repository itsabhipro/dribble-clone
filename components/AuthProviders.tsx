'use client'

import { getProviders, signIn } from "next-auth/react"
import { type } from "os";
import { useState, useEffect } from "react";
import Button from "./helperUtilsComponants/Button";

type Provider = {
  id: string,
  name: string,
  type: string,
  signinUrl: string,
  callbackUrl: string,
  siginUrlParams?: Record<string,string> | null
}
type Providers = Record<string,Provider>

function AuthProviders() {
  const [providers, setproviders] = useState<Providers | null>(null);

  useEffect(()=>{
    const fetchProviders = async ()=>{
      const res = await getProviders();
      setproviders(res)
    }
    fetchProviders()
  },[])
  if(providers){
    return (
      <div>
        {
          Object.values(providers).map((provider:Provider, index)=> (
            <Button type="button" key={index} handleClick={()=>signIn(provider.id)} title="Sign In"/>
          ))
        }
      </div>
    )
  }
}

export default AuthProviders