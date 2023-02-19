import { MainFilterInputDto, CacheSection } from "./types";
import axios,{AxiosResponse} from 'axios'
import qs from "qs";
export async function getResults(input: MainFilterInputDto){
    console.log(window.location.href);
    let result: AxiosResponse<CacheSection[]>
    let apiUrl = 'http://localhost:8080'
    if(window.location.href==='https://metu-course-finder.kasap.dev/'){
        apiUrl='https://api.metu-course-finder.kasap.dev'
    }
    result = await axios.get(apiUrl+'/get-details'+qs.stringify(input,{addQueryPrefix:true}))
    console.log(result.data);
    return result.data
}