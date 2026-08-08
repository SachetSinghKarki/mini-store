import { CartView } from "@/modules/cart/components/cart-view";
import { Loading } from "@/modules/products/components/Loading";
import { Suspense } from "react";

export default function Cart() {

    return (
        <Suspense fallback={<Loading/>}>
            <CartView/>
        </Suspense>
    )
}