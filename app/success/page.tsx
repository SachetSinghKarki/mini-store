import { SuccessView } from "@/modules/checkout/success-view";
import { Loading } from "@/modules/products/components/Loading";
import { Suspense } from "react";

export default function Cart() {

    return (
        <Suspense fallback={<Loading/>}>
            <SuccessView/>
        </Suspense>
    )
}