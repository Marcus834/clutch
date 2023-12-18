import { getSearch } from "@/lib/search-service"
import { ResultCard, ResultCardSkeleton } from "./result-card"
import { Skeleton } from "@/components/ui/skeleton"

interface ResultsProps {
  q?: string
}

export const Results = async ({ q }: ResultsProps) => {
  const data = await getSearch(q)

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Results for term &quot;{q}&quot;
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found. Try searcing for something else.
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <ResultCard data={result} key={result.id} />
        ))}
      </div>
    </div>
  )
}

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
