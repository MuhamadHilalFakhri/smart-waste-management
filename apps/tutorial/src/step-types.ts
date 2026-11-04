export type StepProps = {
  title: string;
  instruction: string;
  image: string;
  before?: string;
  navigateFrom?: string;
  typed?: string;
  field?: [number, number, number, number];
  cursor?: [number, number];
  clickTarget?: [number, number];
  mobile?: boolean;
  deviceGuide?: boolean;
};
