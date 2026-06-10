"use client"

import dynamic from "next/dynamic";

export const DynamicMeetiLocation = dynamic(() => import('./meeti-location'), {ssr: false})