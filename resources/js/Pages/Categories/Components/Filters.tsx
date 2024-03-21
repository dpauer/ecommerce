import { Attribute } from "@/types"
import Accordion from "react-bootstrap/Accordion"
import Filter from "./Filter"

export interface Props {
  attributes: Attribute[]
  filters: number[]
  setFilters: (arg0: number[]) => void
  facetDistribution?: { attributeValues: { [key: number]: number } }
}
export default function ({
  attributes,
  filters,
  setFilters,
  facetDistribution,
}: Props): JSX.Element {
  return (
    <Accordion>
      {attributes.map((attribute, attributeIdx) => {
        return (
          <Filter
            key={attributeIdx}
            attribute={attribute}
            filters={filters}
            setFilters={setFilters}
            facetDistribution={facetDistribution}
          />
        )
      })}
    </Accordion>
  )
}
