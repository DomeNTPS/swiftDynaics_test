export interface DataType {
  key: string;
  dateOfBirth: string;
  gender: string;
  nameTitles: string;
  nationality: string;
  passport: string;
  salary: string;
  surname: string;
  telephone: { code: string; number: string };
  username: string;
}

export interface UserInterface {
  userData: DataType[];
}
