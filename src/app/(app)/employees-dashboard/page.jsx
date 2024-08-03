import { Breadcrumbs } from '@/components/breadcrumbs'
import PageContainer from '@/components/layout/PageContainer';
import { EmployeeTable } from '@/components/tables/employees-table/table';
import { useToast } from '@/components/ui/use-toast';
import { getEmployees } from '@/data/employees';
import React from 'react'

const breadcrumbItems = [
    { title: 'Employees', link: '/employees-dashboard' }
];
async function page() {
    let employees = [];
    try {
        const fetchEmployees = await getEmployees();
        if (!fetchEmployees.success) {
            return <PageContainer>
                <div className="space-y-4">
                    <Breadcrumbs items={breadcrumbItems} />
                    <h1>Something Went Wrong</h1>
                </div>
            </PageContainer>
        }

        employees = fetchEmployees.data


    } catch (err) {
        console.log(err)
    }
    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <EmployeeTable data={employees} />
            </div>
        </PageContainer>
    )
}

export default page