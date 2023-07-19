import Categories from "@/components/Categories"
import LoadMore from "@/components/LoadMore"
import Posts from "@/components/Posts"

function Home() {
  return (
    <section className="flex flex-start flex-col paddings mb-16">
        <Categories />
        <Posts />
        <LoadMore />
    </section>
  )
}

export default Home