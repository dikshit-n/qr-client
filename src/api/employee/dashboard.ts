import { axiosInstance } from "@/utils"

class DashboardApi {
    fetchDetails(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let {data} = await axiosInstance.get('/analytics/employee/dashboard')
                resolve(data)
            }
            catch(err) {
                reject(err)
            }
        })
    }
}

export const dashboardApi = new DashboardApi()