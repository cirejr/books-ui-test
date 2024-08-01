"use client";
import React from "react";
import Notiflix from "notiflix";

export default function Loading() {
  return (
    <div className='fixed inset-0 bg-black/10 z-[10000] flex flex-1 items-center justify-center'>
      loading...
    </div>
  );
}
