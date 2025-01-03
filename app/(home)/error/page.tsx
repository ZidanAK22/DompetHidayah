'use client'

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
    const params = useSearchParams();

    const message = params.get('message');

    return <p>{message ?? 'Sorry something went wrong'}</p>
}