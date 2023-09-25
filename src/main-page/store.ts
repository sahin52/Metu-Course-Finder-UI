import { MainFilterInputDto, CacheSection, Grade, MinGrade, StartEndGrades, TakenCourseRequestDto } from "./types";
import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { dersler } from "./dersler";
export async function getResults(input: MainFilterInputDto) {
  let filteredBolums = dersler.bolumler.filter(
    (i) => i.totalCourses > 0 && i.isInfoFound === true && i.dersler.length > 0
  );
  let sections: CacheSection[] = [];
  filteredBolums.forEach((bolum) => {
    bolum.dersler.forEach((course) => {
      course.courseInfo.sectionlar.forEach((section) => {
        sections.push({
          prereqisites: groupBy(course.prerequisite, "SetNo"),
          bolumCode: bolum.code,
          bolumName: bolum.name,
          courseCode: course.courseInfo.courseCode,
          courseName: course.courseInfo.courseName,
          credit: course.courseInfo.credit,
          creditAsFloat: parseFloat(course.courseInfo.credit.substring(0, 4)),
          department: course.courseInfo.department,
          isKibris: bolum.isKibris,
          criterias: section.criteria,
          sectionNumber: section.sectionNumber,
        });
      });
    });
  });
  input.soyad = replaceTurk(replaceTurk(input.soyad!).toUpperCase());
  let res = sections
    .filter(
      (section) =>
        (input.wantsKibrisOdtu && section.isKibris) ||
        (input.wantsNormalOdtu && !section.isKibris)
    )
    .filter(
      (section) => section.credit.substring(0, 4) >= input.minWantedCredit!
    )
    .filter((section) => {
      if (
        input.istenilenBolum === undefined ||
        input.istenilenBolum === 0 ||
        input.istenilenBolum === null
      )
        return true;
      return (
        input.istenilenBolum !== undefined &&
        section.bolumCode === input.istenilenBolum
      );
    })
    .filter((section) => {
      let res =
        Object.keys(section.prereqisites).length === 0 ||
        Object.entries(section.prereqisites).some(([setNo, prerequisites], i) =>
          prerequisites.every((prerequisite) => {
            let rez = input.takenCourses.some((inputcourse) => {
              let rezz =
                inputcourse.courseCode.toString() === prerequisite.CourseCode.toString() &&
                isGradeGreater(inputcourse.grade, prerequisite.MinGrade);
              return rezz;
            });
            return rez;
          })
        );
      return res;
    })
    .filter((section) => {
      let res = true;
      if (section.criterias.length === 0) return true;
      res = section.criterias.some((criteria) => {
        let res =
          (criteria.givenDept === "ALL" ||
            criteria.givenDept === input.ogrencininBolumu) &&
          criteria.startChar < input.soyad! &&
          criteria.endChar > input.soyad! &&
          criteria.minCumGpa < input.cumGpa! &&
          criteria.maxCumGpa > input.cumGpa! &&
          criteria.minYear < input.year! &&
          criteria.maxYear > input.year! &&
          getIfGradeOK(
            criteria.startGrade,
            criteria.endGrade,
            input.takenCourses.filter(
              (i) => i.courseCode.toString() === section.courseCode.toString()
            )[0]
          );
        return res;
      });
      return res;
    });
  return res;
  // console.log(window.location.href);
  // let result: AxiosResponse<CacheSection[]>
  // let apiUrl = 'http://localhost:8080'
  // if(window.location.href==='https://metu-course-finder.kasap.dev/'){
  //     apiUrl='https://api.metu-course-finder.kasap.dev'
  // }
  // result = await axios.get(apiUrl+'/get-details'+qs.stringify(input,{addQueryPrefix:true}))
  // console.log(result.data);
  // return result.data
}
const groupBy = function (xs: any[], key: string) {
  return xs.reduce(function (rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
function replaceTurk(text: string) {
  return text
    .replace(/Ğ/g, "G")
    .replace(/ğ/g, "g")
    .replace(/Ü/g, "U")
    .replace(/ü/g, "u")
    .replace(/Ş/g, "S")
    .replace(/ş/g, "s")
    .replace(/İ/g, "I")
    .replace(/ı/g, "i")
    .replace(/Ö/g, "O")
    .replace(/ö/g, "o")
    .replace(/Ç/g, "C")
    .replace(/ç/g, "c");
}
function isGradeGreater(grade: Grade, minGrade: MinGrade): boolean {
  if (grade === minGrade) return true;
  if (grade === "AA" || grade === "BA" || grade === "BB") {
    switch (minGrade) {
      case "BB":
      case "CB":
      case "CC":
      case "DD":
      case "FD":
      case "S":
      case "U":
        return true;
    }
  }
  if (grade === "CB") {
    switch (minGrade) {
      case "BB":
        return false;
      case "CB":
      case "CC":
      case "DD":
      case "FD":
      case "S":
      case "U":
        return true;
    }
  }
  if (grade === "CC") {
    switch (minGrade) {
      case "BB":
      case "CB":
        return false;
      case "CC":
      case "DD":
      case "FD":
      case "S":
      case "U":
        return true;
    }
  }
  if (grade === "DC" || grade === "DD") {
    switch (minGrade) {
      case "BB":
      case "CB":
      case "CC":
        return false;
      case "DD":
      case "FD":
      case "S":
      case "U":
        return true;
    }
  }
  if (grade === "FD") {
    switch (minGrade) {
      case "BB":
      case "CB":
      case "CC":
      case "DD":
        return false;
      case "FD":
      case "S":
      case "U":
        return true;
    }
  }
  if (grade === "FF" || grade === "NA") {
    return false;
  }
  if (grade === "S") {
    switch (minGrade) {
      case "BB":
      case "CB":
      case "CC":
      case "DD":
      case "FD":
      case "S":
      case "U":
        return true;
    }
  }
  if (grade === "U") {
    switch (minGrade) {
      case "BB":
      case "CB":
      case "CC":
      case "DD":
      case "FD":
      case "U":
        return true;
      case "S":
        return false;
    }
  }
  return false;
}
function getIfGradeOK(
  startGrade: StartEndGrades,
  endGrade: StartEndGrades,
  takenCourse: TakenCourseRequestDto
) {
  // if(takenCourse===null || takenCourse===undefined) return false;
  if (isTakenCourseNull()) {
    if (
      startGrade === "Hic almayanlar veya Basarisizlar (FD ve alti)" ||
      startGrade === "Hic almayanlar alabilir" ||
      startGrade === "Herkes alabilir" ||
      startGrade === "Hic almayanlar veya DD ve alti" ||
      startGrade === "Hic almayanlar veya CC ve alti" ||
      startGrade === "Hic almayanlar veya BB ve alti"
    ) {
      return true;
    }
    return false;
  }
  if (startGrade === "Hic almayanlar veya Basarisizlar (FD ve alti)") {
    if (takenCourse.grade >= "FD") return true;
    return false;
  }
  if (startGrade === "Kaldi") {
    if (takenCourse.grade >= "FD") {
      return true;
    }
    return false;
  }
  if (startGrade === "CC") {
    if (endGrade === "CC") {
      if (takenCourse.grade === "CC") return true;
      return false;
    }
    if (endGrade === "NA") {
      if (takenCourse.grade >= "CC" && takenCourse.grade <= "NA") return true;
      return false;
    }
    if (endGrade === "FF") {
      if (takenCourse.grade >= "CC" && takenCourse.grade <= "FF") return true;
      return false;
    }
    return true;
  }
  if (startGrade === "CB") {
    if (endGrade === "CB") {
      if (takenCourse.grade === "CB") return true;
      return false;
    }
    return true;
  }
  if (startGrade === "DC") {
    if (takenCourse.grade >= "DC" && takenCourse.grade <= endGrade) return true;
    return false;
  }
  if (startGrade === "FD") {
    if (takenCourse.grade >= startGrade && takenCourse.grade <= endGrade)
      return true;
    return false;
  }
  if (startGrade === "FF") {
    if (takenCourse.grade >= startGrade && takenCourse.grade <= endGrade)
      return true;
    return false;
  }
  if (startGrade === "NA") {
    if (takenCourse.grade >= startGrade && takenCourse.grade <= endGrade)
      return true;
    return false;
  }
  if (startGrade === "Hic almayanlar alabilir") {
    if (isTakenCourseNull()) return true;
    return false;
  }
  if (startGrade === "Consent of dept" || startGrade === "Herkes alabilir") {
    return true;
  }
  if (startGrade === "Hic almayanlar veya DD ve alti") {
    if (takenCourse.grade >= "DD") {
      return true;
    }
    return false;
  }
  if (startGrade === "Hic almayanlar veya CC ve alti") {
    if (takenCourse.grade >= "CC") {
      return true;
    }
    return false;
  }
  if (startGrade === "U") {
    if (endGrade === "U") {
      if (takenCourse.grade === "U") return true;
      return false;
    }
    if (endGrade === "NA") {
      if (takenCourse.grade === "U" || takenCourse.grade === "NA") {
        return true;
      }
      return false;
    }
    return true;
  }
  if (startGrade === "DD") {
    if (takenCourse.grade >= startGrade && takenCourse.grade <= endGrade)
      return true;
    return false;
  }
  if (startGrade === "Gecti") {
    if (isTakenCourseNull()) return false;
    return true;
  }
  if (startGrade === "BB") {
    if (takenCourse.grade >= startGrade && takenCourse.grade <= endGrade)
      return true;
    return false;
  }
  if (startGrade === "AA") {
    return true;
  }
  if (startGrade === "BA") {
    if (takenCourse.grade >= startGrade && takenCourse.grade <= endGrade)
      return true;
    return false;
  }
  if (startGrade === "Hic almayanlar veya BB ve alti") {
    if (takenCourse.grade >= "BB") return true;
    return false;
  }

  return true;

  function isTakenCourseNull() {
    return takenCourse === null || takenCourse === undefined;
  }
}
