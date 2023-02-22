import { unix } from "dayjs"
import { roleDataIndex, roleName } from "../utils"

export const PendingTemplate = [
  {
    title: "Date created",
    // width: 100,
    dataIndex: "dateCreated",
    render: ((date) => unix(date).format("DD-MM-YY"))
    // fixed: 'left',
  },
  {
    title: "Amount",
    dataIndex: "quantity",
  },
  {
    title: "Account type",
    dataIndex: ["type", "name"],
    // width: 110
  },
  {
    title: "Location",
    dataIndex: ["location", "iso"],
  },
  {
    title: roleName(),
    dataIndex: roleDataIndex(),
    render: ((inp) => inp || "Empty")
    // width: 130
  },
  {
    title: "Description",
    dataIndex: "description",
    // width: 110,
    render: ((inp) => inp || "Empty")
  },
  {
    title: "Team",
    dataIndex: ["team", "id"],
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 60,
    render: () => <a href="https://google.com">action</a>
  }
]