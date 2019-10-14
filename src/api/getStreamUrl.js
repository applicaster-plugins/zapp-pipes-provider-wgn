import axios from 'axios';
import { config } from '../config';
import { sha256 } from 'js-sha256';
import moment from 'moment';
import { encode } from 'base-64';

export async function getStreamUrl(code) {
  try {
    var experation =  new Date().getTime();
    experation = parseInt(moment(experation).add(30, 'm').toDate().getTime() / 1000);
    var signiture = generateSigniture(code, experation, config.api.api_key, config.api.secret);
    var link = `https://api.ooyala.com/v2/assets/${code}/streams?api_key=${config.api.api_key}&signature=${signiture}&expires=${experation}`;
    const response = await axios.get(link);
    return response.data[0].url;;
  } catch (err) {
      console.log("error", err);

      return "error, coudn't generate stream link."
  }
}


 function generateSigniture(resource, experation, api_key, secret){
    var clearParam  = `${secret}GET/v2/assets/${resource}/streamsapi_key=${api_key}expires=${experation}`
    //sha256
    var signParam = sha256(clearParam)
    signParam =  getByte(signParam);

    //base 64
    signParam = encode(signParam);
    //substring the first 40 chars ( remove = in the end)
    signParam = signParam.substring(0, 43);

    //url encode
    signParam = encodeURIComponent(signParam);
    return  signParam;
}

function getByte(hex)
{
    var bytes = [], str;

    for(var i=0; i< hex.length-1; i+=2)
        bytes.push(parseInt(hex.substr(i, 2), 16));

    return String.fromCharCode.apply(String, bytes);    
}
