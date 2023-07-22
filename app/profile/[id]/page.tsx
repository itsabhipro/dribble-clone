import { ProjectInterface, UserProfile } from '@/common.type ';
import Image from 'next/image'

import Link from 'next/link'
import Button from "@/components/helperUtilsComponants/Button";
import ProjectCard from '@/components/helperUtilsComponants/ProjectCard';
import { getUserProject } from '@/lib/actions';

type Props = {
    user: UserProfile;
}

export default async function Profile({params:{id}}:{params:{id:string}}){
    const result = await getUserProject(id,100) as {user:UserProfile}
    
    return <ProfilePage user={result.user} />
}

const ProfilePage = ({ user }: Props) => (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
        <section className="flexBetween max-lg:flex-col gap-10 w-full">
            <div className='flex items-start flex-col w-full'>
                <Image src={user?.avatarUrl} width={100} height={100} className="rounded-full" alt="user image" />
                <p className="text-4xl font-bold mt-10">{user?.name}</p>
                <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">I’m Software Engineer at my own company 👋</p>
                
                <div className="flex mt-8 gap-5 w-full flex-wrap">
                    <Button 
                        type='button'
                        title="Follow" 
                        leftIcon="/plus-round.svg" 
                        bgColor="bg-light-white-400 !w-max" 
                        textColor="text-black-100" 
                    />
                    <Link href={`mailto:${user?.email}`}>
                        <Button type='button' title="Hire Me" leftIcon="/email.svg" />
                    </Link>
                </div>
            </div>

            {user?.projects?.edges?.length > 0 ? (
                <Image
                    src={user?.projects?.edges[0]?.node?.image}
                    alt="project image"
                    width={739}
                    height={554}
                    className='rounded-xl object-contain'
                />
            ) : (
                <Image
                    src="/profile-post.png"
                    width={739}
                    height={554}
                    alt="project image"
                    className='rounded-xl'
                />
            )}
       </section>

       <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
           <p className="w-full text-left text-lg font-semibold">Recent Work</p>
           
           <div className="profile_projects">
                {user?.projects?.edges?.map(
                    ({ node }: { node: ProjectInterface }) => (
                        <ProjectCard
                            key={`${node?.id}`}
                            id={node?.id}
                            image={node?.image}
                            title={node?.title}
                            name={user.name}
                            avatartUrl={user.avatarUrl}
                            userId={user.id}
                        />
                    )
                )}
            </div>
       </section>
   </section>
)

export {ProfilePage}