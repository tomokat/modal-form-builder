
export interface Option {
  caption: string;
  value?: number;
  selected: boolean;
}

export interface ReferenceObject {
  [key: string]: string | Option[];
  urgency: string;
  name: string;
  creditCardNumber: string;
  options: Option[];
}

export interface FieldDefinition {
  fieldName: string | null;
  type: 'filler' | 'button' | 'display' | 'radio';
  value?: string;
}
