import { create } from "zustand";

type cartQuantityStore = {
    quantity: number,
    pId: [],
    cartData: any,
    increment: (id: number) => void;
    decrement: (id: number) => void;
    addToCart: (id: any, data:[]) => void;
    removeItem: (id:any) => void,
    removeAllItems: () => void
}

const productIds: any = [];
export const useCartStore = create<cartQuantityStore>((set,get) => ({
    quantity: 1,
    pId: [],
    cartData: [],
    increment: (id) => {
        let item = get().cartData.filter((dt:any) => {
            if(dt.id === id){
                dt.qty = dt.qty + 1;
            }
            return dt;
        });
        set({cartData: item});
    },  
    decrement: (id) => {
        let item = get().cartData.filter((dt:any) => {
            if(dt.id === id && dt.qty > 1 ){
                dt.qty = dt.qty - 1;
            }
            return dt;
        });
        set({cartData: item});
    },
    addToCart: (id,data) => {
        if(!productIds.includes(id)){
            productIds.push(id);
            console.log(data);
            set((state) => ({ cartData: [...state.cartData, ...data] }))
        }
    },
    removeItem: (id) =>{
        const itemExist = get().cartData.find((val:any) => val.id === id);

        if(itemExist){
            const updateItems = get().cartData.filter((dt:any) => dt.id !== id);
            console.log("UPDATE ITEMS",updateItems);
            console.log("CANNOT UPDATE I")
            set({cartData : updateItems});
            productIds.length = 0;
        }
    },
    removeAllItems: () =>{
        set({cartData : []});
        productIds.length = 0;
    }
}))