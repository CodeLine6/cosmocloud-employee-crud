"use client"
import React, { useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '../ui/separator';
import { Heading } from '../ui/heading';
import { employeeSchema } from '@/schemas/employeeSchema';
import { Loader2, UserX2Icon, X } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { addEmployee, updateEmployee } from '@/data/employees';
import Link from 'next/link';

const EmployeeForm = ({ employeeData }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const title = employeeData ? "Edit Employee" : "Add Employee"
    const description = employeeData ? "Edit employee details" : "Add a new employee"
    const action = employeeData ? 'Save changes' : 'Create';
    const toastMessage = employeeData ? 'Employee Updated.' : 'Employee Created.';
    const { employeeId } = useParams()
    const router = useRouter();

    const defaultValues = employeeData ?? {
        first_name: "",
        last_name: "",
        address: {
            houseApartmentNo: "",
            locality: "",
            city: "",
            state: "",
            pinCode: "",
        },
        contacts: [{ type: "EMAIL", value: "" }],
    }
    const form = useForm({
        resolver: zodResolver(employeeSchema),
        defaultValues
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "contacts",
    });

    const watchContacts = form.watch("contacts");

    const onCreate = async (data) => {
        setIsSubmitting(true);
        try {
            const newEmployee = await addEmployee(data)

            if (newEmployee.success) {
                form.reset()
                router.push('/employees-dashboard')
                router.refresh()
                toast({
                    title: toastMessage,
                    description: "Employee created successfully",
                })

                return
            }

            toast({
                title: "Error",
                description: newEmployee.message,
                variant: "destructive"
            })
        }
        catch (e) {
            toast({
                title: "Error",
                description: e.message,
                variant: "destructive"
            })
        }
        finally {
            setIsSubmitting(false)
        }
    };

    const onUpdate = async (data) => {
        setIsSubmitting(true);
        try {
            const updatedEmployee = await updateEmployee(employeeId, data);

            if (updatedEmployee.success) {
                router.refresh()
                toast({
                    title: toastMessage,
                    description: "Employee updated successfully",
                })

                return
            }

            toast({
                title: "Error",
                description: updatedEmployee.message,
                variant: "destructive"
            })
        }
        catch (e) {
            toast({
                title: "Error",
                description: e.message,
                variant: "destructive"
            })
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-6xl space-y-3 mx-auto">
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {employeeData && <Link href={`/employee/${employeeId}`}>
                    <Button
                        className="text-xs md:text-sm"

                    >
                        <UserX2Icon className="mr-2 h-4 w-4" /> View Employee
                    </Button>
                </Link>}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(employeeData ? onUpdate : onCreate)} className="w-full space-y-8 py-3">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <FormLabel>Address</FormLabel>
                        <FormField
                            control={form.control}
                            name="address.houseApartmentNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="House/Apartment No. (Optional)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.locality"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Locality (Optional)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.pinCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Pin Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <FormLabel>Contact Information</FormLabel>
                        <div className='gap-8 md:grid md:grid-cols-3'>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex space-x-2 items-start">
                                    <FormField
                                        control={form.control}
                                        name={`contacts.${index}.type`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="EMAIL">Email</SelectItem>
                                                        <SelectItem value="PHONE">Phone</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`contacts.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormControl>
                                                    <Input
                                                        placeholder={watchContacts[index]?.type === "EMAIL" ? "Enter email" : "Enter phone number"}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {fields.length > 1 && <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => remove(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-32"
                                onClick={() => append({ type: "EMAIL", value: "" })}
                            >
                                Add Contact
                            </Button>
                        </div>
                    </div>


                    <Button disabled={isSubmitting} >{isSubmitting ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : action}</Button>
                </form>
            </Form>
        </div>
    );
};

export default EmployeeForm;