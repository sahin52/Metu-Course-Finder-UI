
import "bootstrap/dist/css/bootstrap.css";
import "react-widgets/styles.css";
import { CacheSection } from "./types";
import { Table } from "reactstrap";

export interface IResultsProps {
  sections: CacheSection[] | undefined;
}

export function Results(props: IResultsProps) {
  const { sections } = props;

  return (
    <>
      {sections === undefined ? (
        <p>Sonuçlar Burada Görünecek</p>
      ) : (
        <>
          <p>Total section: {sections!.length}</p>
          <Table bordered={true}>
            <thead>
              <tr>
                <th>Bölüm Kodu</th>
                <th>Bölüm Adı</th>
                <th>Ders Kodu</th>
                <th>Ders Adı</th>
                <th>Kredi</th>
                <th>Section Nu</th>
              </tr>
            </thead>
            <tbody>
              {sections!.map((section) => {
                return (
                  <tr>
                    <td>{section.bolumCode}</td>
                    <td>{section.bolumName}</td>
                    <td>{section.cc}</td>
                    <td>{section.cn}</td>
                    <td>{section.cr}</td>
                    <td>{section.sn}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
