"use client"

import { ProjectForm, ProjectInterface, SessionInterface } from '@/common.type'
import { type } from 'os'
import { useState} from 'react'
import Image from 'next/image'
import FormField from './helperUtilsComponants/FormField'
import { categoryFilters } from '@/constants'
import CustomMenu from './helperUtilsComponants/CustomMenu'
import Button from './helperUtilsComponants/Button'
import { createNewProject, fetchToken, updateProject } from '@/lib/actions'
import { useRouter } from 'next/navigation'

type Props = {
    type:string,
    session: SessionInterface,
    project?:ProjectInterface
}

type ProjectFormType = {
    title:string;
    description:string;
    category:string;
    liveSiteUrl:string;
    githubUrl:string;
    image:string|null;
}

function ProjectForm({type, session, project}:Props) {
    const [isSubmitting, setisSubmitting] = useState(false);
    const {title, description, category, liveSiteUrl,githubUrl,image} = project as ProjectForm;
    const [form, setform] = useState<ProjectForm>(project ? {title, description, category, liveSiteUrl,githubUrl,image}:{
        title:"",
        description:"",
        category:"",
        liveSiteUrl:"",
        githubUrl:"",
        image:""
    });
    const router = useRouter();
    const handleFormSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        setisSubmitting(true);
        if(type === 'create'){
            try {
                const {token} = await fetchToken();
                await createNewProject(form,session?.user?.id,token);
                router.push("/");
            } catch (error:any) {
                console.log(error.message)
            }finally{
                setisSubmitting(false);
            }
        }

        if((type ==='edit') && project){
            const { token} = await fetchToken();
            setisSubmitting(true)
            try {
                await updateProject(form,project?.id,token)
                router.push("/")
            } catch (error) {
                console.log(error);
            }
            finally{
                setisSubmitting(false)
            }
        }
    }
    const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();

        const file = e.target.files?.[0];
        if(!file) return;

        if(!file.type.includes('image')){
            return alert("Please upload an image file.")
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            const result = reader.result as string;
            handleStateChange('image',result)
        }
    }
    const handleStateChange = (fieldName:string, value:string)=> {
        setform({...form,[fieldName]:value})
    }
  return (
    <form onSubmit={handleFormSubmit} className='flexStart form'>
        <div className='flexStart form_image-container'>
            <label htmlFor='poster' className='flexCenter form_image-label'>{
                !form.image && "Choose a poster for your project"
            }</label>
            <input id="image" type='file' accept='image/*' required={type === 'create'} className='form_image-input' onChange={handleChangeImage}/>
            {
                form.image && (
                    <Image src={form.image} alt="poster-image" className="sm:p-10 object-contain z-10" fill/>
                )
            }
        </div>
        <FormField title="Title" state={form.title} placeholder="Flexible" setState={(value)=>handleStateChange('title',value)}/>

        <FormField title="Description" state={form.description} isTextArea placeholder="Showcase and discover remarkable developer projects" setState={(value)=>handleStateChange('description',value)}/>

        <FormField type='url' title="Website URL" state={form.liveSiteUrl} placeholder="https://abhishek.com" setState={(value)=>handleStateChange('liveSiteUrl',value)}/>

        <FormField type='url' title="Github Url" state={form.githubUrl} placeholder="www.gihub.com/your_repo." setState={(value)=>handleStateChange('githubUrl',value)}/>

        <CustomMenu title="Category" state={form.category} filters={categoryFilters} setState={(value:string)=>handleStateChange('category',value)}/>

        <div className='flexStart w-full'>
            <Button title={isSubmitting ? `${type === 'create' ? 'Creating..':'Editing..'}`: `${type === 'create' ? 'Create':'Edit'}`} type="submit" leftIcon={isSubmitting ? "":"/plus.svg"} isSubmitting={isSubmitting}/>
        </div>
    </form>
  )
}

export default ProjectForm