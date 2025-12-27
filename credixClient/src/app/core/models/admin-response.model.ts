export interface AdminResponse {
  users: User[];
  printers: Printer[];
  plants: Plant[];
  prareas: Prareas[];
  consts: Consts[];
  trs: Trs[];
  msg: string;
  status: number;
}
