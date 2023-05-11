"use client";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

export default function AcctTypeDropdown({ onChange }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log("pathname", pathname);
  for (const [key, value] of searchParams.entries()) {
    console.log(`${key} = ${value}`);
  }

  return (
    <>
      <p>pathname: {pathname}</p>
      <p>searchParams.get("type"): {searchParams.get("type")}</p>
      <p>searchParams:</p>
      {[...searchParams.keys()].map((key) => (
        <div key={key}>
          {key} = {searchParams.get(key)}
        </div>
      ))}
      <br />
      <label htmlFor="acctType">Account Type </label>
      <select
        id="acctType"
        className="dropdown"
        onChange={(e) => {
          router.push(`/accounts?type=${e.target.value}`);
        }}
      >
        <option value="All">All</option>
        <option value="Savings">Savings</option>
        <option value="Current">Current</option>
      </select>
    </>
  );
}
