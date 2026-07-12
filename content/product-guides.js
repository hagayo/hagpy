import { productGuidesApi } from './product-guides-api.js';
import { productGuidesInfra } from './product-guides-infra.js';

export const productGuides = {
  ...productGuidesApi,
  ...productGuidesInfra,
};
