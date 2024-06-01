import {
  CLEAR_ERRORS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_DETAILS_REQUEST,
  ALL_DETAILS_SUCCESS,
  ALL_DETAILS_FAIL,
} from "../constants/productConostants";
//take everything from the constant page
// and only provide the switch case condition only
export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.product,
        productsCount: action.payload.productsCount,
        resultPerpage: action.payload.resultPerpage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case ALL_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//FOR PRODUCT DETAILS
//everything put in the object so CgThermostat's the reason wrtie product:{}
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ALL_DETAILS_REQUEST:
      return {
        loading: true,
        ...state, //pass state as well as
      };
    case ALL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload, //show only the payload
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
