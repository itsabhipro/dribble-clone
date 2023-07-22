import { ProjectInterface } from "@/common.type";
import Categories from "@/components/Categories"
import LoadMore from "@/components/LoadMore"
import Posts from "@/components/Posts"
import { fetchAllProject } from "@/lib/actions";

type Prop ={
  searchParams:{category:string | null;
  endCursor?:string;
  };
}
type ProjectSearch = {
  projectSearch: {
    edges:{node:ProjectInterface}[];
    pageInfo:{
      hasPreviousPage:boolean;
      hasNextPage:boolean;
      startCursor:string;
      endCursor:string;
    }
  }
}
async function Home({searchParams:{category,endCursor}}:Prop) {
  const data = await fetchAllProject(category as string,endCursor) as ProjectSearch;
  const projectToDisplay = data?.projectSearch?.edges || [];

  return (
    <section className="flex flex-start flex-col paddings mb-16">
        <Categories />
        {
          projectToDisplay.length === 0 ? (
            <section className="flexStart flex-col paddings">
              <p className="no-result-text text-center">No project found, go create some first.</p>
            </section>
          ): <Posts projectToDisplay={projectToDisplay} /> 
        }
       
        <LoadMore startCursor={data?.projectSearch?.pageInfo?.startCursor} endCursor={data?.projectSearch?.pageInfo?.endCursor} hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} hasNextPage={data?.projectSearch?.pageInfo?.hasNextPage}/>
    </section>
  )
}

export default Home