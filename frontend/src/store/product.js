import {create} from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        console.log(newProduct)
        //모든 요소값이 있는지 확인
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields."}   
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();

        //set()을 통해 state를 업데이트한다. 
        set((state) => ({products: [...state.products, data.data]}));
        return { success: true, message: "Product created successfully"};
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data})
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message};

        //update the ui immediately, without needing a refresh
        set((state) => ({ products: state.products.filter((product) => product._id !== pid)}));
        return { success: true, message: data.message };
    },

    updateProduct: async (pid, updatedProduct) => {
        console.log("data in updateProduct()", pid, updatedProduct)
        const test = JSON.stringify(updatedProduct)
        console.log("test",test)
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        })
        console.log("##res##",res)
        const data = await res.json();
        console.log("data in updateProduct():", data)
        if (!data.success) return { success: false, message: data.message };

        // update the ui immediately, without needing a refresh
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));
        return { success: true, message: data.message };
    },
}))