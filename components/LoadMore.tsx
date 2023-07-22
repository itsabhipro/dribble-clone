"use client"

import { useRouter } from "next/navigation";
import Button  from "./helperUtilsComponants/Button"

type Props = {
  startCursor:string;
  endCursor:String;
  hasPreviousPage:boolean;
  hasNextPage:boolean;
}
function LoadMore({startCursor, endCursor, hasPreviousPage, hasNextPage}:Props) {
  const router = useRouter();

  const handleNavigation = (direction:string) =>{
    const currentParams = new URLSearchParams(window.location.search);
    if(direction === 'next' && hasNextPage){
      currentParams.delete('startCursor')
      currentParams.set("endCursor",endCursor as string)
    }else if(direction === 'first' && hasPreviousPage){
      currentParams.delete("endCursor")
      currentParams.set('startCursor',startCursor)
    }
    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`
    router.push(newPathname)
  }
  return (
    <div className="w-full flexCenter gap-5 mt-10">{
      hasPreviousPage && (
        <Button type="button" title="First Page" handleClick={()=>handleNavigation('first')}/>
      )}
       {
        hasNextPage && (
          <Button type="button" title="Next Page" handleClick={()=>handleNavigation('next')}/>
        )
       }
      </div>
  )
}

export default LoadMore