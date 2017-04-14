import {request} from "../utils";
import {stringify} from "qs";

export function userChart() {
	return request('/dashboard/userChart')
}
