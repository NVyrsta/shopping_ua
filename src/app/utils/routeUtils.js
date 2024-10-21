// @desc get the closest category from the route.params.categories example: women/women_clothing/sportswear
// @route example: women/women_clothing/sportswear
export const getLastRoutePath = params => {
  const path = params.categories || '';
  const pathArray = path.split('/');
  const lastPath = pathArray[pathArray.length - 1];
  return lastPath;
};
