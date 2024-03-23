import Breadcrumbs from "@/Components/Navigation/Breadcrumbs"
import { Attribute, Category } from "@/types"
import { isDefined } from "@/utils/misc"
import axios from "axios"
import { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"
import Filters, { FiltersType } from "./Components/Filters"
import Pagination from "./Components/Pagination"

export interface Props {
  category: Category
  attributes: Attribute[]
}
export default function ({ category, attributes }: Props): JSX.Element {
  const [filters, setFilters] = useState<FiltersType>({})
  const [search, setSearch] = useState<string>("")
  const [priceSort, setPriceSort] = useState<string>("")
  const [pagination, setPagination] = useState<{
    limit: number
    offset: number
  }>({
    limit: 20,
    offset: 0,
  })

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{
    hits: any[]
    processingTimeMs: number
    limit: number
    offset: number
    estimatedTotalHits: number
    facetDistribution: { attributeValues: { [key: number]: number } }
  }>()

  const getData = (
    filters: FiltersType,
    search: string,
    priceSort: string,
    pagination: {
      limit: number
      offset: number
    },
  ) => {
    setLoading(true)
    axios
      .post(route("datatables.categories.products.index", { category }), {
        filters,
        search,
        priceSort,
        pagination,
      })
      .then(res => res.data)
      .then(data => {
        setData(data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData(filters, search, priceSort, { limit: 20, offset: 0 })
  }, [filters, search, priceSort])

  useEffect(() => {
    getData(filters, search, priceSort, pagination)
  }, [pagination])
  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: "Home",
            url: "/",
            active: false,
          },
          {
            label: category.name,
            url: route("categories.show", { category }),
            active: true,
          },
        ]}
      />

      <h3>{category.name}</h3>

      <Row>
        <Col xs={4}>
          <Filters
            attributes={attributes}
            filters={filters}
            setFilters={setFilters}
            facetDistribution={data?.facetDistribution}
          />
        </Col>
        <Col>
          <Row className="flex justify-content-between align-items-center mb-2">
            <Col md="auto">
              <Form.Control
                style={{ width: 150 }}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                }}
              ></Form.Control>
            </Col>
            <Col md="auto">
              <Form.Select
                value={priceSort}
                onChange={e => {
                  setPriceSort(e.target.value)
                }}
              >
                <option value="">Sort...</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </Form.Select>
            </Col>
          </Row>
          <div>
            <Table striped hover bordered className="mt-1">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {isDefined(data) &&
                  data.hits.map(row => {
                    return (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td style={{ textAlign: "right" }}>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "EUR",
                          }).format(row.price)}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>

            {isDefined(data) && (
              <Pagination
                limit={data.limit}
                offset={data.offset}
                total={data.estimatedTotalHits}
                pagination={pagination}
                setPagination={setPagination}
              />
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}
