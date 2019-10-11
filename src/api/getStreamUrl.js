import axios from 'axios';
import { config } from '../config';
import { sha256 } from 'js-sha256';

export async function getStreamUrl(code) {
  try {
    var experation =  new Date().getTime();
    var signiture = generateSigniture(experation, config.api.api_key, config.api.secret);
    var link = `https://api.ooyala.com/v2/assets/Q1ZTVraTE6b8MnUtN2gkTSg7t_hclKm3/streams?expires=${}`;
    const response = await axios.get(`${config.api.baseUrl}/wgn-series`);
    return response.data;
  } catch (err) {
      return "error, coudn't generate stream link."
  }
}


function generateSigniture(resource, experation, api_key, secret){
    var clearParam  = `${secret}GET/v2/assets/${resource}/streamsapi_key=${api_key}expires=${experation}`
    console.log("clearSigniture", clearSigniture);
    var signParam = sha256(clearParam);
    console.log("signParam",signParam);
    return  signParam;
}