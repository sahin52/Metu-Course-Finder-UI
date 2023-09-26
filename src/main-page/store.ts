import { MainFilterInputDto, CacheSection, Grade, MinGrade, StartEndGrades, TakenCourseRequestDto } from "./types";
import { dersler } from "./dersler";
export async function getResults(input: MainFilterInputDto) {
  let filteredBolums = dersler.bolumler.filter(
    (i) => i.totalCourses > 0 && i.isInfoFound === true && i.dersler.length > 0
  );
  let sections: CacheSection[] = [];
  filteredBolums.forEach((bolum) => {
    bolum.dersler.forEach((course) => {
      course.cI.sl.forEach((section) => {
        sections.push({
          prereqisites: groupBy(course.pr, "SetNo"),
          bolumCode: bolum.code,
          bolumName: bolum.name,
          cc: course.cI.cc,
          cn: course.cI.cn,
          cr: course.cI.cr,
          creditAsFloat: parseFloat(course.cI.cr.substring(0, 4)),
          dp: bolum.name,
          isKibris: bolum.isKibris,
          criterias: section.ct,
          sn: section.sn,
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
      (section) => section.cr.substring(0, 4) >= input.minWantedCredit!
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
          prerequisites.every((pr) => {
            let rez = input.takenCourses.some((inputcourse) => {
              let rezz =
                inputcourse.cc.toString() === pr.CourseCode.toString() &&
                isGradeGreater(inputcourse.grade, pr.MinGrade);
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
      res = section.criterias.some((ct) => {
        let res =
          (ct.gd === "ALL" ||
            ct.gd === input.ogrencininBolumu) &&
          ct.sc < input.soyad! &&
          ct.ec > input.soyad! &&
          ct.mcg < input.cumGpa! &&
          ct.mxg > input.cumGpa! &&
          ct.mn < input.year! &&
          ct.mx > input.year! &&
          getIfGradeOK(
            ct.sg,
            ct.eg,
            input.takenCourses.filter(
              (i) => i.cc.toString() === section.cc.toString()
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
  sg: StartEndGrades,
  eg: StartEndGrades,
  takenCourse: TakenCourseRequestDto
) {
  // if(takenCourse===null || takenCourse===undefined) return false;
  if (isTakenCourseNull()) {
    if (
      sg === "Hic almayanlar veya Basarisizlar (FD ve alti)" ||
      sg === "Hic almayanlar alabilir" ||
      sg === "Herkes alabilir" ||
      sg === "Hic almayanlar veya DD ve alti" ||
      sg === "Hic almayanlar veya CC ve alti" ||
      sg === "Hic almayanlar veya BB ve alti"
    ) {
      return true;
    }
    return false;
  }
  if (sg === "Hic almayanlar veya Basarisizlar (FD ve alti)") {
    if (takenCourse.grade >= "FD") return true;
    return false;
  }
  if (sg === "Kaldi") {
    if (takenCourse.grade >= "FD") {
      return true;
    }
    return false;
  }
  if (sg === "CC") {
    if (eg === "CC") {
      if (takenCourse.grade === "CC") return true;
      return false;
    }
    if (eg === "NA") {
      if (takenCourse.grade >= "CC" && takenCourse.grade <= "NA") return true;
      return false;
    }
    if (eg === "FF") {
      if (takenCourse.grade >= "CC" && takenCourse.grade <= "FF") return true;
      return false;
    }
    return true;
  }
  if (sg === "CB") {
    if (eg === "CB") {
      if (takenCourse.grade === "CB") return true;
      return false;
    }
    return true;
  }
  if (sg === "DC") {
    if (takenCourse.grade >= "DC" && takenCourse.grade <= eg) return true;
    return false;
  }
  if (sg === "FD") {
    if (takenCourse.grade >= sg && takenCourse.grade <= eg)
      return true;
    return false;
  }
  if (sg === "FF") {
    if (takenCourse.grade >= sg && takenCourse.grade <= eg)
      return true;
    return false;
  }
  if (sg === "NA") {
    if (takenCourse.grade >= sg && takenCourse.grade <= eg)
      return true;
    return false;
  }
  if (sg === "Hic almayanlar alabilir") {
    if (isTakenCourseNull()) return true;
    return false;
  }
  if (sg === "Consent of dept" || sg === "Herkes alabilir") {
    return true;
  }
  if (sg === "Hic almayanlar veya DD ve alti") {
    if (takenCourse.grade >= "DD") {
      return true;
    }
    return false;
  }
  if (sg === "Hic almayanlar veya CC ve alti") {
    if (takenCourse.grade >= "CC") {
      return true;
    }
    return false;
  }
  if (sg === "U") {
    if (eg === "U") {
      if (takenCourse.grade === "U") return true;
      return false;
    }
    if (eg === "NA") {
      if (takenCourse.grade === "U" || takenCourse.grade === "NA") {
        return true;
      }
      return false;
    }
    return true;
  }
  if (sg === "DD") {
    if (takenCourse.grade >= sg && takenCourse.grade <= eg)
      return true;
    return false;
  }
  if (sg === "Gecti") {
    if (isTakenCourseNull()) return false;
    return true;
  }
  if (sg === "BB") {
    if (takenCourse.grade >= sg && takenCourse.grade <= eg)
      return true;
    return false;
  }
  if (sg === "AA") {
    return true;
  }
  if (sg === "BA") {
    if (takenCourse.grade >= sg && takenCourse.grade <= eg)
      return true;
    return false;
  }
  if (sg === "Hic almayanlar veya BB ve alti") {
    if (takenCourse.grade >= "BB") return true;
    return false;
  }

  return true;

  function isTakenCourseNull() {
    return takenCourse === null || takenCourse === undefined;
  }
}
