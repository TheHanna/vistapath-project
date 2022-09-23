import { MarkerAreaState } from "markerjs2";
import { v4 as uuidv4 } from "uuid";

export class AnnotatedImage {
  uuid: string;
  original: string;
  annotated?: string;
  state?: MarkerAreaState;
  selected?: boolean = false;

  constructor(
    original: string,
    annotated?: string,
    state?: MarkerAreaState
  ) {
    this.uuid = uuidv4();
    this.original = original;
    this.annotated = annotated;
    this.state = state;
  }
}