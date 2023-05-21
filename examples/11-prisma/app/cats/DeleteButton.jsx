"use client";
export default function DeleteButton({ id, onClicked }) {
  return (
    <button
      onClick={async () => {
        if (confirm("Confirm delete?")) onClicked(id);
      }}
    >
      ❌
    </button>
  );
}
