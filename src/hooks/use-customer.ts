import { createCustomer } from "@/actions/customer";
import { useState } from "react";

export const useCustomer = () => {
  const [customer, setCustomer] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const createNewCustomer = async (email: string, name: string) => {
    try {
      setLoading(true);
      const res = await createCustomer(name, email);
      if (res) {
        setCustomer(res);
      }
      setLoading(false);
      return res;
    } catch (error) {
      console.log("Error creating customer:", error);
    }
  };
  return {
    createNewCustomer,
    customer,
    loading,
  };
};
