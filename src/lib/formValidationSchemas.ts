import { z } from "zod";

export const truckSchema = z.object({
         id: z.
         coerce.number()
         .optional(),
         plate: z
             .string()
             .min(1, { message: 'Kamyon plakası gerekli!' }),
         containers: z.array(z.number()),
         personels: z.array(z.number()),
         });
    
     export type TruckSchema = z.infer<typeof truckSchema>;
