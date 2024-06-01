import axios from "axios";
import {
  CLEAR_ERRORS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_DETAILS_REQUEST,
  ALL_DETAILS_SUCCESS,
  ALL_DETAILS_FAIL,
} from "../constants/productConostants";
//import { useParams } from "react-router-dom";
//ei page ee sudhu function likhbo ki dispatch korbo na korbo setai sudhu

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
console.log(BACKEND_API_URL);
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    //const params = useParams();
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `${BACKEND_API_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`; //it's mean price 0 theke besi and 25000 theke hote hobe
      if (category) {
        link = `${BACKEND_API_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//for ProductDetails
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DETAILS_REQUEST });
    const { data } = await axios.get(`${BACKEND_API_URL}/api/v1/product/${id}`);
    dispatch({ type: ALL_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: ALL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
