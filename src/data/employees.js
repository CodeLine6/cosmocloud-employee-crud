"use server"

import axios from "axios"

export async function getEmployees() {

    try {
    const request = await axios.get('https://free-ap-south-1.cosmocloud.io/development/api/employees', {
        headers: {
            'projectId' : process.env.COSMOCLOUD_PROJECT_ID,
            'environmentId' : process.env.COSMOCLOUD_ENV_ID,
        }
    })

    if(!request.status === 200) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }

    return {
        success: true,
        data: request.data.data
    }

    }
    catch(e) {
        return {
            success: false,
            message: e.message
        }
    }
}

export async function deleteEmployee(id) {
    try {
        const request = await axios.delete(`https://free-ap-south-1.cosmocloud.io/development/api/employees`, {
            data: {
                id
            },
            headers: {
                'projectId' : process.env.COSMOCLOUD_PROJECT_ID,
                'environmentId' : process.env.COSMOCLOUD_ENV_ID,
            }
        })
        if(!request.status === 200) {
            return {
                success: false,
                message: "Something went wrong" 
            }
        }

        return {
            success: true,
            message: "Employee Removed Successfully"
        }
    }
    catch(e) {
        return {
            success: false,
            message: e.message
        }
    }
}

export async function getEmployeeInfo(id) {
    try {
        const employeeFetch = await axios.get(`https://free-ap-south-1.cosmocloud.io/development/api/employees/${id}`, {
            headers: {
                'projectId' : process.env.COSMOCLOUD_PROJECT_ID,
                'environmentId' : process.env.COSMOCLOUD_ENV_ID,
            }
        })
        if(!employeeFetch.status === 200) {
            return {
                success: false,
                message: "Something went wrong"
            }
        }

        if(!employeeFetch.data) {
            return {
                success: false,
                message: "Employee not found"
            }
        }

        return {
            success: true,
            data : employeeFetch.data
        }

    }
    catch(e) {
        return {
            success: false,
            message: e.message
        }
    }
}

export async function addEmployee(data) {
    try {
        const request = await axios.post(`https://free-ap-south-1.cosmocloud.io/development/api/employees`, data, {
            headers: {
                'projectId' : process.env.COSMOCLOUD_PROJECT_ID,
                'environmentId' : process.env.COSMOCLOUD_ENV_ID,
            }
        })
        if(!request.status === 200) {
            return {
                success: false,
                message: "Something went wrong"
            }
        }
        return {
            success: true,
            message: "Employee Added Successfully"
        }

    }
    catch(e) {
        return {
            success: false,
            message: e.message
        }
    }
}

export async function updateEmployee(id, data) {
    try {
        const request = await axios.put(`https://free-ap-south-1.cosmocloud.io/development/api/employees/${id}`, data, {
            headers: {
                'projectId' : process.env.COSMOCLOUD_PROJECT_ID,
                'environmentId' : process.env.COSMOCLOUD_ENV_ID,
            }
        })
        if(!request.status === 200) {
            return {
                success: false,
                message: "Something went wrong"
            }
        }
        return {
            success: true,
            message: "Employee Updated Successfully"
        }

    }
    catch(e) {
        return {
            success: false,
            message: e.message
        }
    }
}