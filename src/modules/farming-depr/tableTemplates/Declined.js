import { unix } from "dayjs"

export const DeclinedTemplate = [
  {
    title: "Date created",
    width: 100,
    dataIndex: "dateCreated",
    render: ((date) => unix(date).format("DD-MM-YY"))
  },
  {
    title: "Date cancelled",
    width: 120,
    dataIndex: "dateCancelled",
    render: ((date) => unix(date).format("DD-MM-YY"))
  },
  {
    title: "Amount",
    dataIndex: "quantity",
  },
  {
    title: "Account type",
    dataIndex: ["type", "name"],
    width: 110
  },
  {
    title: "Location",
    dataIndex: ["location", "iso"],
  },
  {
    title: "Cancelled by",
    dataIndex: ["cancelledBy", "fullName"]
  },
  {
    title: "Cancellation cause",
    dataIndex: "cancellationCause"
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 60,
    render: () => <a href="https://google.com">action</a>
  }
]