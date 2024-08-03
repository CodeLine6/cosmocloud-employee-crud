import * as z from "zod";

export const employeeSchema = z.object({
    first_name: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    address: z.object({
        houseApartmentNo: z.string().optional(),
        locality: z.string().optional(),
        city: z.string().min(1, { message: "City is required." }),
        state: z.string().min(1, { message: "State is required." }),
        pinCode: z.string().regex(/^\d{6}$/, { message: "Pin code must be 6 digits." }),
    }),
    contacts: z.array(
        z.object({
            type: z.enum(["EMAIL", "PHONE"]),
            value: z.string().min(1, { message: "Contact value is required." }),
        }).superRefine((contact, ctx) => {
            if (contact.type === "EMAIL") {
                if (!z.string().email().safeParse(contact.value).success) {
                    ctx.addIssue({
                        path: ["value"],
                        message: "Invalid email address.",
                    });
                }
            } else if (contact.type === "PHONE") {
                if (!z.string().min(8).regex(/^\d+$/).safeParse(contact.value).success) {
                    ctx.addIssue({
                        path: ["value"],
                        message: "Phone number must be atleast 8 digits.",
                    });
                }
            }
        })
    ).min(1, { message: "At least one contact is required." }),
});
