import EmployeeCard from '@/components/cards/employee-card';
import { getEmployeeInfo } from '@/data/employees';

const HomePage = async ({ params }) => {
    const { employeeId } = params;
    let employeeData = null;

    try {
        const fetchEmployeeInfo = await getEmployeeInfo(employeeId);

        if (!fetchEmployeeInfo.success) {
            return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 grid place-content-center">
                <h1 className="text-gray-900 dark:text-gray-200">{fetchEmployeeInfo.message}</h1>
            </div>
        }

        employeeData = fetchEmployeeInfo.data
    }
    catch (e) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 grid place-content-center">
                <h1 className="text-gray-900 dark:text-gray-200">{e.message}</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 grid place-content-center p-4">
            <EmployeeCard employee={employeeData} />
        </div>
    );
};

export default HomePage;