<template>
    <div class="relative  border border-[var(--border-primary)] rounded-lg overflow-hidden">
        <svg class="absolute top-0 left-0" viewBox="0 0 323 168" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8" filter="url(#filter0_f_713_12416)">
                <path
                    d="M242.879 139.468L82.2506 -34.1164C81.7211 -34.6886 80.8838 -34.8555 80.1754 -34.5301L-24.2978 13.4567C-25.7564 14.1267 -25.6777 16.2254 -24.173 16.7843L113.171 67.7927C115.162 68.532 116.57 65.8212 114.82 64.6179L38.0036 11.7956L240.581 142.208C242.361 143.354 244.318 141.023 242.879 139.468Z"
                    fill="#5087E4" />
                <path opacity="0.5"
                    d="M141.026 35.996L34.6116 -48.5014C32.6239 -50.0797 29.8839 -50.3131 27.6579 -49.0937L-10.4249 -28.232C-14.2974 -26.1106 -14.8485 -20.7696 -11.4909 -17.9022L93.3432 71.6269C99.2179 76.6438 107.231 68.7325 102.289 62.7944L78.5171 34.2294C74.2226 29.069 79.8902 21.6626 85.9937 24.459L134.475 46.6715C141.25 49.7756 146.862 40.6302 141.026 35.996Z"
                    fill="#9ABAEF" />
            </g>
            <defs>
                <filter id="filter0_f_713_12416" x="-104.383" y="-128.905" width="426.797" height="350.454"
                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="39.5178" result="effect1_foregroundBlur_713_12416" />
                </filter>
            </defs>
        </svg>
        <slot></slot>
    </div>
</template>