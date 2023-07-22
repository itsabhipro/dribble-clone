import Image from "next/image"
import Link from "next/link"
import { NavLinks } from "@/constants"
import AuthProviders from "@/components/AuthProviders"
import ProfileMenu from "@/components/ProfileMenu";
import { signOut, useSession } from "next-auth/react"
import { getCurrentUser } from "@/lib/session"

async function Navbar() {
const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
        <div className="flex-1 flexStart gap-10">
            <Link href="/">
                <Image src="/logo.svg" width={115} height={43} alt="dribble-clone-logo"/>
            </Link>
            <ul className="xl:flex hidden text-small gap-7">
                {
                    NavLinks.map((nav,index)=>(
                        <Link key={nav.key} href={nav.href}>{nav.text}</Link>
                    ))
                }
            </ul>
        </div>
        <div className="flexCenter gap-4">
            {
                session?.user ? (
                    <>
                    <ProfileMenu session={session} />
                    <Link href="/create-project">Share Work</Link>
                    </>
                ):(
                    <AuthProviders />
                )
            }
        </div>
    </nav>
  )
}

export default Navbar