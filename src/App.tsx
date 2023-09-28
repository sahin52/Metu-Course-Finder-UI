import { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { Results } from "./main-page/results";
import { getResults } from "./main-page/store";
import { CacheSection, MainFilterInputDto } from "./main-page/types";
import { BolumComboboxData } from "./main-page/util";

function App() {
  const [results, setResults] = useState<CacheSection[]>();

  const [inputDatas, setInputDatas] = useState<MainFilterInputDto>({
    takenCourses: [],
    wantsKibrisOdtu: false,
    wantsNormalOdtu: true,
    minWantedCredit: null,
    ogrencininBolumu: null,
    soyad: null,
    cumGpa: null,
    year: null,
    istenilenBolum: 0,
  });
  function controlHerSeyGirilmisMi() {
    if (inputDatas.cumGpa === null) {
      alert(`lütfen cumulative GPA'inizi giriniz`);
      return false;
    }
    if (inputDatas.minWantedCredit === null) {
      alert("İstediğiniz Dersin Minimum Kredisini giriniz");
      return false;
    }
    if (inputDatas.ogrencininBolumu === null) {
      alert("Lutfen Bolumunuzu giriniz");
      return false;
    }
    if (inputDatas.soyad === null || inputDatas.soyad.length === 0) {
      alert("Lutfen soyadınızı giriniz");
      return false;
    }
    console.log(inputDatas.year);
    if (inputDatas.year === null || Number.isNaN(inputDatas.year)) {
      alert("Lutfen yilinizi giriniz");
      return false;
    }

    return true;
  }
  return (
    <div className="App">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
          <div className="row">
            <div className="">
              <p>Hangi Okuldan Dersler İstiyorsunuz?</p>
              <div className="form-check">
                <input
                  className="form-check-input"
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
                  id="flexRadioDefault1"
                ></input>
                <label
                  className="form-check-label justify-content-start d-flex flex"
                  htmlFor="flexRadioDefault1"
                >
                  Sadece Kıbrıs Odtü İstiyorum
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
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
                  id="flexRadioDefault2"
                ></input>
                <label
                  className="form-check-label  justify-content-start d-flex flex"
                  htmlFor="flexRadioDefault2"
                >
                  Sadece Ankara Odtü İstiyorum
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
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
                  id="flexRadioDefault3"
                ></input>
                <label
                  className="form-check-label  justify-content-start d-flex flex"
                  htmlFor="flexRadioDefault3"
                >
                  Hem Kıbrıs Odtü Hem Ankara Odtü İstiyorum
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
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
            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12">
              <label className="col-xs-12 col-md-6 col-sm-12 col-lg-12">Soyadınızın ilk iki harfi</label>
              <input
                // inputProps={{ required: true, name: "heardAboutUsFrom" }}
                onChange={(value) =>
                  setInputDatas({ ...inputDatas, soyad: value.target.value })
                }
                // className="col-md-12"
                maxLength={2}
              ></input>
            </div>
            <div className="col-xs-12">
              <label className="col-xs-12">Cumulative GPA'iniz</label>
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
            <div className="col-md-12">
              <label className="col-md-12">Okuldaki Kaçıncı Yılınız</label>
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
            <p></p>
            {inputDatas.takenCourses.map((course) => {
              return (
                <>
                  <div>
                    <p>
                      Ders: {course.cc} Not: {course.grade}{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setInputDatas({
                            ...inputDatas,
                            takenCourses: [
                              ...inputDatas.takenCourses.filter(
                                (i) => i.cc !== course.cc
                              ),
                            ],
                          });
                        }}
                      >
                        <i className="fa fa-times"></i>sil
                      </button>{" "}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          <button
            className="btn btn-success"
            onClick={async () => {
              let controlResult = controlHerSeyGirilmisMi();

              if (controlResult === true) {
                let result = await getResults(inputDatas);
                setResults(result);
              }
            }}
          >
            {" "}
            Sonuçları Göster
          </button>
        </div>
        <div className="col-lg-9 col-md-6 col-sm-12 col-xs-12">
          <Results sections={results} />
        </div>
        <a href="mailto:sahinkasap52@outlook.com?subject=Metu Course Finderda Yasadigim Sorun!">
          Sorun Bildir
        </a>
      </div>
    </div>
  );
}

export default App;
