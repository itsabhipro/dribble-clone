import { ProjectInterface } from '@/common.type';
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react'

async function EditProject({params:{id}}:{params:{id:string}}) {
    const session = await getCurrentUser();
    const result = await getProjectDetails(id) as {project?:ProjectInterface};

    if(!session?.user){
        redirect("/")
    }
  return (
    <Modal>
        <h3 className='modal-head-text'>Edit project</h3>
        <ProjectForm type="edit" session={session} project={result?.project}/>
    </Modal>
  )
}

export default EditProject