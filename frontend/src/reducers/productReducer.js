import {
  CLEAR_ERRORS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_DETAILS_REQUEST,
  ALL_DETAILS_SUCCESS,
  ALL_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  // ALL_REVIEW_REQUEST,
  // ALL_REVIEW_SUCCESS,
  // ALL_REVIEW_FAIL,
  // DELETE_REVIEW_REQUEST,
  // DELETE_REVIEW_SUCCESS,
  // DELETE_REVIEW_FAIL,
  // DELETE_REVIEW_RESET,
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
        products: action.payload.products,
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

//review reducer

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        //pass state as well as
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload, //show only the payload
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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
