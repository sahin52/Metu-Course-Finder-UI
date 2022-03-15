import { MainFilterInputDto } from "./types";
import axios from 'axios'
import qs from "qs";
export async function getResults(input: MainFilterInputDto){
    console.log(window.location.href);
    let result: any
    let apiUrl = 'http://localhost:8080'
    if(window.location.href==='https://metu-course.kasap.dev/'){
        apiUrl='https://api.metu-course.kasap.dev'
    }
    result = await axios.get(apiUrl+'/get-details'+qs.stringify(input,{addQueryPrefix:true}))
    console.log(result.data);
}