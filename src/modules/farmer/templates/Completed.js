import { unix } from "dayjs"

export const CompletedTemplate = [
  {
    title: 'Date created',
    width: 100,
    dataIndex: 'dateCreated',
    render: ((date) => unix(date).format("DD-MM-YY"))
    // fixed: 'left',
  },
  {
    title: 'Date completed',
    width: 140,
    dataIndex: 'dateCompleted',
    render: ((date) => unix(date).format("DD-MM-YY"))
    // fixed: 'left',
    // sorter: true,
  },
  {
    title: 'Amount',
    dataIndex: 'quantity',
  },
  {
    title: 'Valids',
    dataIndex: 'valid',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Total',
    dataIndex: 'total',
  },
  {
    title: 'Currency',
    dataIndex: ["currency", "iso"],
  },
  {
    title: 'Account type',
    dataIndex: ["type", "name"],
  },
  {
    title: 'Location',
    dataIndex: ["location", "iso"],
  },
  {
    title: 'Farmer',
    dataIndex: ["farmer", "fullName"],
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 110,
    render: ((inp) => inp ?? "Empty")
  },
  {
    title: 'Team',
    dataIndex: 'team.id',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 60,
    render: () => <a href="https://google.com">action</a>
  }
]