import Avatar from "./Avatar";

export default async function AvatarPage() {
  return (
    <div className="flex-container">
      <Avatar username="erradi" picName="abdelkarim_erradi02.jpg" />
      <Avatar username="abdulla-alali" picName="Abdulla_Khalid.jpg" />
    </div>
  );
}
