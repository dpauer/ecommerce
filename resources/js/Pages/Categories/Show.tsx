import { PaginatedData } from "@/Components/DataDisplay/DataTable/types"
import { Attribute, Category, Product } from "@/types"
import { useEffect, useState } from "react"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"
import Filters from "./Components/Filters"

export interface Props {
  category: Category
  attributes: Attribute[]
  products: PaginatedData<Product>
}
export default function ({
  category,
  attributes,
  products,
}: Props): JSX.Element {
  const [filters, setFilters] = useState<Set<number>>(new Set())
  const [search, setSearch] = useState<string>("")
  const [priceSort, setPriceSort] = useState<string>("")

  useEffect(() => {
    console.log("changed filters", filters)
    console.log("changed priceSort", priceSort)
    console.log("changed search", search)
  }, [filters, priceSort, search])

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
            <Col md="auto">1000 results found in 12ms</Col>
            <Col md="auto">
              <Row className="align-items-center">
                <Col xs="auto">
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
                <Col xs="auto">
                  <Form.Select
                    style={{ width: 200 }}
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
            </Col>
          </Row>
          <div>
            <Table striped hover bordered className="mt-1">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                </tr>
              </thead>
              <tbody>
                {products.data.map(product => {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
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
