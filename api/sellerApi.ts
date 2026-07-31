const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function becomeSeller(userId: string, address: any) {
    const res = await fetch(`${BASE_URL}/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials : "include",
        body: JSON.stringify({
            isSeller: true,
            addresses: [{ ...address, isSellerAddress: true }],
        }),
    });
    if (!res.ok) throw new Error(`Failed (${res.status})`);
    const json = await res.json();
    return json.data;
}