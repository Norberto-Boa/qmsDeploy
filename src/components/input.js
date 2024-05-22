import React from 'react'

export default function Input(props) {
  return (
    <div className="mb-2">
      <label htmlFor={props.id}>{props.label}</label>
      <Field
        className="bg-zinc-400 dark:bg-black border border-zinc-800 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
      />
    </div>
  );
}