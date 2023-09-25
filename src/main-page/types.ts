
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
    prereqisites: CachePrerequisite;
    courseCode: number;
    courseName: string;
    credit: string;
    department: string;
    bolumCode: number;
    isKibris: boolean;
    bolumName: string;
    criterias: any[]; // Criteria
    sectionNumber: number;
    creditAsFloat: number;
  };
  export type CachePrerequisite = {
    [key: string]: Prerequisite[];
  };
  export interface Prerequisite {
    ProgramCode: number;
    DeptVersion: number;
    CourseCode: number;
    Name: string;
    Credit: string;
    SetNo: number;
    MinGrade: MinGrade;
    Type: string;
    Position: 'Offered Course / A??k Ders ' | 'Closed Course / Kapal? Ders';
  }
  export type MinGrade = 'DD' | 'S' | 'CB' | 'CC' | 'BB' | 'FF' | 'FD' | 'U';

  export interface Criteria {
    givenDept: string;
    startChar: string;
    endChar: string;
    minCumGpa: number;
    maxCumGpa: number;
    minYear: number;
    maxYear: number;
    startGrade: StartEndGrades; //"Hic almayanlar alabilir"|"Herkes alabilir";
    endGrade: StartEndGrades; // "Hic almayanlar alabilir"|"Herkes alabilir";
  }
  
  export type StartEndGrades =
  | 'Hic almayanlar veya Basarisizlar (FD ve alti)'
  | 'Kaldi'
  | 'CC'
  | 'CB'
  | 'DC'
  | 'FD'
  | 'FF'
  | 'NA'
  | 'Hic almayanlar alabilir'
  | 'Consent of dept'
  | 'Herkes alabilir'
  | 'Hic almayanlar veya DD ve alti'
  | 'Hic almayanlar veya CC ve alti'
  | 'U'
  | 'DD'
  | 'Gecti'
  | 'BB'
  | 'AA'
  | 'BA'
  | 'Hic almayanlar veya BB ve alti';
