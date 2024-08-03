import { Breadcrumbs } from '@/components/breadcrumbs'
import EmployeeForm from '@/components/forms/employee-form';
import PageContainer from '@/components/layout/PageContainer'
import { getEmployeeInfo } from '@/data/employees';
import { redirect } from 'next/navigation';

async function page({ params }) {
    const { employeeId } = params;
    const breadcrumbItems = [
        { title: 'Employees', link: '/employees-dashboard' },
        { title: employeeId !== "new" ? "Edit Employee Info" : "Add New Employee", link: `/employees-dashboard/${employeeId}` }
    ];
    let initialData = null;

    if (employeeId !== "new") {
        const fetchEmployeeInfo = await getEmployeeInfo(employeeId)

        if (!fetchEmployeeInfo.success) {
            if (fetchEmployeeInfo.message === "404: Employee not found")
                redirect("/404")
            else {
                return <PageContainer>
                    <div className="space-y-4">
                        <Breadcrumbs items={breadcrumbItems} />
                        <h1>{fetchEmployeeInfo.message}</h1>
                    </div>
                </PageContainer>
            }
        }
        else {
            initialData = fetchEmployeeInfo.data
        }
    }


    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <EmployeeForm employeeData={initialData} />
            </div>
        </PageContainer>
    )
}

export default page