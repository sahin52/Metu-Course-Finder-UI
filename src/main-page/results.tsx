import React, { useState } from "react";
import DropdownList from "react-widgets/DropdownList";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { CacheSection, Grade, MainFilterInputDto } from "./types";
import { getResults } from "./store";
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
                    <td>{section.courseCode}</td>
                    <td>{section.courseName}</td>
                    <td>{section.credit}</td>
                    <td>{section.sectionNumber}</td>
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
