
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
  export type CacheSection = {
    prereqisites: {};
    courseCode: number;
    courseName: string;
    credit: string;
    department: string;
    bolumCode: number;
    isKibris: boolean;
    bolumName: string;
    criterias: [];
    sectionNumber: number;
    creditAsFloat: number;
  };
  
  