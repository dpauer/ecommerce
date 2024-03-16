import ShowButton from "@/Components/General/ShowButton"

export function formatStringColumn(dataIndex: string) {
  const column = {
    title: dataIndex,
    render: (row: any) => {
      return row[dataIndex]
    },
  }
  return column
}

export function formatButtonShowColumn(
  routeName: string,
  getRouteParametersFunction: (row: any) => any,
) {
  const column = {
    title: "",
    render: (row: any) => {
      return (
        <ShowButton url={route(routeName, getRouteParametersFunction(row))} />
      )
    },
  }
  return column
}
