import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { getServerSession } from "next-auth/next"
import Link from "next/link";

const EmployeeCard = async ({ employee }) => {
    const sessionData = await getServerSession(authOptions);
    const emails = [];
    const contactNumbers = [];
    employee.contacts.map((contact, index) => {
        if (contact.type === "EMAIL") {
            emails.push(contact.value);
        }
        if (contact.type === "PHONE") {
            contactNumbers.push(contact.value);
        }
    })
    return (
        <Card className="w-full sm:w-96 md:w-[480px] lg:w-[800px] max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-800 dark:bg-gray-900 text-white p-4">
                <CardTitle className="text-xl font-semibold">
                    {`${employee.first_name} ${employee.last_name}`}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-gray-900 dark:text-gray-200">
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Address</h3>
                    <p>{employee.address.houseApartmentNo}</p>
                    <p>{employee.address.locality}</p>
                    <p>
                        {employee.address.city}, {employee.address.state} - {employee.address.pinCode}
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-medium">Contacts</h3>
                    <ul>
                        {emails.length > 0 && (
                            <li className="mt-2">
                                <span className="font-bold">Email:</span> {
                                    emails.map((email, index) => {
                                        return <><Link key={index} className="text-blue-500 hover:underline" href={`mailto:${email}`}>{email}</Link> {index + 1 === emails.length ? "" : ", "}</>
                                    }
                                    )
                                }
                            </li>
                        )}
                        {contactNumbers.length > 0 && (
                            <li className="mt-2">
                                <span className="font-bold">Phone:</span> {
                                    contactNumbers.map((contactNumber, index) => {
                                        return <><Link key={index} className="text-blue-500 hover:underline" href={`tel:${contactNumber}`}>{contactNumber}</Link> {index + 1 === contactNumbers.length ? "" : ", "}</>
                                    })
                                }
                            </li>
                        )}
                    </ul>
                </div>
            </CardContent>
            <CardFooter className="bg-gray-100 dark:bg-gray-800 p-4 text-right">
                {sessionData?.user?._id && <Link href={`/employees-dashboard/${employee._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>}
            </CardFooter>
        </Card>
    );
};

export default EmployeeCard;
