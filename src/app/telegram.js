'use client';

let tg;

if (typeof window !== 'undefined') {
  tg = window.Telegram?.WebApp;
}

export default tg;