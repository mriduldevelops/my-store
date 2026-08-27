"use client";

export default function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="
          h-4
          w-4
          rounded
          border-gray-300
          text-primary
          focus:ring-primary
        "
      />

      <span className="text-sm">{label}</span>
    </label>
  );
}
