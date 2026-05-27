import { createQuarter } from "./Quarter/createQuarter.js";
import { deleteQuarter } from "./Quarter/deleteQuarter.js";
import { getQuarter } from "./Quarter/getQuarter.js";

class QuarterController {
  createQuarter = createQuarter;
  deleteQuarter = deleteQuarter;
  getQuarter = getQuarter;
}

export default new QuarterController();
