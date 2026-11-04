export type StepProps = {
  title: string;
  instruction: string;
  image: string;
  before?: string;
  typed?: string;
  field?: [number, number, number, number];
  cursor?: [number, number];
  zoom?: number;
  mobile?: boolean;
  deviceGuide?: boolean;
  audio?: string;
};
