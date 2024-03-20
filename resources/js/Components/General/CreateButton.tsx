import { Link } from "@inertiajs/react"

export interface Props {
  title?: string
  url: string
}
export default function CreateButton({
  title = "Create",
  url,
}: Props): JSX.Element {
  return (
    <Link href={url} className="btn btn-primary btn-sm">
      {title}
    </Link>
  )
}
