'use client';

import { useEffect } from 'react';

export default function Error({error}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <p>❌ Something went wrong! {error.message}</p>
    </>
  );
}