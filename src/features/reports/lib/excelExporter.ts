// Xuất Excel bằng SpreadsheetML (XML) - mở được bằng Excel, KHÔNG cần thư viện.
export interface XlsColumn<T> {
  header: string;
  value: (row: T) => string | number;
  type?: "String" | "Number";
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cell(v: string | number, type: "String" | "Number"): string {
  if (type === "Number") return `<Cell><Data ss:Type="Number">${v}</Data></Cell>`;
  return `<Cell><Data ss:Type="String">${xmlEscape(String(v))}</Data></Cell>`;
}

export function buildExcelXml<T>(sheetName: string, columns: XlsColumn<T>[], rows: T[]): string {
  const header = columns
    .map((c) => `<Cell ss:StyleID="hdr"><Data ss:Type="String">${xmlEscape(c.header)}</Data></Cell>`)
    .join("");
  const body = rows
    .map((r) => `<Row>${columns.map((c) => cell(c.value(r), c.type ?? "String")).join("")}</Row>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Styles>
  <Style ss:ID="hdr"><Font ss:Bold="1"/><Interior ss:Color="#DCE6F1" ss:Pattern="Solid"/></Style>
 </Styles>
 <Worksheet ss:Name="${xmlEscape(sheetName)}">
  <Table>
   <Row>${header}</Row>
   ${body}
  </Table>
 </Worksheet>
</Workbook>`;
}
