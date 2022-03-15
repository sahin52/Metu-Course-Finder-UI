
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
    wantsKibrisOdtu: boolean|null;
    wantsNormalOdtu: boolean|null;
    minWantedCredit: string|null;
    istenilenBolum?: number|null;
    ogrencininBolumu: string|null;
    soyad: string|null;
    cumGpa: number|null;
    year: number|null;
  };
  
  export type TakenCourseRequestDto = {
    courseCode: number;
    grade: Grade;
  };
  