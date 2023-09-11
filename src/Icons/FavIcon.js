import * as React from "react"
const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
  >
    <g clipPath="url(#a)">
      <mask
        id="b"
        width={22}
        height={22}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <path fill="#fff" d="M0 0h22v22H0V0Z" />
      </mask>
      <g mask="url(#b)">
        <path
          className="fav-icon-svg"
          fill="#FF6161"
          stroke="#FF6161"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.6}
          d="M10.998 6.703s1.238-4.297 5.156-4.297c3.053 0 4.985 2.464 4.985 5.382 0 4.036-4.025 6.71-10.141 11.806C4.882 14.497.858 11.824.858 7.788c0-2.918 1.931-5.382 4.984-5.382 3.919 0 5.156 4.297 5.156 4.297Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
