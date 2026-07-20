import React from 'react'

function Row({ label, value }) {
    
  return (
    <div className="flex justify-between">
      <span className="text-[#b0b0ac]">
        {label}
      </span>

      <span className="text-white font-semibold">
        {value}
      </span>
    </div>
  );
}

export default Row