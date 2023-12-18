import { redirect } from "next/navigation"
import { Results, ResultsSkeleton } from "./_components/results"
import { Suspense } from "react"

interface SearchPageProps {
  searchParams: { q?: string }
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.q) {
    redirect("/")
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results q={searchParams.q} />
      </Suspense>
    </div>
  )
}

export default SearchPage
