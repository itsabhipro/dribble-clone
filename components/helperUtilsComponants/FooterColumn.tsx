import Link from "next/link"
import { type } from "os"

type ColumnType = {
    title: string,
    links: Array<string>
}

function FooterColumn({title, links}:ColumnType) {
  return (
    <div className="footer_column">
        <h4 className="font-semibold">{title}</h4>
        <ul className="flex flex-col gap-2 font-normal">
            {
                links.map((link,index)=>(
                    <Link key={index} href={`/${link}`}>{link}</Link>
                ))
            }
        </ul>

    </div>
  )
}

export default FooterColumn