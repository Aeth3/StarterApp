import { getCurrentUser } from "../src/composition/authSession";


export default async function fetchUser() {
    const { data: { user } } = await getCurrentUser();
    console.log("got user", user);

    return user
}
