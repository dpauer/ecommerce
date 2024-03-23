import { Attribute, AttributeValue } from "@/types"
import { isDefined } from "@/utils/misc"
import { useEffect, useState } from "react"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { FiltersType } from "./Filters"

export interface Props {
  attribute: Attribute
  filters: FiltersType
  setFilters: (arg0: FiltersType) => void
  facetDistribution?: { attributeValues: { [key: number]: number } }
}
export default function Filter({
  attribute,
  filters,
  setFilters,
  facetDistribution,
}: Props): JSX.Element {
  const defaultSize = 5
  const [search, setSearch] = useState("")
  const [collapsed, setCollapsed] = useState(true)
  const [attributeValues, setAttributeValues] = useState(
    attribute.attribute_values.slice(0, defaultSize),
  )
  useEffect(() => {
    let tmp = [...attribute.attribute_values]
    if (search.length > 0) {
      tmp = tmp.filter(el =>
        el.value.toLowerCase().includes(search.toLowerCase()),
      )
    }
    if (collapsed) {
      tmp = tmp.slice(0, defaultSize)
    }
    setAttributeValues([...tmp])
  }, [search, collapsed])
  return (
    <>
      <Accordion.Item eventKey={attribute.id.toString()}>
        <Accordion.Header>{attribute.name}</Accordion.Header>
        <Accordion.Body>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="mb-2"
            onChange={e => {
              setSearch(e.target.value)
            }}
          />
          {isDefined(facetDistribution)
            ? attributeValues
                .filter(attributeValue =>
                  isDefined(
                    facetDistribution.attributeValues[attributeValue.id],
                  ),
                )
                .map((attributeValue, idx) => {
                  let count =
                    facetDistribution.attributeValues[attributeValue.id]
                  return (
                    <FilterCheckbox
                      key={idx}
                      label={`${attributeValue.value} (${count})`}
                      attribute={attribute}
                      attributeValue={attributeValue}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  )
                })
            : attributeValues.map((attributeValue, idx) => {
                return (
                  <FilterCheckbox
                    key={idx}
                    label={attributeValue.value}
                    attribute={attribute}
                    attributeValue={attributeValue}
                    filters={filters}
                    setFilters={setFilters}
                  />
                )
              })}
          {collapsed ? (
            <Button
              variant="link"
              onClick={() => {
                setCollapsed(false)
              }}
            >
              Show more
            </Button>
          ) : (
            <Button
              variant="link"
              onClick={() => {
                setCollapsed(true)
              }}
            >
              Show less
            </Button>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
}

export function FilterCheckbox({
  label,
  attribute,
  attributeValue,
  filters,
  setFilters,
}: {
  label: string
  attribute: Attribute
  attributeValue: AttributeValue
  filters: { [key: string]: number[] }
  setFilters: (arg0: { [key: string]: number[] }) => void
}): JSX.Element {
  return (
    <Form.Check
      type="checkbox"
      label={label}
      checked={(filters[attribute.name] ?? []).includes(attributeValue.id)}
      onChange={e => {
        let currentAttributeFilters = new Set<number>()
        if (isDefined(filters[attribute.name])) {
          currentAttributeFilters = new Set<number>(filters[attribute.name])
        }
        if (e.target.checked) {
          currentAttributeFilters.add(attributeValue.id)
        } else {
          currentAttributeFilters.delete(attributeValue.id)
        }
        setFilters({
          ...filters,
          [attribute.name]: Array.from(currentAttributeFilters),
        })
      }}
    />
  )
}
