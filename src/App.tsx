import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import DropdownList from "react-widgets/DropdownList";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { Grade, MainFilterInputDto } from "./main-page/types";
import { BolumComboboxData, AllCourses, GradeData } from "./main-page/util";

function App() {
  const [currentGrade, setCurrentGrade] = useState("");
  const [currentCourse, setCurrentCourse] = useState(0);

  const [inputDatas, setInputDatas] = useState<MainFilterInputDto>({
    takenCourses: [],
    wantsKibrisOdtu: false,
    wantsNormalOdtu: true,
    minWantedCredit: "",
    ogrencininBolumu: "",
    soyad: "",
    cumGpa: 0,
    year: 0,
  });
  return (
    <div className="App">
      <div className="row">
        <div className="col-lg-3">
          <input
            type={"radio"}
            name="kibrisOrOdtu"
            value="kibris"
            key={1}
            onChange={(event) => {
              setInputDatas({
                ...inputDatas,
                wantsKibrisOdtu: true,
                wantsNormalOdtu: false,
              });

              console.log(event.target.checked);
            }}
          ></input>
          <label>Sadece Kıbrıs Odtü İstiyorum</label>
        </div>
        <div className="col-lg-3">
          <input
            type={"radio"}
            name="kibrisOrOdtu"
            value="odtu"
            defaultChecked={true}
            key={2}
            onChange={(event) => {
              setInputDatas({
                ...inputDatas,
                wantsKibrisOdtu: false,
                wantsNormalOdtu: true,
              });
              console.log(event.target.checked);
            }}
          ></input>
          <label>Sadece Ankara Odtü İstiyorum</label>
        </div>
        <div className="col-lg-3">
          <input
            type={"radio"}
            name="kibrisOrOdtu"
            value="ikiside"
            key={3}
            onChange={(event) => {
              setInputDatas({
                ...inputDatas,
                wantsKibrisOdtu: true,
                wantsNormalOdtu: true,
              });
              console.log(event.target.checked);
            }}
          ></input>
          <label>Hem Kıbrıs Odtü Hem Ankara Odtü İstiyorum</label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <label>İstediğiniz Dersin Minimum Kredisi</label>
          <Combobox
            data={["0.00", "2.00", "3.00", "4.00", "5.00", "6.00", "8.00"]}
            // inputProps={{ required: true, name: "heardAboutUsFrom" }}
            name="minWantedCredit"
            value={inputDatas.minWantedCredit}
            onChange={(value) =>
              setInputDatas({ ...inputDatas, minWantedCredit: value })
            }
          ></Combobox>
        </div>
        <div className="col-md-3">
          <label>Bölümünüz</label>
          <Combobox
            data={BolumComboboxData}
            // inputProps={{ required: true, name: "heardAboutUsFrom" }}
            name="ogrencininBolumu"
            value={inputDatas.ogrencininBolumu}
            onChange={(value) =>
              setInputDatas({ ...inputDatas, ogrencininBolumu: value })
            }
          ></Combobox>
        </div>
        <div className="col-md-3">
          <label>Soyadınızın ilk iki harfi</label>
          <input
            // inputProps={{ required: true, name: "heardAboutUsFrom" }}
            onChange={(value) =>
              setInputDatas({ ...inputDatas, soyad: value.target.value })
            }
            maxLength={2}
          ></input>
        </div>
        <div className="col-md-3">
          <label>Cumulative GPA'iniz</label>
          <input
            type="number"
            step="0.01"
            // inputProps={{ required: true, name: "heardAboutUsFrom" }}
            onChange={(value) => {
              setInputDatas({
                ...inputDatas,
                cumGpa: parseFloat(value.target.value),
              });
              console.log(inputDatas);
            }}
            maxLength={4}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <label>Okuldaki Kaçıncı Yılınız</label>
          <input
            type="number"
            step="1"
            min="0"
            // inputProps={{ required: true, name: "heardAboutUsFrom" }}
            onChange={(value) => {
              setInputDatas({
                ...inputDatas,
                year: parseInt(value.target.value),
              });
              console.log(inputDatas.year);
            }}
            maxLength={4}
          ></input>
        </div>
      </div>
      <div className="row">
        <p>Alınan dersler</p>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Combobox
            data={AllCourses}
            onSelect={(value) => setCurrentCourse(value as number)}
          />
        </div>
        <div className="col-md-3">
          <Combobox
            data={GradeData}
            onSelect={(value) => setCurrentGrade(value)}
          />
        </div>
        <div className="col-md-3">
          <button
            onClick={() => {
              console.log("onclick")
              console.log(currentCourse)
              console.log(currentGrade)
              if (
                inputDatas.takenCourses.filter(
                  (i) => i.courseCode === currentCourse
                ).length === 0 &&
                currentCourse !== null &&
                currentCourse !== undefined &&
                currentGrade!==null &&
                currentGrade!==undefined                
              ){
                setInputDatas({
                  ...inputDatas,
                  takenCourses: [...inputDatas.takenCourses,{courseCode: currentCourse,grade: currentGrade as Grade}],
                });
              }
                
            }}
          >
            Ekle
          </button>
        </div>
      </div>
      <div className="row">
        <p>Deneme</p>
        {inputDatas.takenCourses.map((course) => {
          return (
            <>
              <p>Course</p>
              <p>{course.courseCode}</p>
              <p>{course.grade}</p>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
