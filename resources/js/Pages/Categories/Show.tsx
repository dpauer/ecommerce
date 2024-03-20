import { PaginatedData } from "@/Components/DataDisplay/DataTable/types"
import { Attribute, Category } from "@/types"
import { isDefined } from "@/utils/misc"
import axios from "axios"
import { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"
import Filters from "./Components/Filters"

export interface Props {
  category: Category
  attributes: Attribute[]
}
export default function ({ category, attributes }: Props): JSX.Element {
  const [filters, setFilters] = useState<number[]>([])
  const [search, setSearch] = useState<string>("")
  const [priceSort, setPriceSort] = useState<string>("")

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<PaginatedData>()

  useEffect(() => {
    setLoading(true)
    axios
      .post(route("datatables.categories.products.index", { category }), {
        filters,
        search,
        priceSort,
      })
      .then(res => res.data)
      .then(data => {
        setProducts(data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [filters, search, priceSort])
  return (
    <>
      <h3>{category.name}</h3>
      <Row>
        <Col xs={4}>
          <Filters
            attributes={attributes}
            filters={filters}
            setFilters={setFilters}
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
                  <th>id</th>
                  <th>name</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {isDefined(products) &&
                  products.data.map(product => {
                    return (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  )
}
