import { accountsRepo } from "../repos/users-repo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("userID");
  const email = searchParams.get("email");
  const role = searchParams.get("role");
  if (userID) {
    const account = await accountsRepo.getAccountById(userID);
    return Response.json(account);
  } else if (email) {
    const account = await accountsRepo.getAccountByEmail(email);
    if (!account) {
      return new Response(null, { status: 404 });
    }
    return Response.json(account);
  } else if (role) {
    const accounts = await accountsRepo.getAccountsOfRole(role);
    return Response.json(accounts);
  }
  const accounts = await accountsRepo.getAccounts();
  return Response.json(accounts);
}
