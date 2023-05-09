"use client";
export default function DeleteButton({ id, onDeleteClicked }) {
  return (
    <button
      onClick={async () => {
        if (confirm("Confirm delete?")) onDeleteClicked(id);
      }}
    >
      ❌
    </button>
  );
}
