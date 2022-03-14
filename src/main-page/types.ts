
export type Grade =
| 'AA'
| 'BA'
| 'BB'
| 'CB'
| 'CC'
| 'DC'
| 'DD'
| 'FF'
| 'FD'
| 'NA'
| 'S'
| 'U'; //TODO

export type MainFilterInputDto = {
    takenCourses: TakenCourseRequestDto[];
    wantsKibrisOdtu: boolean;
    wantsNormalOdtu: boolean;
    minWantedCredit: string;
    istenilenBolum?: number;
    ogrencininBolumu: string;
    soyad: string;
    cumGpa: number;
    year: number;
  };
  
  export type TakenCourseRequestDto = {
    courseCode: number;
    grade: Grade;
  };
  