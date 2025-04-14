"use client";

import React, { useState } from "react";

export default function CustomDatepicker() {
  const [date, setDate] = useState<string>("15/04/2025");

  return (
    <div className="mb-6">
      <label className="block text-yellow-400 mb-1 font-semibold text-sm">
        Выбери дату 👇
      </label>
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-zinc-900 text-white border border-zinc-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
      />
    </div>
  );
}
