export enum ApiEndPoint {
  login = 'api/Account/Login',
  restaurantList = 'api/Admin/getRestaurantList',
  mainCategoryList = 'api/Category/GetCategoryList',
  deleteMainCategory = 'api/Category/DeleteCategory',
  addCategory = 'api/Category/AddCategory',
  editCategory = 'api/Category/UpdateCategory',
  mainCategoryDetail = 'api/Category/GetCategoryDetail',
  restaurantDetail = 'api/Restaurant/GetProfileDetail',
  addRestaurants = 'api/Admin/AddOrUpdateRestaurant',
  getState = 'api/Content/GetStates',
  getCountry = 'api/Content/GetCountries',
  menuList = 'api/Restaurant/GetFoodItemList',
  addUpdateMenu = 'api/Restaurant/AddUpdateFoodItem',
  ImageUpload = 'api/Upload/UploadProfilePic',
  foodImageUpload = 'api/Upload/UploadFoodItemImage',
  restaurantImages = 'api/Upload/UploadRestaurantLogoAndImage',
  categoryImageupload = 'api/Upload/UploadMainCategoryImage',

  updateFoodVariantType = 'api/Restaurant/AddUpdateFoodVariantType',
  variantTypeList = 'api/Restaurant/GetFoodVariantTypeList',
  updateFoodVariant = 'api/Restaurant/AddUpdateFoodVariant',
  foodVariantList = 'api/Restaurant/GetFoodVariantList',
  foodVariantOption = 'api/Restaurant/AddUpdateFoodVariantOption',
  variantOptionList = 'api/Restaurant/GetVariantOptionList',
  UpdateFoodItemVariant = 'api/Restaurant/AddUpdateFoodItemVariant',
  GetFoodItemVariant = 'api/Restaurant/GetFoodItemVariant',
  AddUpdateFoodVariantOption = 'api/Restaurant/AddUpdateFoodVariantOption',
  AddUpdateFoodType = 'api/Restaurant/AddUpdateFoodType',
  GetFoodTypeList = 'api/Restaurant/GetFoodTypeList',
  GetFoodTypeDetail = 'api/Restaurant/GetFoodTypeDetail',
  UploadFoodTypeIconImage = 'api/Upload/UploadFoodTypeIconImage',
}
