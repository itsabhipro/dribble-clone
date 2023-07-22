"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type } from "os"
import { deleteProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
    projectId:string;
}

function ProjectActions({projectId}:Props) {
    const [deleting, setdeleting] = useState(false);
    const router = useRouter();
    async function handleDelete(){
        setdeleting(true)
        const {token} = await fetchToken();
        try {
            if(confirm(`Are sure to delete this project?`)){
                await deleteProject(projectId,token);
                router.push("/");
            }
        } catch (error) {
            console.log(error)
        }finally{
            setdeleting(false)
        }
    }
  return (
    <>
        <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
            <Image src="/pencile.svg" width={15} height={15} alt="edit"/>
        </Link>
        <button type="button" className={`flexCenter delete-action_btn ${deleting ? 'bg-gray':'bg-primary-purple'}`} onClick={handleDelete} disabled={deleting}>
            <Image src="/trash.svg" width={15} height={15} alt="delete"/>
        </button>
    </>
  )
}

export default ProjectActions