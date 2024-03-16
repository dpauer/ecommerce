import { Category, PageProps } from "@/types"

export default function ({
  auth,
  category,
}: PageProps<{ category: Category }>): JSX.Element {
  return (
    <>
      <h1>Category</h1>
      <p>{JSON.stringify(category)}</p>
      <p>TODO: implementare qui la pagina filtro</p>
    </>
  )
}
