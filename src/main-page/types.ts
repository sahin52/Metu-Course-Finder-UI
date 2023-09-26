
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
    cc: number;
    grade: Grade;
  };
  export type CacheSection = {
    prereqisites: CachePrerequisite;
    cc: number;
    cn: string;
    cr: string;
    dp: string;
    bolumCode: number;
    isKibris: boolean;
    bolumName: string;
    criterias: any[]; // Criteria
    sn: number;
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
    gd: string;
    sc: string;
    ec: string;
    mcg: number;
    mxg: number;
    mn: number;
    mx: number;
    sg: StartEndGrades; //"Hic almayanlar alabilir"|"Herkes alabilir";
    eg: StartEndGrades; // "Hic almayanlar alabilir"|"Herkes alabilir";
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
