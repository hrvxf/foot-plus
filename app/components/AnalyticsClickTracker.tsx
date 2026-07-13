"use client";
import { useEffect } from "react";
import { trackAdviceEvent } from "./advice/AdviceTracker";
function typeFor(href:string){ if(href.startsWith("tel:")) return "phone_click"; if(href.startsWith("mailto:")) return "email_click"; if(href.includes("/book")) return "booking_click"; return undefined; }
export default function AnalyticsClickTracker(){ useEffect(()=>{ const onClick=(e:MouseEvent)=>{ const a=(e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null; if(!a) return; const name=typeFor(a.getAttribute("href")||""); if(!name) return; trackAdviceEvent(name,{ destination:a.href, link_text:a.textContent?.trim().slice(0,80) }); }; document.addEventListener("click",onClick); return()=>document.removeEventListener("click",onClick);},[]); return null; }
