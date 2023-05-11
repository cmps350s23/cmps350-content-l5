import AcctTypeDropdown from "./AcctTypeDropdown";

export default async function Accounts({ searchParams }) {
  console.log("Accounts - searchParams.type", searchParams.type);

  return (
    <>
      <AcctTypeDropdown />
      <br />
      <p>List of {searchParams.type} accounts</p>
    </>
  );
}
