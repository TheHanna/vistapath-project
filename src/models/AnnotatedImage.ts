import { MarkerAreaState } from "markerjs2";

export class AnnotatedImage {
  original: string;
  annotated?: string;
  state?: MarkerAreaState;
  selected?: boolean = false;

  constructor(
    original: string,
    annotated?: string,
    state?: MarkerAreaState
  ) {
    this.original = original;
    this.annotated = annotated;
    this.state = state;
  }
}