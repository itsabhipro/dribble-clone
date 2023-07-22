import { ProjectInterface } from "@/common.type";
import { fetchAllProject } from "@/lib/actions"
import ProjectCard from "./helperUtilsComponants/ProjectCard";


async function Posts({projectToDisplay}:{projectToDisplay:{node:ProjectInterface}[]}) {

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>

      <section className="projects-grid">
        {
          projectToDisplay.map(({node}:{node:ProjectInterface})=>(
            <ProjectCard key={node?.id} id={node?.id} image={node?.image} title={node.title} name={node?.createdBy?.name} avatartUrl={node?.createdBy?.avatarUrl} userId={node?.createdBy?.id}/>
          ))
        }
      </section>
    </section>
  )
}

export default Posts