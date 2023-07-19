import Image from "next/image"
import FooterColumn from "./helperUtilsComponants/FooterColumn"
import { footerLinks } from "@/constants"

function Footer() {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image src="/logo-purple.svg" width={115} height={38} alt="dribble-clone"/>
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Dribble-clone is the world's leading community for creatives to share, grow, and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {
            footerLinks.map((link,index)=>(
              <FooterColumn key={index} title={link.title} links={link.links}/>
            ))
          }
        </div>
        <div className="flexBetween footer_copyright">
        <p>@ 2023 Dribble-clone. All rights reserved</p>
        <p className="text-gray">
          <span className="text-black font-semibold">10,214</span> project submitted.
        </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer