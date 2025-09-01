export type SelectedValue = { id: number; name: string };

export interface Department {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  from_department: number;
}

export interface Service {
  id: number;
  name: string;
}